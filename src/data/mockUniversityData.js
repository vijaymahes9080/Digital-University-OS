export const initialUsers = {
  student: {
    id: "STU2026042",
    name: "Alex Rivers",
    role: "student",
    title: "MCA Final-Year Scholar",
    department: "Department of Computer Applications",
    program: "Master of Computer Applications (MCA)",
    semester: "Semester IV",
    email: "alex.rivers@univ.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    cgpa: 8.41,
    attendancePct: 82,
    placementReadiness: 76,
    activeProjectsCount: 2,
    publicationsCount: 2,
    skillsCount: 14
  },
  faculty: {
    id: "FAC109",
    name: "Dr. Sarah Vance",
    role: "faculty",
    title: "Associate Professor & Head of AI Research",
    department: "Department of Computer Science",
    email: "sarah.vance@univ.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    coursesTaught: 3,
    advisees: 14,
    pendingReviews: 3,
    hIndex: 18
  },
  admin: {
    id: "ADM001",
    name: "Dean Harrison",
    role: "admin",
    title: "Dean of Academic Affairs & Registrar",
    department: "University Executive Board",
    email: "dean.harrison@univ.edu",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    totalStudents: 4850,
    totalFaculty: 240,
    activeDepartments: 12,
    overallCampusAttendance: 84.6
  }
};

export const initialCourses = [
  {
    id: "CS8501",
    code: "CS8501",
    name: "Network Security & Cryptography",
    instructor: "Dr. Sarah Vance",
    credits: 4,
    schedule: "Mon, Wed, Fri 09:30 AM - 10:30 AM",
    room: "Lab 4B",
    syllabusUnits: [
      "Unit 1: Symmetric Encryption & Classical Ciphers",
      "Unit 2: Public Key Cryptography & RSA Algorithm",
      "Unit 3: Hash Functions, Digital Signatures & MAC",
      "Unit 4: Network Security Protocols (TLS, IPsec, SSH)",
      "Unit 5: Wireless Security & Intrusion Detection Systems"
    ]
  },
  {
    id: "CS8502",
    code: "CS8502",
    name: "Advanced Data Science & Analytics",
    instructor: "Prof. Alan Turing",
    credits: 4,
    schedule: "Tue, Thu 11:00 AM - 12:30 PM",
    room: "Auditorium 2",
    syllabusUnits: [
      "Unit 1: Exploratory Data Analysis & Feature Engineering",
      "Unit 2: Supervised Machine Learning Models",
      "Unit 3: Unsupervised Clustering & Dimensionality Reduction",
      "Unit 4: Deep Learning Architectures (CNNs, RNNs, Transformers)",
      "Unit 5: Model Deployment & MLOps Pipelines"
    ]
  },
  {
    id: "CS8503",
    code: "CS8503",
    name: "Cloud Computing & DevOps Architecture",
    instructor: "Dr. Sarah Vance",
    credits: 3,
    schedule: "Mon, Wed 02:00 PM - 03:30 PM",
    room: "Cloud Lab 1",
    syllabusUnits: [
      "Unit 1: Cloud Service Models (IaaS, PaaS, SaaS) & Containers",
      "Unit 2: Orchestration with Kubernetes & Docker",
      "Unit 3: CI/CD Pipelines & Infrastructure as Code",
      "Unit 4: Serverless Computing & Microservices Design",
      "Unit 5: Cloud Security, Compliance & Cost Optimization"
    ]
  },
  {
    id: "MCA801",
    code: "MCA801",
    name: "Project & Research Methodology",
    instructor: "Dr. Sarah Vance",
    credits: 6,
    schedule: "Friday 02:00 PM - 05:00 PM",
    room: "Research Center 301",
    syllabusUnits: [
      "Unit 1: Formulating Academic & Industry Research Problems",
      "Unit 2: Systematic Literature Review & Paper Drafting",
      "Unit 3: Quantitative & Qualitative Experimental Design",
      "Unit 4: Academic Writing, LaTeX & Citation Standards",
      "Unit 5: IP, Patent Filing & Research Ethics"
    ]
  }
];

