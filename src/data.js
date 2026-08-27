// src/data.js
export const cvData = {
  name: "Vir Sabando",
  title: "AI Solutions Architect | GCP Certified ML Engineer",
  pronouns: "they/them – he/him",
  contact: "virsabando@gmail.com | Linkedin | Google Scholar",
  about: "I’ve always been driven by a simple curiosity to figure out how things work and use tech to solve real-world problems. My background includes a PhD in Computer Science—using deep learning for pharma—and over a decade of teaching, which really shaped how I communicate and lead teams today. Now, as an AI Solutions Architect, my favorite place to be is at the messy beginning of a project: sitting with cross-functional teams, figuring out exactly what we need to build, and designing the MLOps pipelines that make Gen AI work in production. As a trans person and proud member of the LGBTQ+ community, creating inclusive, open, and welcoming environments is just as important to me as technical excellence. \nWhen I’m not behind a screen, you can usually find me studying a new language, shooting a game of pool with my friends, cheering on my favorite sports teams, getting behind the mic for a radio show (something I’ve loved doing for years!), or obsessing over cats in all shapes and forms.",
  stats: [
    { value: "13+", label: "Years in research & teaching" },
    { value: "9+",  label: "AI certifications & skill badges" },
    { value: "10+", label: "Large-scale projects in production" },
    { value: "20+", label: "Engineers led" },
    { value: "6",   label: "International awards & scholarships" },
  ],
  experience: [
    {
      company: "ZYZYGY INC",
      roles: [
        {
          role: "AI Solutions Architect",
          duration: "May 2024 - Present",
          shortDesc: "Designed E2E enterprise platforms with cloud scalability and AI integration using MLOps pipelines.",
          description: "Designed E2E enterprise platforms from scratch with a heavy focus on cloud scalability and AI integration. Architected an MLOps infrastructure and NLP pipeline using GEAP (formerly Vertex AI) in the healthcare sector to process medical records and automate insurance workflows."
        },
        {
          role: "AI ML Engineer",
          duration: "May 2024 - Present",
          shortDesc: "Engineered NLP pipelines for document processing with strict HIPAA and OSHA compliance standards.",
          description: "Engineered automated NLP pipelines to extract and process data from paper records and IDs, rigorously managing PII and HIPAA/OSHA compliance. Built and deployed custom cloud solutions to parse and process complex, unstructured documents."
        },
        {
          role: "Data Architect",
          duration: "May 2024 - Present",
          shortDesc: "Designed data models and ETL pipelines consolidating enterprise systems for government data warehouses.",
          description: "Designed comprehensive data models and automated ETL/ELT pipelines for multiple high-stakes enterprise projects. Consolidated data from disaggregated enterprise and judicial systems for a government project, fueling a data warehouse to track job pipelines and incident reports."
        }
      ]
    },
    {
      company: "Instituto de Ciencias e Ingeniería de la Computación (ICIC) CONICET - UNS",
      roles: [
        {
          role: "Computer Science PhD Research Fellow",
          duration: "Apr 2018 - May 2024",
          shortDesc: "Applied deep learning for drug discovery, published seven peer-reviewed papers in top-tier journals.",
          description: "Applied advanced deep learning architectures to solve complex drug discovery challenges, ultimately culminating in a successful PhD thesis. Engineered predictive models and visual analytics frameworks capable of processing massive datasets, leading to the publication of 7 peer-reviewed papers on top-tier journals."
        }
      ]
    },
    {
      company: "Dalhousie University",
      roles: [
        {
          role: "Visiting Graduate Research Fellow",
          duration: "Dec 2018 - May 2022",
          shortDesc: "Specialized in few-shot learning, parametric models, and embeddings for advanced AI techniques.",
          description: "Specialized deeply in advanced AI techniques, specifically working with few-shot learning, parametric models, and embeddings."
        }
      ]
    },
    {
      company: "Universidad Nacional del Sur",
      roles: [
        {
          role: "Head Teaching Assistant",
          duration: "Jun 2013 - Present",
          shortDesc: "Taught computer architecture and systems, mentoring teams with over a decade of experience.",
          description: "Instructed university courses in computer architecture and embedded systems, developing a strong foundation in translating complex technical paradigms. Leveraged over a decade of teaching experience to break down intricate problems into plain language, mentoring engineering teams and clearly communicating system designs to business stakeholders."
        }
      ]
    }
  ],
  skills: [
    "Google Cloud Platform (GCP)",
    "Solution Architecture",
    "Generative AI & LLMs",
    "Machine Learning & MLOps",
    "Python",
    "SQL",
    "Microservices",
    "Natural Language Processing (NLP)"
  ]
};

