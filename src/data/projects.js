export const projects = [
  {
  id: "deep-packet-inspection",

  title: "Deep Packet Inspection & Network Intelligence Platform",

  folder: "DeepPacketInspection",

  image: "./dpiconsole.png",

  github: "https://github.com/S672672/Deep-Packet-Inspection",

  live: "https://dpi-console-duxl.onrender.com/policies",

  readme: {

    overview:
      "A network security and traffic intelligence platform that analyzes real PCAP traffic at packet and flow level to identify protocols, applications, domains, TLS SNI, network relationships, suspicious behavior, and policy violations. Built with a high-performance packet analysis engine and an interactive Next.js security dashboard.",

    problem:
      "Raw packet captures contain large amounts of low-level network data that are difficult to interpret manually. Security and network engineers need a way to move from individual packets to meaningful flows, applications, domains, threats, and architectural relationships while understanding how traffic behaves across the network.",

    interesting:
      "Instead of treating a PCAP as a collection of packets, the platform reconstructs network activity into flows and higher-level intelligence. It combines packet parsing, connection tracking, TLS SNI and HTTP analysis, DNS inspection, application fingerprinting, policy evaluation, anomaly detection, and risk scoring to turn raw traffic into an interactive security investigation environment.",

    contribution:
      "Designed and developed the packet-processing engine, PCAP analysis pipeline, protocol parsers, bidirectional flow tracking, TLS/SNI and HTTP inspection, DNS analysis, application detection, policy engine, traffic statistics, threat detection, risk scoring, topology generation, timeline analysis, and the Next.js-based network security dashboard.",

  },

  technologies: [

    "Node.js",
    "TypeScript",
    "Next.js",
    "React",
    "PCAP",
    "TCP/IP",
    "TLS",
    "DNS",
    "HTTP",
    "Worker Threads",
    "Buffer / Stream Processing"

  ],

  highlights: [

    "Real PCAP packet analysis",

    "Ethernet, IPv4/IPv6, TCP and UDP parsing",

    "Five-tuple bidirectional flow tracking",

    "TCP connection and flow analysis",

    "TLS ClientHello and SNI extraction",

    "HTTP Host and request analysis",

    "DNS query and response analysis",

    "Application and protocol fingerprinting",

    "IP, domain, and application-based policy enforcement",

    "Forwarded and dropped packet analysis",

    "Output PCAP generation",

    "Network traffic statistics and flow analytics",

    "Suspicious traffic and anomaly detection",

    "Explainable network risk scoring",

    "Network topology reconstruction",

    "Traffic timeline and incident analysis",

    "Policy impact simulation",

    "PCAP comparison and traffic investigation",

    "Interactive network security dashboard"

  ],

  challenges: [

    {
      challenge:
        "Reimplementing a low-level packet inspection engine without relying on the original native backend",

      approach:
        "Reimplemented the packet-processing pipeline in Node.js and TypeScript using Buffer-based binary parsing, modular protocol parsers, streaming PCAP processing, and strongly typed network models while preserving the behavior of the original DPI implementation."
    },

    {
      challenge:
        "Tracking network connections across both directions of a flow",

      approach:
        "Implemented normalized five-tuple flow identification so packets traveling in opposite directions are associated with the same logical connection, allowing the engine to maintain application, protocol, byte, packet, and security state at flow level."
    },

    {
      challenge:
        "Extracting useful application information from encrypted traffic",

      approach:
        "Implemented TLS ClientHello inspection and SNI extraction without decrypting HTTPS traffic, combined with HTTP Host and DNS analysis to identify domains and applications from available network metadata."
    },

    {
      challenge:
        "Turning raw packet data into meaningful security intelligence",

      approach:
        "Built higher-level analysis layers on top of packet and flow data to identify suspicious connection patterns, DNS anomalies, unusual traffic behavior, and other indicators, with explainable risk scores based on observable evidence."
    },

    {
      challenge:
        "Applying network policies to real traffic rather than simulated results",

      approach:
        "Implemented policy evaluation for application, domain, and IP-based rules and connected policy decisions directly to flow state so packets are classified as allowed or blocked according to the actual analyzed traffic."
    },

    {
      challenge:
        "Making large PCAP analysis practical in a JavaScript runtime",

      approach:
        "Used Buffer-based binary processing, streaming techniques, bounded state, and worker-based processing where appropriate to avoid unnecessary memory usage while maintaining consistent flow state."
    },

    {
      challenge:
        "Presenting complex network data in a form useful for investigation",

      approach:
        "Built an interactive Next.js dashboard that transforms packet-level results into flows, applications, domains, threats, risk scores, timelines, and network topology so users can investigate traffic from multiple levels of abstraction."
    }

  ],

  learned: [

    "Deep Packet Inspection concepts",

    "PCAP file format and binary packet processing",

    "TCP/IP protocol analysis",

    "Network flow modeling and five-tuple tracking",

    "TLS ClientHello and SNI inspection",

    "DNS and HTTP protocol analysis",

    "Application fingerprinting",

    "Network policy enforcement",

    "Traffic anomaly detection",

    "Network security risk scoring",

    "Graph-based network topology analysis",

    "Streaming and memory-efficient processing in Node.js",

    "Worker-based parallel processing",

    "Building security investigation interfaces",

    "Designing systems around real network infrastructure problems"

  ],

  architecture: [

    {
      layer: "Presentation",
      tech: "Next.js / React / TypeScript",
      description:
        "Interactive network security dashboard for uploading PCAPs, exploring traffic, investigating flows, reviewing threats, visualizing topology, and analyzing network behavior."
    },

    {
      layer: "API / Application Layer",
      tech: "Node.js / TypeScript",
      description:
        "Handles PCAP uploads, analysis requests, policy configuration, result generation, and communication between the frontend and the DPI engine."
    },

    {
      layer: "PCAP Processing",
      tech: "Node.js Buffers / Streams",
      description:
        "Reads real PCAP files, processes packet records, preserves timestamps and raw packet data, and generates filtered PCAP output where required."
    },

    {
      layer: "Packet Analysis",
      tech: "TypeScript / TCP/IP",
      description:
        "Parses Ethernet, IP, TCP, and UDP headers and extracts packet-level metadata required for higher-level traffic analysis."
    },

    {
      layer: "Flow Engine",
      tech: "TypeScript / Five-Tuple Tracking",
      description:
        "Groups packets into bidirectional network flows and maintains connection state, packet counts, byte counts, applications, domains, and security metadata."
    },

    {
      layer: "Protocol Intelligence",
      tech: "TLS / HTTP / DNS",
      description:
        "Inspects protocol metadata to extract TLS SNI, HTTP Host information, DNS queries, domains, and other application-level indicators without decrypting HTTPS."
    },

    {
      layer: "DPI Engine",
      tech: "TypeScript",
      description:
        "Combines packet, flow, and protocol information to classify applications, identify traffic patterns, and generate structured network intelligence."
    },

    {
      layer: "Policy Engine",
      tech: "TypeScript",
      description:
        "Evaluates IP, domain, and application rules against analyzed traffic and determines whether flows should be allowed or blocked."
    },

    {
      layer: "Security Intelligence",
      tech: "TypeScript",
      description:
        "Analyzes traffic behavior for suspicious patterns, DNS anomalies, scanning activity, and other indicators while producing explainable risk assessments."
    },

    {
      layer: "Topology & Timeline",
      tech: "Graph Algorithms / TypeScript",
      description:
        "Transforms observed communication relationships and packet timestamps into network topology graphs and chronological traffic events for investigation."
    }

  ],

},
  {
  id: "netverge",

  title: "NetVerge",

  folder: "NetVerge",

  image: "./netverge.png",

  github: "https://github.com/S672672/NetVerge.git",

  live: "https://netverge.netlify.app",

  readme: {

    overview:
      "A browser-based network infrastructure planning and analysis platform that allows users to visually design network topologies, identify architectural risks, simulate infrastructure failures, and evaluate resilience, security, and capacity before deployment.",

    problem:
      "Network architecture is often designed across disconnected diagrams, spreadsheets, and manual analysis. This makes it difficult to identify single points of failure, connectivity issues, segmentation problems, and the impact of infrastructure failures before deployment.",

    interesting:
      "Instead of being only a network diagramming tool, NetVerge treats the topology as a graph and analyzes the actual relationships between devices and connections to uncover architectural weaknesses and simulate failure scenarios.",

    contribution:
      "Designed and developed the topology editor, network data model, graph-based analysis engine, failure simulation workflow, architecture validation, local project persistence, and network planning utilities.",

  },

  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "React Flow",
    "Zustand",
    "IndexedDB"
  ],

  highlights: [

    "Visual network topology design",

    "Graph-based network connectivity analysis",

    "Single point of failure detection",

    "Infrastructure failure simulation",

    "Network resilience analysis",

    "Subnet and IP configuration validation",

    "VLAN and network segmentation planning",

    "Local-first project persistence with IndexedDB",

    "Topology import and export",

  ],

  challenges: [

    {
      challenge: "Representing a network topology as an analyzable data structure",

      approach:
        "Modeled network devices and connections as a graph, allowing the application to perform connectivity, reachability, path, and critical-node analysis directly against the user's topology.",
    },

    {
      challenge: "Detecting architectural weaknesses dynamically",

      approach:
        "Implemented topology-driven validation rules to identify issues such as single points of failure, unreachable devices, configuration conflicts, and segmentation weaknesses instead of relying on predefined results.",
    },

    {
      challenge: "Simulating infrastructure failures without modifying the original design",

      approach:
        "Created temporary failure scenarios from the current topology and recalculated connectivity and affected components to determine the actual impact of device or connection failures.",
    },

    {
      challenge: "Providing persistent project storage without a backend",

      approach:
        "Implemented a local-first persistence layer using IndexedDB so network projects can be stored and restored directly in the user's browser without requiring a hosted database.",
    },

  ],

  learned: [

    "Graph data structures and network topology modeling",

    "Graph traversal and connectivity analysis",

    "Failure and resilience analysis",

    "Building rule-based validation engines",

    "Designing complex interactive interfaces with React Flow",

    "Client-side persistence with IndexedDB",

    "State management for complex visual applications",

    "Designing software around real-world infrastructure problems",

  ],

  architecture: [

    {
      layer: "Presentation",

      tech: "Next.js / React / TypeScript",

      description:
        "Interactive engineering interface for designing network topologies, configuring devices, running analysis, and visualizing architecture risks.",
    },

    {
      layer: "Topology Engine",

      tech: "React Flow",

      description:
        "Provides the visual topology editor and represents network devices and connections as an interactive graph.",
    },

    {
      layer: "Analysis Engine",

      tech: "TypeScript / Graph Algorithms",

      description:
        "Analyzes the actual topology to determine connectivity, reachability, critical nodes, failure impact, and architecture issues.",
    },

    {
      layer: "State Management",

      tech: "Zustand",

      description:
        "Manages topology state, device configuration, connections, scenarios, and user interactions across the application.",
    },

    {
      layer: "Persistence",

      tech: "IndexedDB",

      description:
        "Stores network projects locally in the browser, enabling persistent project management without requiring a remote database or backend service.",
    },

  ],

  },
  {
    id: "ip-address-tracker",
    title: "IP Address Tracker",
    folder: "IpAddressTracker",
    image: "./ipaddresstracker.png",
    github: "https://github.com/S672672/IpAddressTracker-using-react",
    live: "https://trackaddress.netlify.app/",
    readme: {
      overview:
        "A web application that pinpoints geographical locations based on IP addresses, built to demonstrate mastery of APIs and geolocation services.",
      problem:
        "Visualizing IP address locations in an intuitive way requires combining multiple APIs — geolocation, mapping, and IP lookup — into a cohesive experience.",
      interesting:
        "The challenge of integrating real-time geolocation data with an interactive map interface, making abstract network data tangible and visual.",
      contribution:
        "Designed and built the full front-end application, integrating multiple APIs and creating a responsive, interactive map experience.",
    },
    technologies: ["React", "JavaScript", "REST APIs", "Geolocation API", "Tailwind CSS"],
    highlights: [
      "Real-time IP geolocation lookup",
      "Interactive map integration",
      "Responsive design across devices",
      "Clean, intuitive user interface",
    ],
    challenges: [
      {
        challenge: "Integrating multiple APIs seamlessly",
        approach:
          "Coordinated API calls to ensure data consistency and handle edge cases like private IPs or invalid addresses.",
      },
      {
        challenge: "Map rendering performance",
        approach:
          "Optimized map tile loading and marker placement for smooth interactions.",
      },
    ],
    learned: [
      "Working with geolocation and mapping APIs",
      "API integration patterns and error handling",
      "Building responsive, data-driven interfaces",
    ],
    architecture: [
      {
        layer: "Frontend",
        tech: "React / JavaScript",
        description: "Single-page application with component-based architecture for UI rendering and state management.",
      },
      {
        layer: "API Integration",
        tech: "REST APIs / Geolocation API",
        description: "Coordinated API calls for IP lookup, geolocation data, and map tile rendering.",
      },
    ],
  },
  {
    id: "playetube",
    title: "PlayeTube",
    folder: "PlayeTube",
    image: "./playetube.png",
    github: "https://github.com/S672672/playtube",
    live: "https://playetubee.netlify.app/",
    readme: {
      overview:
        "A video playing application created using Next.js to watch videos.",
      problem:
        "Building a smooth video browsing and playback experience that feels fast and responsive.",
      interesting:
        "Leveraging Next.js for server-side rendering and optimized performance in a media-heavy application.",
      contribution:
        "Built the full application using Next.js, handling video fetching, display, and playback.",
    },
    technologies: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
    highlights: [
      "Server-side rendering for fast initial load",
      "Smooth video playback experience",
      "Modern, clean UI design",
    ],
    challenges: [
      {
        challenge: "Optimizing video loading performance",
        approach:
          "Used Next.js SSR and lazy loading to ensure videos load efficiently without blocking the UI.",
      },
    ],
    learned: [
      "Next.js routing and SSR capabilities",
      "Media handling in web applications",
      "Performance optimization for content-heavy apps",
    ],
    architecture: [
      {
        layer: "Frontend",
        tech: "Next.js / React",
        description: "Server-side rendered application with optimized routing and page-level code splitting.",
      },
      {
        layer: "Data Layer",
        tech: "Video APIs / External Sources",
        description: "Fetches and manages video data from external sources with caching and lazy loading.",
      },
    ],
  },
  {
    id: "spend-sense",
    title: "Spend Sense",
    folder: "SpendSense",
    image: "./expensetracker.png",
    github: "https://github.com/S672672/Expense-Tracker",
    live: null,
    readme: {
      overview:
        "A comprehensive web application enabling users to track and manage their expenses effectively. Designed with user-friendly features for seamless financial oversight.",
      problem:
        "Personal finance tracking needs to be simple, visual, and accessible — most tools are either too complex or too basic.",
      interesting:
        "Creating a clean expense categorization system that makes financial data easy to understand at a glance.",
      contribution:
        "Designed and developed the full expense tracking application with category management and visual summaries.",
    },
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    highlights: [
      "Expense categorization and tracking",
      "Visual summaries of spending patterns",
      "Clean, intuitive interface",
    ],
    challenges: [
      {
        challenge: "Making expense data visually meaningful",
        approach:
          "Built summary views and categorization that turn raw numbers into actionable insights.",
      },
    ],
    learned: [
      "State management for complex data",
      "Data visualization patterns",
      "User experience design for data-heavy applications",
    ],
    architecture: [
      {
        layer: "Frontend",
        tech: "React / JavaScript",
        description: "Interactive UI with categorized expense views and visual spending summaries.",
      },
      {
        layer: "State Management",
        tech: "React State / Local Storage",
        description: "Manages expense entries, categories, and summary calculations with persistent local storage.",
      },
    ],
  },
  {
    id: "hamro-mart",
    title: "Hamro Mart",
    folder: "HamroMart",
    image: "./inventory.png",
    github: "https://github.com/S672672/Inventory_tracking",
    live: null,
    readme: {
      overview:
        "A web application for grocery mart, helping to track stock availability efficiently. Built to streamline the operational workflow.",
      problem:
        "Small grocery stores need an efficient way to track inventory without complex enterprise software.",
      interesting:
        "Building a practical tool that solves a real-world problem for local businesses.",
      contribution:
        "Developed the inventory tracking system with stock management features.",
    },
    technologies: ["React", "JavaScript", "Node.js", "MongoDB"],
    highlights: [
      "Real-time stock availability tracking",
      "Practical inventory management",
      "Built for real-world use case",
    ],
    challenges: [
      {
        challenge: "Real-time stock updates",
        approach:
          "Implemented efficient state management to keep inventory counts accurate and responsive.",
      },
    ],
    learned: [
      "Full-stack application development",
      "Database design for inventory systems",
      "CRUD operations and data persistence",
    ],
    architecture: [
      {
        layer: "Frontend",
        tech: "React / JavaScript",
        description: "User interface for inventory management with real-time stock display.",
      },
      {
        layer: "Backend",
        tech: "Node.js / Express",
        description: "REST API handling inventory CRUD operations and stock tracking logic.",
      },
      {
        layer: "Database",
        tech: "MongoDB",
        description: "Document-based storage for product inventory and stock records.",
      },
    ],
  },
  {
    id: "pet-adopt",
    title: "Pet Adoption",
    folder: "PetAdopt",
    image: "./PetAdopt.png",
    github: "https://github.com/S672672/PVVVI.git",
    live: null,
    readme: {
      overview:
        "A full-stack MERN application for pet adoption, allowing users to give away or adopt pets with profile submissions, including photos and descriptions.",
      problem:
        "Connecting pet owners who need to rehome their pets with people looking to adopt requires a trusted, easy-to-use platform.",
      interesting:
        "Building a full-stack application with authentication, file uploads, and real-time request management — all in the MERN stack.",
      contribution:
        "Built the complete MERN stack application including authentication, pet profiles, request management, and photo uploads.",
    },
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Authentication", "File Uploads"],
    highlights: [
      "Secure user authentication",
      "Pet profile creation with photo uploads",
      "Adoption request management system",
      "Form validation and error handling",
      "Full CRUD operations",
    ],
    challenges: [
      {
        challenge: "Secure file upload and storage",
        approach:
          "Implemented secure photo upload handling with validation and proper storage strategy.",
      },
      {
        challenge: "Authentication and authorization",
        approach:
          "Built a complete auth system ensuring users can only manage their own pet listings and requests.",
      },
    ],
    learned: [
      "Full-stack MERN development",
      "Authentication and authorization patterns",
      "File upload handling and storage",
      "Building production-ready CRUD applications",
    ],
    architecture: [
      {
        layer: "Frontend",
        tech: "React / JavaScript",
        description: "User interface for pet browsing, profile creation, and adoption request management.",
      },
      {
        layer: "Backend",
        tech: "Node.js / Express.js",
        description: "RESTful API with authentication middleware, file upload handling, and request routing.",
      },
      {
        layer: "Database",
        tech: "MongoDB",
        description: "Document storage for user accounts, pet profiles, and adoption requests.",
      },
      {
        layer: "Auth & Storage",
        tech: "JWT / File Uploads",
        description: "Authentication tokens and secure photo upload storage.",
      },
    ],
  },
];