export const initialAttendance = [
  {
    courseId: "CS8501",
    courseName: "Network Security & Cryptography",
    code: "CS8501",
    totalClasses: 25,
    attendedClasses: 17,
    percentage: 68.0,
    status: "HIGH RISK",
    requiredPct: 75.0,
    recommendedAction: "Attend next 4 consecutive classes to reach 75.0% threshold.",
    classesNeeded: 4,
    recentLog: [
      { date: "2026-08-14", status: "Present" },
      { date: "2026-08-12", status: "Absent" },
      { date: "2026-08-10", status: "Absent" },
      { date: "2026-08-07", status: "Present" },
      { date: "2026-08-05", status: "Present" }
    ]
  },
  {
    courseId: "CS8502",
    courseName: "Advanced Data Science & Analytics",
    code: "CS8502",
    totalClasses: 25,
    attendedClasses: 22,
    percentage: 88.0,
    status: "SAFE",
    requiredPct: 75.0,
    recommendedAction: "Great job! You can safely miss 4 classes without dropping below 75%.",
    classesNeeded: 0,
    recentLog: [
      { date: "2026-08-15", status: "Present" },
      { date: "2026-08-13", status: "Present" },
      { date: "2026-08-11", status: "Present" },
      { date: "2026-08-08", status: "Present" },
      { date: "2026-08-06", status: "Absent" }
    ]
  },
  {
    courseId: "CS8503",
    courseName: "Cloud Computing & DevOps Architecture",
    code: "CS8503",
    totalClasses: 25,
    attendedClasses: 21,
    percentage: 84.0,
    status: "SAFE",
    requiredPct: 75.0,
    recommendedAction: "On track. Maintain current attendance pace.",
    classesNeeded: 0,
    recentLog: [
      { date: "2026-08-14", status: "Present" },
      { date: "2026-08-12", status: "Present" },
      { date: "2026-08-10", status: "Present" },
      { date: "2026-08-07", status: "Present" },
      { date: "2026-08-05", status: "Present" }
    ]
  },
  {
    courseId: "MCA801",
    courseName: "Project & Research Methodology",
    code: "MCA801",
    totalClasses: 20,
    attendedClasses: 18,
    percentage: 90.0,
    status: "EXCELLENT",
    requiredPct: 75.0,
    recommendedAction: "Exemplary attendance.",
    classesNeeded: 0,
    recentLog: [
      { date: "2026-08-15", status: "Present" },
      { date: "2026-08-08", status: "Present" },
      { date: "2026-08-01", status: "Present" },
      { date: "2026-07-25", status: "Present" }
    ]
  }
];

export const initialProjects = [
  {
    id: "PRJ-2026-01",
    title: "Digital University OS: An AI-Powered Integrated Operating System",
    studentName: "Alex Rivers",
    studentId: "STU2026042",
    guide: "Dr. Sarah Vance",
    domain: "Artificial Intelligence & Systems",
    status: "In Progress",
    progress: 75,
    githubUrl: "https://github.com/vijaymahes9080/Digital-University-OS",
    evaluationMarks: 94,
    description: "An AI-powered integrated university operating system uniting student academics, RAG AI tutor, predictive attendance, research lifecycle, and placement skill gap analytics.",
    milestones: [
      { id: 1, title: "Proposal & System Architecture", dueDate: "2026-06-15", status: "Approved", score: 96, feedback: "Exceptional modular design." },
      { id: 2, title: "RAG Engine & Vector Data Layer", dueDate: "2026-07-20", status: "Approved", score: 92, feedback: "Solid context retrieval implementation." },
      { id: 3, title: "Placement Skill Gap Engine & Analytics", dueDate: "2026-08-25", status: "Submitted", score: null, feedback: "Pending faculty evaluation." },
      { id: 4, title: "Final Evaluation & Production Deployment", dueDate: "2026-09-30", status: "Pending", score: null, feedback: "" }
    ]
  },
  {
    id: "PRJ-2026-02",
    title: "Autonomous Drone Swarm Navigation using Deep Reinforcement Learning",
    studentName: "Alex Rivers",
    studentId: "STU2026042",
    guide: "Prof. Alan Turing",
    domain: "Robotics & Neural Networks",
    status: "Completed",
    progress: 100,
    githubUrl: "https://github.com/alexrivers/drone-swarm-rl",
    evaluationMarks: 92,
    description: "Multi-agent deep Q-learning environment for obstacle avoidance in dense urban environments.",
    milestones: [
      { id: 1, title: "Simulation Environment Setup", dueDate: "2026-02-10", status: "Approved", score: 90, feedback: "Good PyBullet setup." },
      { id: 2, title: "MARL Algorithm Implementation", dueDate: "2026-04-15", status: "Approved", score: 94, feedback: "Strong reward function convergence." },
      { id: 3, title: "Final Report & Video Demo", dueDate: "2026-05-30", status: "Approved", score: 92, feedback: "Publication ready." }
    ]
  }
];