export const scientificItems = [
  {
    id: "molecular-representation-qsar",
    category: "Molecular Representation & QSAR",
    items: [
      {
        id: 1,
        title: "Using Molecular Embeddings in QSAR Modeling",
        note: "Evaluating molecular embeddings in Quantitative Structure-Activity Relationship (QSAR) modeling.",
        url: "https://academic.oup.com/bib/article/23/1/bbab365/6366344"
      },
      {
        id: 3,
        title: "Multi-Task Deep Neural Networks",
        note: "Applying multi-task deep neural network architectures for Ames mutagenicity prediction.",
        url: "https://pubs.acs.org/jcisd8/article-abstract/62/24/6342/884698/Multitask-Deep-Neural-Networks-for-Ames?redirectedFrom=fulltext"
      },
      {
        id: 4,
        title: "Neural-based Drug Property Prediction",
        note: "Overcoming feature-selection and applicability-domain limitations in drug-property prediction.",
        url: "https://www.sciencedirect.com/science/article/pii/S1568494619305587"
      }
    ]
  },
  {
    id: "visual-analytics-screening",
    category: "Visual Analytics & Virtual Screening",
    items: [
      {
        id: 2,
        title: "ChemVA: Interactive Visual Analysis",
        note: "Visual analytics for exploring chemical compound similarity during virtual screening.",
        url: "https://ieeexplore.ieee.org/abstract/document/9222282"
      }
    ]
  },
  {
    id: "generative-ai-molecular-design",
    category: "Generative AI & Explainable Molecular Design",
    items: [
      {
        id: 6,
        title: "Generative AI for Drug Discovery",
        note: "A multidimensional taxonomy of generative AI approaches for drug discovery.",
        url: "https://wires.onlinelibrary.wiley.com/doi/abs/10.1002/widm.70104"
      },
      {
        id: 7,
        title: "GenAI Explainability in Molecular Design",
        note: "Interpretable generative models tailored for de novo molecular design.",
        url: "https://sedici.unlp.edu.ar/handle/10915/195895"
      }
    ]
  },
  {
    id: "nlp-social-impact",
    category: "NLP & Social Impact",
    items: [
      {
        id: 5,
        title: "Detection of Racial Stereotypes in Spanish Text",
        note: "A multi-task learning approach for low-resource stereotype detection in Spanish.",
        url: "https://ceur-ws.org/Vol-3202/detests-paper2.pdf"
      }
    ]
  },
  {
    id: "doctoral-research",
    category: "Doctoral Research",
    items: [
      {
        id: 8,
        title: "My PhD Thesis",
        note: "Deep learning strategies applied to drug discovery.",
        url: "https://repositoriodigital.uns.edu.ar/handle/123456789/6737"
      }
    ]
  }
];

export const homeContent = {
  welcomePara: "Welcome! I'm glad you're here. This is my personal page, where I share projects, publications, and thoughts on building reliable ML systems (and other stuff).",
  callToPara: "Browse my work below, learn about my research, and get in touch to collaborate or talk about cats 😊"
};

