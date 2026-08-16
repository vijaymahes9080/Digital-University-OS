# Digital University OS Architecture & Database Specification

## Common University Data Layer Schema (ERD)

```text
USER (id, name, email, role, department, cgpa, attendance_pct, placement_readiness)
  │
  ├── ENROLLMENT ── COURSE (code, name, instructor, credits, syllabus)
  │                      │
  │                      └── ATTENDANCE_LOG (date, status, total_classes, attended_classes)
  │
  ├── CAPSTONE_PROJECT (id, title, guide, progress, github_url)
  │         │
  │         └── MILESTONE (id, title, status, score, feedback)
  │
  ├── RESEARCH (publications, patents, datasets)
  │
  └── CAREER_PROFILE (target_role, skill_radar, job_matches)
```

## Vector RAG Architecture
- **Embedding Model**: `text-embedding-3-small` (1536 dims)
- **Vector DB**: Qdrant / Local In-Memory HNSW Index
- **Distance Metric**: Cosine Similarity
- **Chunking Strategy**: Recursive Character Split (Chunk Size: 512, Overlap: 64)