export const initialResearch = {
  publications: [
    {
      id: "PUB-01",
      title: "Cross-Module Contextual RAG for Institutional Intelligence in Smart Universities",
      authors: "Alex Rivers, Dr. Sarah Vance",
      venue: "IEEE International Conference on Educational Technology & AI (ICETAI 2026)",
      type: "Conference Paper",
      status: "Published",
      doi: "10.1109/ICETAI.2026.1049281",
      citations: 4,
      link: "#"
    },
    {
      id: "PUB-02",
      title: "Predictive Attendance Risk Modeling using Time-Series Machine Learning in Higher Education",
      authors: "Alex Rivers, Dr. Sarah Vance, Prof. Alan Turing",
      venue: "Springer Lecture Notes in Educational Data Mining (EDM 2025)",
      type: "Book Chapter",
      status: "Published",
      doi: "10.1007/978-3-031-48291-0_14",
      citations: 9,
      link: "#"
    }
  ],
  patents: [
    {
      id: "PAT-01",
      title: "Method and System for Automated Skill-Gap Alignment and Career Intelligence in Academic LMS",
      inventors: "Alex Rivers, Dr. Sarah Vance",
      applicationNo: "202641098231 A",
      filingDate: "2026-03-14",
      status: "Under Examination",
      jurisdiction: "Indian Patent Office (IPO)"
    }
  ],
  datasets: [
    {
      id: "DS-01",
      title: "University-RAG-QA Benchmark Corpus v1.2",
      description: "1,200 curated QA pairs across computer science syllabus, university regulations, and project guidelines for benchmarking RAG systems.",
      downloads: 142,
      format: "JSON / Parquet"
    }
  ]
};

export const initialPlacement = {
  targetRole: "Data Scientist & AI Engineer",
  overallReadinessPct: 76,
  skillRadar: [
    { skill: "Python & PyTorch", current: 85, required: 80, status: "MET" },
    { skill: "SQL & Relational DB", current: 75, required: 80, status: "GAP" },
    { skill: "Machine Learning", current: 80, required: 80, status: "MET" },
    { skill: "Deep Learning (DL)", current: 40, required: 70, status: "GAP" },
    { skill: "Cloud & DevOps", current: 70, required: 65, status: "MET" },
    { skill: "System Architecture", current: 82, required: 75, status: "MET" }
  ],
  jobPostings: [
    {
      id: "JOB-101",
      company: "Google Cloud AI",
      role: "Associate AI Systems Engineer",
      package: "₹24 LPA",
      location: "Bengaluru / Hybrid",
      matchPct: 88,
      missingSkills: ["Deep Learning Models (Transformers)", "Advanced SQL"],
      deadline: "2026-09-15"
    },
    {
      id: "JOB-102",
      company: "Microsoft Research",
      role: "Junior Data Scientist - Higher Ed AI",
      package: "₹22 LPA",
      location: "Hyderabad",
      matchPct: 84,
      missingSkills: ["Deep Learning (NLP)"],
      deadline: "2026-09-20"
    },
    {
      id: "JOB-103",
      company: "Amazon Web Services",
      role: "DevOps & Cloud Solutions Associate",
      package: "₹19 LPA",
      location: "Chennai",
      matchPct: 92,
      missingSkills: [],
      deadline: "2026-09-30"
    }
  ],
  recommendations: [
    {
      id: "REC-1",
      title: "Bridge Deep Learning Skill Gap (+30%)",
      description: "Complete Unit 4 (Transformers & CNNs) in CS8502 Advanced Data Science.",
      actionLabel: "Launch AI Tutor Lesson",
      moduleTarget: "ai_tutor",
      boostPct: 8
    },
    {
      id: "REC-2",
      title: "Upgrade SQL Proficiency (+5%)",
      description: "Add a high-performance relational query module to your active final-year project.",
      actionLabel: "View Project Milestone",
      moduleTarget: "projects",
      boostPct: 4
    }
  ]
};

export const initialAnalytics = {
  departmentMetrics: [
    { name: "Computer Applications (MCA)", students: 240, avgAttendance: 85.2, passPct: 94.5, placementRate: 88.0 },
    { name: "Computer Science & Eng", students: 420, avgAttendance: 83.1, passPct: 91.2, placementRate: 86.5 },
    { name: "Data Science & AI", students: 180, avgAttendance: 87.6, passPct: 96.0, placementRate: 92.4 },
    { name: "Cybersecurity & Networks", students: 150, avgAttendance: 81.4, passPct: 89.0, placementRate: 84.0 }
  ],
  attendanceTrends: [
    { week: "Week 1", MCA: 92, CSE: 90, AI: 94 },
    { week: "Week 2", MCA: 89, CSE: 88, AI: 92 },
    { week: "Week 3", MCA: 86, CSE: 85, AI: 90 },
    { week: "Week 4", MCA: 84, CSE: 82, AI: 88 },
    { week: "Week 5", MCA: 85, CSE: 83, AI: 87 }
  ],
  skillDistribution: [
    { name: "AI & Data Science", count: 420 },
    { name: "Web & Full-Stack", count: 680 },
    { name: "Cloud & DevOps", count: 310 },
    { name: "Cybersecurity", count: 250 },
    { name: "Mobile App Dev", count: 190 }
  ]
};