export const professionalItems = [
  {
    id: 1,
    title: "Real-Time Collaborative CRDT Platform",
    role: "Architect of Record",
    desc: "Designed this GCP platform to serve continuous production traffic. It uses CRDTs and an event sourcing pattern to power live collaboration. Web clients send raw edits over WebSockets through an API gateway. The system validates these edits, saves them to a ledger, and broadcasts them to other session peers so users see updates instantly.\nDedicated microservices manage the rest of the work to keep syncing fast. Relational databases store project details, and a fast cache holds active snapshot states. Internal event topics also trigger AI engines for background tasks, ensuring heavy data processing never slows down the live app.",
    image: "/professional/CRDT_platform.svg"
  },
  {
    id: 2,
    title: "HPI Graph-Driven Multiagent System",
    role: "Principal Architect",
    desc: "Designed the HPI Multiagent System, a live conversational platform that adapts user questionnaires. Built with LangChain and LangGraph, its state-machine coordinates specialized AI agents. It uses initial context to skip irrelevant questions and adjust the flow instantly. It outputs strict JSON to tell the frontend exactly what UI to render.\nOur team deployed this on Azure for continuous real-time messaging. Azure Web PubSub handles WebSocket communication, while the agents connect to a private Azure OpenAI instance. For fault tolerance, we built a custom, encrypted persistence layer in Azure Blob Storage. It saves agent memory so users can disconnect and resume seamlessly without data loss.",
    image: "/professional/HPI_multiagent_system.svg"
  },
  {
    id: 3,
    title: "Manufacturing Multiagent System using Google Cloud ADK",
    role: "Architect of Record",
    desc: "Designed and built this multi-agent PoV to help manufacturing operators solve problems and run routine checks. Using Google Cloud's Agent Development Kit (ADK), a central Orchestrator Agent routes user requests to specialized worker sub-agents. To ensure safety and accuracy, an Internal Auditor Agent checks every answer against company standards before the operator ever sees it.\nThe backend relies on secure microservices placed behind an API Gateway. Sub-agents pull knowledge directly from a Vertex AI Vector Store filled with company manuals and processes. While this is a Proof of Value and not a production-ready system, its simple, modular design makes it easy to adapt for other business needs in the future.",
    image: "/professional/manufacturing_multiagent_system.svg"
  },
  {
    id: 4,
    title: "Automated Document Parser for Healthcare Workflows",
    role: "Architect of Record and Lead Engineer",
    desc: "Designed and built a production-ready system that automates end-to-end document processing for healthcare workflows. The cloud infrastructure begins with a secure entry gateway that ingests incoming files, splits multi-page documents, checks image quality, and runs text extraction and translation. Next, AI models classify each file and extract specific data fields using strict schemas. Serverless microservices then call external APIs to verify and complete the extracted details. Finally, the validated data is saved into a primary database for daily operations and synced to a cloud warehouse for analytics, backed by enterprise encryption and real-time monitoring.",
    image: "/professional/doc_parser.svg"
  },
  {
    id: 5,
    title: "Automated ELT Pipelines for Sensitive Data",
    role: "Lead Data Architect",
    desc: "Designed the data models, conformed schemas, and end-to-end GCP ELT pipeline supporting seven consuming service workflows and over 150 cross-tenant entities. Built on Cloud Composer, Dataflow, and BigQuery, the pipeline ingests scheduled batch data and applies deterministic tokenization to enable downstream analytics while strictly protecting sensitive PII. To satisfy SOC 2 standards for security, privacy, and processing integrity, I architected the solution with VPC Service Controls, Customer-Managed Encryption Keys (CMEK), and Dataplex policy tags. The design also incorporates a secure reverse-tokenization UDF for authorized compliance audits, fully protected by granular access controls, immutable Cloud Audit Logs, and real-time monitoring via Security Command Center.",
    image: "/professional/ELT_SOC2.svg"
  },
  {
    id: 6,
    title: "Inbox Automated Workflows",
    role: "Architect of Record and Lead Engineer",
    desc: "Designed and built this production-ready system to automate the handling of incoming emails. The workflow starts by securely receiving messages and using AI models to understand the sender's intent and extract key details. We store this information in a fast, structured database and index it for quick searches. Next, serverless functions check the extracted data against standard business rules using external APIs. Finally, the AI drafts a personalized reply; the system either sends this automatically or routes it to a human agent for review if the request is complex. The entire setup runs on a secure cloud network managed by automated orchestrators and is backed by real-time monitoring.",
    image: "/professional/inbox_automation.svg"
  }
];