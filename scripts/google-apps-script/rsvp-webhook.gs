function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById('1LbmFDIZp3AXlhCHHI3Ps1E3h8Bnh2x2Doglt02D0Bb0');
    var payload = parsePayload(e);
    var sheetConfig = resolveGuestSheet(ss);
    var sheet = sheetConfig.sheet;
    var headers = sheetConfig.headers;
    var headerIndex = sheetConfig.headerIndex;
    var data = sheetConfig.data;

    var invitationId = String(payload.invitation_id || '').trim();
    var guests = Array.isArray(payload.guests) ? payload.guests : [];
    var timestamp = Utilities.formatDate(new Date(), 'America/Argentina/Buenos_Aires', 'yyyy-MM-dd HH:mm:ss');
    var updatedRows = 0;
    var notFound = [];
    var consumedRows = {};

    guests.forEach(function (guest) {
      var targetRow = findGuestRow(data, headers, headerIndex, invitationId, String(guest.name || ''), consumedRows);
      if (!targetRow) {
        notFound.push(String(guest.name || ''));        
        return;
      }

      var rowNumber = targetRow.rowNumber;
      if (headerIndex.rsvp) {
        sheet.getRange(rowNumber, headerIndex.rsvp).setValue(normalizeYesNo(guest.attending));
      }
      if (headerIndex.dietaryRestrictions) {
        sheet.getRange(rowNumber, headerIndex.dietaryRestrictions).setValue(String(guest.dietary_restrictions || 'None') || 'None');
      }
      if (headerIndex.needsBus) {
        sheet.getRange(rowNumber, headerIndex.needsBus).setValue(normalizeYesNo(guest.needs_bus));
      }
      if (headerIndex.timestamp) {
        sheet.getRange(rowNumber, headerIndex.timestamp).setValue(timestamp);
      }

      consumedRows[rowNumber] = true;
      updatedRows += 1;
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true,
        updated_rows: updatedRows,
        not_found: notFound,
        sheet: sheet.getName(),
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function parsePayload(e) {
  var fallback = {};

  try {
    if (e && e.postData && e.postData.contents) {
      var raw = String(e.postData.contents || '').trim();
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch (jsonError) {
          // Continue; it might be URL-encoded like "payload={...}".
        }

        var parsedParams = parseQueryString(raw);
        if (parsedParams.payload) {
          try {
            return JSON.parse(parsedParams.payload);
          } catch (payloadError) {
            // Continue with other fallbacks.
          }
        }
      }
    }

    if (e && e.parameter && e.parameter.payload) {
      return JSON.parse(e.parameter.payload);
    }

    return fallback;
  } catch (error) {
    return fallback;
  }
}

function parseQueryString(value) {
  var result = {};
  var pairs = String(value || '').split('&');
  pairs.forEach(function (pair) {
    if (!pair) return;
    var eq = pair.indexOf('=');
    var key = eq === -1 ? pair : pair.slice(0, eq);
    var rawValue = eq === -1 ? '' : pair.slice(eq + 1);
    var decodedKey = decodeURIComponent(String(key).replace(/\+/g, ' '));
    var decodedValue = decodeURIComponent(String(rawValue).replace(/\+/g, ' '));
    result[decodedKey] = decodedValue;
  });
  return result;
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'RSVP webhook running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function resolveGuestSheet(ss) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i += 1) {
    var candidate = sheets[i];
    if (candidate.getLastRow() < 1 || candidate.getLastColumn() < 1) continue;

    var headers = candidate.getRange(1, 1, 1, candidate.getLastColumn()).getValues()[0];
    var headerIndex = mapHeaderIndexes(headers);
    if (headerIndex.groupId && headerIndex.fullName && headerIndex.rsvp) {
      var data = [];
      if (candidate.getLastRow() > 1) {
        data = candidate.getRange(2, 1, candidate.getLastRow() - 1, candidate.getLastColumn()).getValues();
      }
      return { sheet: candidate, headers: headers, headerIndex: headerIndex, data: data };
    }
  }

  throw new Error('No se encontro una hoja con columnas group_id, full_name y RSVP.');
}

function mapHeaderIndexes(headers) {
  var index = {
    groupId: 0,
    fullName: 0,
    rsvp: 0,
    dietaryRestrictions: 0,
    needsBus: 0,
    timestamp: 0,
  };

  headers.forEach(function (header, i) {
    var key = canonicalHeader(header);
    var col = i + 1;
    if (key === 'group_id' || key === 'groupid') index.groupId = col;
    if (key === 'full_name' || key === 'fullname') index.fullName = col;
    if (key === 'rsvp') index.rsvp = col;
    if (key === 'dietary_restrictions' || key === 'dietaryrestrictions') index.dietaryRestrictions = col;
    if (key === 'needs_bus' || key === 'needsbus') index.needsBus = col;
    if (key === 'timestamp' || key === 'fecha' || key === 'fecha_hora') index.timestamp = col;
  });

  return index;
}

function findGuestRow(data, headers, headerIndex, invitationId, guestName, consumedRows) {
  var normalizedGuest = canonicalName(guestName);
  var normalizedGroup = canonicalName(invitationId);

  // First pass: strict group_id + full_name match.
  for (var i = 0; i < data.length; i += 1) {
    var rowNumber = i + 2;
    if (consumedRows[rowNumber]) continue;

    var row = data[i];
    var rowGroup = canonicalName(row[headerIndex.groupId - 1]);
    var rowName = canonicalName(row[headerIndex.fullName - 1]);
    var sameGroup = normalizedGroup ? rowGroup === normalizedGroup : true;
    if (sameGroup && rowName === normalizedGuest) {
      return { rowNumber: rowNumber };
    }
  }

  // Second pass: fallback to full_name-only match for sheets with blank/missing group_id.
  for (var j = 0; j < data.length; j += 1) {
    var fallbackRowNumber = j + 2;
    if (consumedRows[fallbackRowNumber]) continue;

    var fallbackRow = data[j];
    var fallbackName = canonicalName(fallbackRow[headerIndex.fullName - 1]);
    if (fallbackName === normalizedGuest) {
      return { rowNumber: fallbackRowNumber };
    }
  }

  return null;
}

function normalizeYesNo(value) {
  var normalized = canonicalName(value);
  if (normalized === 'yes' || normalized === 'si' || normalized === 's') return 'yes';
  return 'no';
}

function canonicalName(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function canonicalHeader(value) {
  return canonicalName(value).replace(/\s+/g, '_');
}
