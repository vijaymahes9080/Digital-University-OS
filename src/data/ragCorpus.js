export const ragCorpusDocuments = [
  {
    id: "DOC-NS-U2",
    title: "CS8501 Network Security — Unit 2: Public Key Cryptography & RSA",
    category: "Course Syllabus",
    courseCode: "CS8501",
    unit: 2,
    chunkId: "CHUNK-NS-201",
    content: `Unit 2 focuses on Public Key Cryptography and Asymmetric Algorithms.
Key topics:
1. Fermat's and Euler's Theorems: Mathematical foundations for modular arithmetic.
2. RSA Algorithm: Key generation (p, q primes, n=p*q, phi(n)=(p-1)*(q-1), choose e coprime to phi(n), d = e^-1 mod phi(n)). Encryption: C = M^e mod n. Decryption: M = C^d mod n.
3. Diffie-Hellman Key Exchange: Discrete Logarithm problem, key agreement protocol, vulnerable to Man-in-the-Middle (MitM) attacks without digital signatures.
4. Elliptic Curve Cryptography (ECC): Higher security with smaller key sizes compared to RSA 2048-bit.
5. Key Management and Distribution: Public Key Infrastructure (PKI) and Certificate Authorities (CAs).`,
    keywords: ["network security", "unit 2", "rsa", "public key", "diffie-hellman", "ecc", "asymmetric", "encryption", "ciphers"]
  },
  {
    id: "DOC-NS-U1",
    title: "CS8501 Network Security — Unit 1: Symmetric Ciphers & Security Principles",
    category: "Course Syllabus",
    courseCode: "CS8501",
    unit: 1,
    chunkId: "CHUNK-NS-101",
    content: `Unit 1 covers Symmetric Encryption and Security Architecture.
Key topics:
1. CIA Triad: Confidentiality, Integrity, Availability.
2. Security Attacks: Passive (Eavesdropping, Traffic Analysis) vs Active (Masquerade, Replay, Modification, Denial of Service).
3. Classical Encryption Techniques: Caesar cipher, Monoalphabetic, Playfair, Hill cipher, Transposition techniques.
4. Block Ciphers: Data Encryption Standard (DES), Triple DES (3DES), Advanced Encryption Standard (AES with 128/192/256-bit keys).
5. Block Cipher Modes of Operation: Electronic Codebook (ECB), Cipher Block Chaining (CBC), Cipher Feedback (CFB), Output Feedback (OFB), Counter (CTR).`,
    keywords: ["unit 1", "symmetric", "cia triad", "des", "aes", "cipher", "attacks"]
  },
  {
    id: "DOC-REG-ATTENDANCE",
    title: "University Academic Regulations 2026 — Section 4: Attendance Policies",
    category: "University Regulation",
    courseCode: "ALL",
    chunkId: "CHUNK-REG-401",
    content: `University Attendance Regulations (Regulation 4.2):
1. Minimum Requirement: Students must maintain a minimum of 75% attendance in each registered course to be eligible for end-semester examinations.
2. Condonation: Attendance between 65% and 74.9% may be condoned by the Dean of Academic Affairs on valid medical grounds with a formal medical certificate submitted within 7 days.
3. Debarment: Students with less than 65% attendance are strictly debarred from appearing in end-semester exams and must re-register for the course in a subsequent semester.
4. Predictive Warning: The University OS automatically flags students reaching < 75% as 'HIGH RISK' and computes the exact number of consecutive classes required to restore eligibility.`,
    keywords: ["attendance", "rules", "regulation", "75%", "condonation", "medical", "debarred", "percentage", "risk"]
  },
  {
    id: "DOC-PROJ-GUIDELINES",
    title: "MCA Final-Year Capstone Project Guidelines 2026",
    category: "Project Manual",
    courseCode: "MCA801",
    chunkId: "CHUNK-PRJ-301",
    content: `MCA Capstone Project Evaluation Criteria:
1. Phase 1 Proposal (15%): Problem formulation, literature survey, and system design diagram.
2. Phase 2 Mid-Term Review (35%): Working prototype, vector data layer/RAG integration, database schema, and GitHub code commit history.
3. Phase 3 Placement & Skill Integration (20%): Demonstrating alignment between project tech stack and career skill targets.
4. Final Defense & Viva Voce (30%): Live demonstration, project report, IEEE paper manuscript, and faculty panel Q&A.`,
    keywords: ["project", "guidelines", "milestones", "evaluation", "marks", "viva", "capstone", "github", "proposal"]
  },
  {
    id: "DOC-DS-U4",
    title: "CS8502 Advanced Data Science — Unit 4: Deep Learning & Transformers",
    category: "Course Syllabus",
    courseCode: "CS8502",
    unit: 4,
    chunkId: "CHUNK-DS-401",
    content: `Unit 4 covers Neural Network Architectures and Transformers.
Key topics:
1. Convolutional Neural Networks (CNNs): Convolutional layers, pooling, spatial feature extraction, ResNet.
2. Recurrent Neural Networks (RNNs & LSTMs): Sequential processing, vanishing gradient problem, gating mechanisms.
3. Transformer Architecture: Self-attention mechanism (Query, Key, Value vectors), Multi-Head Attention, Positional Encoding, Encoder-Decoder blocks.
4. Large Language Models (LLMs): Fine-tuning, Parameter-Efficient Fine-Tuning (PEFT/LoRA), Tokenization, Vector Embeddings.
5. Retrieval-Augmented Generation (RAG): Chunking strategies, cosine similarity search in vector databases, prompt augmentation.`,
    keywords: ["deep learning", "transformers", "unit 4", "data science", "rag", "embeddings", "attention", "llm", "cnn", "lstm"]
  }
];

// Sample Quiz Questions Generator for AI Tutor
export const sampleQuizzes = {
  "CS8501": {
    unit2: [
      {
        id: "q1",
        question: "In the RSA algorithm, if p = 3 and q = 11, what is the value of Euler's totient function φ(n)?",
        options: ["33", "20", "30", "24"],
        correctIndex: 1,
        explanation: "φ(n) = (p - 1) * (q - 1) = (3 - 1) * (11 - 1) = 2 * 10 = 20."
      },
      {
        id: "q2",
        question: "Which mathematical hard problem forms the primary security foundation of the Diffie-Hellman key exchange?",
        options: ["Prime Factorization Problem", "Discrete Logarithm Problem", "Elliptic Curve Addition", "Knapsack Problem"],
        correctIndex: 1,
        explanation: "Diffie-Hellman relies on the computational difficulty of calculating Discrete Logarithms over finite fields."
      },
      {
        id: "q3",
        question: "What primary advantage does Elliptic Curve Cryptography (ECC) provide over RSA?",
        options: ["Symmetric key structure", "Smaller key size for equivalent security level", "No requirement for modular arithmetic", "Faster decryption only"],
        correctIndex: 1,
        explanation: "ECC provides comparable security to RSA with significantly smaller key sizes (e.g. 256-bit ECC ≈ 3072-bit RSA)."
      }
    ]
  }
};
