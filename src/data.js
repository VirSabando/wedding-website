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

export const mediumPosts = [
  // No Medium posts or external blog URLs were provided in the resume source.
];

export const scientificItems = [
  { 
    id: 1, 
    title: "Using Molecular Embeddings in QSAR Modeling", 
    desc: "Evaluating the impact of molecular embeddings in Quantitative Structure-Activity Relationship (QSAR) modeling.", 
    image: "/BiB.jpeg", 
    url: "https://academic.oup.com/bib/article/23/1/bbab365/6366344" 
  },
  { 
    id: 2, 
    title: "ChemVA: Interactive Visual Analysis", 
    desc: "Interactive visual analytics tool for exploring chemical compound similarity during virtual screening.", 
    image: "/chemva.png", 
    url: "https://ieeexplore.ieee.org/abstract/document/9222282" 
  },
  { 
    id: 3, 
    title: "Multi-Task Deep Neural Networks", 
    desc: "Utilizing multi-task deep neural network architectures for Ames mutagenicity prediction.", 
    image: "/ames.png",
    url: "https://pubs.acs.org/jcisd8/article-abstract/62/24/6342/884698/Multitask-Deep-Neural-Networks-for-Ames?redirectedFrom=fulltext" 
  },
  { 
    id: 4, 
    title: "Neural-based Drug Property Prediction", 
    desc: "Overcoming feature selection and applicability domain limitations in drug-related property prediction.", 
    image: "/Neural.jpg", 
    url: "https://www.sciencedirect.com/science/article/pii/S1568494619305587" 
  },
  { 
    id: 5, 
    title: "Detection of Racial Stereotypes in Spanish Text", 
    desc: "A multi-task learning approach tailored for the low-resource detection of racial stereotypes in Spanish.", 
    image: "/Malnis.png", 
    url: "https://ceur-ws.org/Vol-3202/detests-paper2.pdf" 
  },
  { 
    id: 6, 
    title: "Generative AI for Drug Discovery", 
    desc: "A multidimensional taxonomy reviewing generative artificial intelligence approaches for drug discovery.", 
    image: "/Trini.jpg", 
    url: "https://wires.onlinelibrary.wiley.com/doi/abs/10.1002/widm.70104" 
  },
  { 
    id: 7, 
    title: "GenAI Explainability in Molecualr Design", 
    desc: "Interpretable generative models tailored for the de novo design of molecules.", 
    image: "/XAI.jpg", 
    url: "https://sedici.unlp.edu.ar/handle/10915/195895" 
  },
  { 
    id: 8, 
    title: "My PhD Thesis", 
    desc: "Deep learning strategies applied to drug discovery.", 
    image: "/Thesis.jpg", 
    url: "https://repositoriodigital.uns.edu.ar/handle/123456789/6737" 
  }
];

export const homeContent = {
  welcomePara: "Welcome! I'm glad you're here. This is my personal page, where I share projects, publications, and thoughts on building reliable ML systems (and other stuff).",
  callToPara: "Browse my work below, learn about my research, and get in touch to collaborate or talk about cats 😊"
};

export const professionalItems = [
  {
    id: 1,
    title: "Real-Time Construction Platform",
    desc: "I designed an end-to-end, high-scale collaborative platform to handle real-time floorplan takeoffs. It seamlessly manages massive traffic and data payloads for heavy enterprise estimation ops.",
    image: "/prof1.svg",
    url: "https://example.com/project1"
  },
  {
    id: 2,
    title: "Healthcare NLP Pipeline",
    desc: "I built a secure MLOps infrastructure using the Gemini Enterprise Agent Platform to automatically parse complex medical records and streamline tedious insurance workflows.",
    image: "/prof2.svg",
    url: "https://example.com/project2"
  },
  {
    id: 3,
    title: "Custom RAG Agents",
    desc: "I developed tailored agentic AI workflows using LangChain and advanced embeddings to solve specific, real-world business bottlenecks across the travel, e-commerce, and consulting sectors.",
    image: "/prof3.svg",
    url: "https://example.com/project3"
  },
  {
    id: 4,
    title: "ChemVA Analytics Tool",
    desc: "I helped build and deploy an interactive visual analytics web app that leverages deep learning to easily process and analyze massive chemical datasets for virtual drug screening.",
    image: "/prof4.svg",
    url: "https://example.com/project4"
  },
  {
    id: 5,
    title: "Government Data Warehouse",
    desc: "I designed automated ETL pipelines to pull together fragmented data from various enterprise and judicial systems into a unified source. This allowed the government agency to finally have a clean, centralized data warehouse. The new architecture completely streamlined how they track internal job pipelines and daily incident reports.\nBy building solid data models, we made sure the information was always accurate and easy to query. This setup gave their teams reliable insights without having to wrestle with messy, raw data sets.",
    image: "/prof1.svg",
    url: "https://example.com/project5"
  },
  {
    id: 6,
    title: "Oil & Gas Observability",
    desc: "Working with a Tier-1 Oil and Gas client, I engineered a large-scale observability architecture to monitor their heavy industrial operations. The system was built to easily process over 50,000 telemetry signals every single week without breaking a sweat.\nI also integrated predictive models to help them anticipate equipment issues before they actually happened. All of this complex data was fed into clean, interactive dashboards for the engineering teams. It turned a massive stream of noisy data into clear, actionable insights right on the ground.",
    image: "/prof2.svg",
    url: "https://example.com/project6"
  },
  {
    id: 7,
    title: "Healthcare Automated Workflows",
    desc: "I structured strict, event-driven data pipelines for a healthcare provider to securely handle highly sensitive patient PII and medical records. This backend supported an agentic AI chatbot designed to efficiently route medical consultations and parse prescription details. The system completely automated their tedious insurance workflows while staying strictly compliant with industry regulations.\nUsing advanced NLP models, we took the manual heavy lifting out of processing unstructured clinical data. This meant the medical staff could spend way less time doing paperwork and more time focusing on actual patient care.",
    image: "/prof3.svg",
    url: "https://example.com/project7"
  },
  {
    id: 8,
    title: "Manufacturing Multiagent System",
    desc: "I developed a custom multiagent system tailored specifically for a manufacturing client to optimize their factory floor operations. By leveraging the Google Cloud Agent Development Kit (ADK), I built specialized AI agents that seamlessly communicated with each other in real time.\nThese agents worked together to monitor supply chain bottlenecks and dynamically adjust production schedules on the fly. The whole architecture was designed to be easily scalable as the factory added new assembly lines. Ultimately, this intelligent automation took a lot of the guesswork out of their daily logistics.",
    image: "/prof4.svg",
    url: "https://example.com/project8"
  }
];