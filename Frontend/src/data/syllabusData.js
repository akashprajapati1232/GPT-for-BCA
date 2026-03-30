// Yeh static syllabus dataset hai jo semester-wise subjects aur units return karta hai.
// Abhi data local rakha gaya hai taaki UI bina backend ke bhi kaam kare.
const syllabusData = [
  {
    semester: 1,
    title: "Semester 1",
    subjects: [
      {
        name: "Computer Fundamentals & Office Automation",
        units: [
          "Unit 1: Introduction to Computers – History, Types, Characteristics",
          "Unit 2: Number Systems – Binary, Octal, Hexadecimal",
          "Unit 3: MS Word – Formatting, Tables, Mail Merge",
          "Unit 4: MS Excel – Formulas, Functions, Charts",
          "Unit 5: MS PowerPoint – Presentations, Animations, Slide Design",
        ],
      },
      {
        name: "Programming in C",
        units: [
          "Unit 1: Introduction to C – History, Structure, Data Types",
          "Unit 2: Operators & Expressions – Arithmetic, Relational, Logical",
          "Unit 3: Control Statements – if, switch, loops",
          "Unit 4: Functions – Definition, Recursion, Scope",
          "Unit 5: Pointers & Memory Management",
        ],
      },
      {
        name: "Mathematics I",
        units: [
          "Unit 1: Set Theory – Sets, Relations, Functions",
          "Unit 2: Matrix Algebra – Operations, Determinants, Inverse",
          "Unit 3: Differential Calculus – Limits, Derivatives",
          "Unit 4: Integral Calculus – Definite and Indefinite Integrals",
          "Unit 5: Probability – Basic Concepts, Theorems",
        ],
      },
      {
        name: "Digital Electronics",
        units: [
          "Unit 1: Boolean Algebra – Laws, Theorems, Simplification",
          "Unit 2: Logic Gates – AND, OR, NOT, NAND, NOR, XOR",
          "Unit 3: Combinational Circuits – Adders, Subtractors, Multiplexers",
          "Unit 4: Sequential Circuits – Flip-Flops, Counters, Registers",
          "Unit 5: Memory Units & Programmable Logic Devices",
        ],
      },
      {
        name: "English Communication Skills",
        units: [
          "Unit 1: Grammar – Parts of Speech, Sentence Structure",
          "Unit 2: Reading Comprehension & Vocabulary",
          "Unit 3: Business Writing – Emails, Reports, Letters",
          "Unit 4: Presentation & Communication Skills",
          "Unit 5: Group Discussion & Interview Techniques",
        ],
      },
    ],
    pdf: "/pdfs/semester1.pdf",
  },
  {
    semester: 2,
    title: "Semester 2",
    subjects: [
      {
        name: "Advanced C Programming",
        units: [
          "Unit 1: Arrays – 1D, 2D, Multidimensional Arrays",
          "Unit 2: Strings – String Functions, Pattern Matching",
          "Unit 3: Structures & Unions – Definition, Nested Structures",
          "Unit 4: File Handling – File I/O, Sequential & Random Access",
          "Unit 5: Dynamic Memory Allocation – malloc, calloc, realloc, free",
          "Unit 6: Linked Lists – Singly, Doubly, Circular",
        ],
      },
      {
        name: "Computer Architecture & Assembly Language",
        units: [
          "Unit 1: CPU Architecture – ALU, CU, Registers, Data Path",
          "Unit 2: Memory Hierarchy – Cache, RAM, ROM, Virtual Memory",
          "Unit 3: Instruction Set Architecture – RISC vs CISC",
          "Unit 4: Assembly Language Programming – Syntax, Directives",
          "Unit 5: I/O Organization – Interrupts, DMA, I/O Interfaces",
        ],
      },
      {
        name: "Financial Accounting with Tally",
        units: [
          "Unit 1: Accounting Basics – Principles, Types of Accounts",
          "Unit 2: Journal & Ledger – Recording Transactions",
          "Unit 3: Trial Balance & Final Accounts",
          "Unit 4: Tally ERP 9 – Company Creation, Groups, Ledgers",
          "Unit 5: GST in Tally – Tax Configuration, Returns",
        ],
      },
      {
        name: "Mathematics II",
        units: [
          "Unit 1: Differential Equations – First and Second Order",
          "Unit 2: Laplace Transform – Properties and Applications",
          "Unit 3: Numerical Methods – Bisection, Newton-Raphson",
          "Unit 4: Statistics – Mean, Variance, Correlation, Regression",
          "Unit 5: Discrete Mathematics – Logic, Graphs, Trees",
        ],
      },
      {
        name: "Principles of Management",
        units: [
          "Unit 1: Management – Definition, Functions, Evolution",
          "Unit 2: Planning & Decision Making – Types, Process",
          "Unit 3: Organizing – Structure, Delegation, Span of Control",
          "Unit 4: Leadership & Motivation – Theories",
          "Unit 5: Controlling – Process, Techniques, MIS",
        ],
      },
    ],
    pdf: "/pdfs/semester2.pdf",
  },
  {
    semester: 3,
    title: "Semester 3",
    subjects: [
      {
        name: "Data Structures Using C",
        units: [
          "Unit 1: Introduction to Data Structures – Arrays, Complexity",
          "Unit 2: Stacks & Queues – Operations, Applications",
          "Unit 3: Linked Lists – Singly, Doubly, Circular",
          "Unit 4: Trees – Binary Trees, BST, AVL Trees",
          "Unit 5: Graphs – BFS, DFS, Shortest Path Algorithms",
        ],
      },
      {
        name: "Object Oriented Programming Using C++",
        units: [
          "Unit 1: OOP Concepts – Classes, Objects, Encapsulation",
          "Unit 2: Constructors & Destructors – Types, Copy Constructor",
          "Unit 3: Inheritance – Types, Virtual Functions, Polymorphism",
          "Unit 4: Operator Overloading & Friend Functions",
          "Unit 5: Templates, Exception Handling, STL",
        ],
      },
      {
        name: "Computer Networks",
        units: [
          "Unit 1: Network Fundamentals – Types, Topologies, OSI Model",
          "Unit 2: Data Link Layer – Framing, Error Control, Flow Control",
          "Unit 3: Network Layer – IP Addressing, Routing, Subnetting",
          "Unit 4: Transport & Session Layer – TCP, UDP",
          "Unit 5: Application Layer – HTTP, FTP, DNS, SMTP",
        ],
      },
      {
        name: "Database Management Systems",
        units: [
          "Unit 1: Introduction to DBMS – Architecture, Data Models",
          "Unit 2: Entity-Relationship Model – ER Diagrams",
          "Unit 3: Relational Algebra & SQL – DDL, DML, DCL",
          "Unit 4: Query Optimization & Indexing",
          "Unit 5: Transactions, Concurrency Control, Recovery",
        ],
      },
      {
        name: "Operating Systems",
        units: [
          "Unit 1: OS Fundamentals – Process Management, Scheduling",
          "Unit 2: Memory Management – Paging, Segmentation",
          "Unit 3: File Systems – Structure, Access Methods",
          "Unit 4: I/O Management & Device Drivers",
          "Unit 5: Deadlock – Detection, Avoidance, Prevention",
        ],
      },
    ],
    pdf: "/pdfs/semester3.pdf",
  },
  {
    semester: 4,
    title: "Semester 4",
    subjects: [
      {
        name: "Introduction to DBMS",
        units: [
          "Unit 1: Advanced SQL – Joins, Subqueries, Views",
          "Unit 2: Normalization – 1NF, 2NF, 3NF, BCNF",
          "Unit 3: Transaction Management – ACID Properties",
          "Unit 4: Stored Procedures, Triggers, Cursors",
          "Unit 5: NoSQL Databases – MongoDB, Document & Key-Value Stores",
        ],
      },
      {
        name: "Introduction to Python",
        units: [
          "Unit 1: Python Basics – Syntax, Data Types, Operators",
          "Unit 2: Control Flow – Conditions, Loops, List Comprehensions",
          "Unit 3: Functions & Modules – Lambda, Decorators, Packages",
          "Unit 4: OOP in Python – Classes, Inheritance, Polymorphism",
          "Unit 5: File Handling, Exception Handling, Regular Expressions",
        ],
      },
      {
        name: "Optimization Techniques",
        units: [
          "Unit 1: Linear Programming – Formulation, Graphical Method",
          "Unit 2: Simplex Method – Big-M, Two-Phase",
          "Unit 3: Transportation & Assignment Problems",
          "Unit 4: Network Flow – PERT/CPM",
          "Unit 5: Game Theory – Two-Person Zero-Sum Games",
        ],
      },
      {
        name: "Software Engineering",
        units: [
          "Unit 1: SDLC – Models (Waterfall, Agile, Spiral)",
          "Unit 2: Requirements Engineering – SRS Document",
          "Unit 3: Software Design – UML, Design Patterns",
          "Unit 4: Software Testing – Unit, Integration, System Testing",
          "Unit 5: Project Management – Estimation, Risk, Quality",
        ],
      },
      {
        name: "Web Development Using PHP",
        units: [
          "Unit 1: HTML5 & CSS3 – Structure, Layout, Responsive Design",
          "Unit 2: JavaScript – DOM Manipulation, Events, AJAX",
          "Unit 3: PHP Fundamentals – Syntax, Arrays, Functions",
          "Unit 4: PHP & MySQL – CRUD Operations, Sessions, Cookies",
          "Unit 5: PHP Frameworks – Laravel Basics, MVC Architecture",
        ],
      },
    ],
    pdf: "/pdfs/semester4.pdf",
  },
  {
    semester: 5,
    title: "Semester 5",
    subjects: [
      {
        name: "Java Programming",
        units: [
          "Unit 1: Java Fundamentals – JVM, JRE, Data Types, Operators",
          "Unit 2: OOP in Java – Classes, Objects, Inheritance, Interfaces",
          "Unit 3: Exception Handling & Multithreading",
          "Unit 4: Collections Framework – ArrayList, HashMap, LinkedList",
          "Unit 5: JDBC & File I/O – Database Connectivity",
        ],
      },
      {
        name: "Computer Graphics",
        units: [
          "Unit 1: Graphics Fundamentals – Output Primitives, Algorithms",
          "Unit 2: 2D Transformations – Translation, Rotation, Scaling",
          "Unit 3: 3D Transformations & Projections",
          "Unit 4: Clipping Algorithms – Cohen-Sutherland, Cyrus-Beck",
          "Unit 5: Illumination Models, Shading, Ray Tracing",
        ],
      },
      {
        name: "Internet of Things",
        units: [
          "Unit 1: IoT Architecture – Layers, Protocols, Platforms",
          "Unit 2: Sensors & Actuators – Types, Interfacing",
          "Unit 3: Raspberry Pi & Arduino Programming",
          "Unit 4: IoT Communication – MQTT, CoAP, HTTP",
          "Unit 5: IoT Applications – Smart Home, Agriculture, Healthcare",
        ],
      },
      {
        name: "Artificial Intelligence",
        units: [
          "Unit 1: AI Fundamentals – History, Types, Applications",
          "Unit 2: Search Algorithms – BFS, DFS, A*, Hill Climbing",
          "Unit 3: Knowledge Representation – Logic, Semantic Nets",
          "Unit 4: Machine Learning Basics – Supervised, Unsupervised",
          "Unit 5: Natural Language Processing – Tokenization, POS Tagging",
        ],
      },
      {
        name: "Elective I – Mobile Application Development",
        units: [
          "Unit 1: Android Fundamentals – Activity, Lifecycle, Intents",
          "Unit 2: UI Components – Layouts, Views, RecyclerView",
          "Unit 3: Data Storage – SharedPreferences, SQLite, Room DB",
          "Unit 4: Networking – REST API, Retrofit, Volley",
          "Unit 5: Publishing App – APK, Play Store Guidelines",
        ],
      },
    ],
    pdf: "/pdfs/semester5.pdf",
  },
  {
    semester: 6,
    title: "Semester 6",
    subjects: [
      {
        name: "Computer Network Security",
        units: [
          "Unit 1: Security Fundamentals – CIA Triad, Threats, Attacks",
          "Unit 2: Cryptography – Symmetric, Asymmetric, Hash Functions",
          "Unit 3: PKI & Digital Signatures – SSL/TLS, Certificates",
          "Unit 4: Firewalls, IDS/IPS, VPN Technologies",
          "Unit 5: Cyber Laws – IT Act, Ethical Hacking",
        ],
      },
      {
        name: "E-Commerce",
        units: [
          "Unit 1: E-Commerce Fundamentals – Types, Business Models",
          "Unit 2: E-Commerce Technologies – EDI, XML, Web Services",
          "Unit 3: Payment Systems – Digital Wallets, UPI, Gateways",
          "Unit 4: Security in E-Commerce – SSL, SET Protocol",
          "Unit 5: E-Commerce Strategy – Marketing, Customer Acquisition",
        ],
      },
      {
        name: "Elective II (A) – Cloud Computing",
        units: [
          "Unit 1: Cloud Fundamentals – IaaS, PaaS, SaaS Models",
          "Unit 2: Virtualization – Hypervisors, Containers, Docker",
          "Unit 3: AWS & Azure – Core Services, EC2, S3, Azure VMs",
          "Unit 4: Cloud Security – Data Protection, Compliance",
          "Unit 5: DevOps & CI/CD – Pipelines, Kubernetes Basics",
        ],
      },
      {
        name: "Elective II (B) – Data Warehousing & Data Mining",
        units: [
          "Unit 1: Data Warehouse – Architecture, OLAP vs OLTP",
          "Unit 2: ETL Process – Extraction, Transformation, Loading",
          "Unit 3: Data Mining Techniques – Classification, Clustering",
          "Unit 4: Association Rule Mining – Apriori Algorithm",
          "Unit 5: Data Visualization – Tools, Dashboards, BI Reports",
        ],
      },
      {
        name: "Information System Analysis Design & Implementation",
        units: [
          "Unit 1: Systems Analysis – Feasibility Study, Fact Finding",
          "Unit 2: System Design – Input/Output Design, Database Design",
          "Unit 3: System Implementation – Coding, Testing, Deployment",
          "Unit 4: System Maintenance – Types, Change Management",
          "Unit 5: Project Work – Capstone Project Guidelines",
        ],
      },
    ],
    pdf: "/pdfs/semester6.pdf",
  },
];

// Is default export ko Syllabus page direct consume karta hai.
export default syllabusData;
