# 🚀 DevPulse AI - Backend

DevPulse AI is an AI-powered Software Engineering Command Center that helps developers understand, analyze, and improve software projects using OpenAI. The backend is built with **Python** and **FastAPI** and combines local repository analysis with Retrieval-Augmented Generation (RAG) to deliver accurate responses while minimizing OpenAI token usage.

## 🛠 Tech Stack

- Python 3.12
- FastAPI
- OpenAI API (GPT-5.6 & text-embedding-3-small)
- SQLite
- ChromaDB
- SQLAlchemy
- Tree-sitter
- GitPython
- Tiktoken

## ✨ Features

- AI Chat for Repository Q&A
- Repository Analysis
- Automated Documentation Generation
- Bug Detection & Stack Trace Explanation
- Project Health Dashboard
- RAG-based Semantic Code Search
- Token-Efficient AI Request Routing
- Local Code Parsing and Analysis

## 🤖 How We Used Codex

OpenAI Codex was used to accelerate backend development by generating FastAPI routes, creating project structure, scaffolding services, improving API implementations, and assisting with debugging and code optimization.

## 🧠 How We Used GPT-5.6

GPT-5.6 powers the AI capabilities of DevPulse AI. It explains code, answers repository questions, generates documentation, analyzes bugs, and provides architecture insights. To reduce API costs, only the most relevant code chunks retrieved through RAG are sent to GPT-5.6 instead of the entire repository.

## ⚡ Token Optimization

- Local repository analysis before AI calls
- RAG retrieves only the Top 5 relevant code chunks
- 400–600 token chunking
- Cached AI responses
- Repository hashing to avoid unnecessary reprocessing
- Local parsing for project statistics and health analysis

## 🚀 Getting Started

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment

Create a `.env` file and add:

```env
OPENAI_API_KEY=your_openai_api_key
```

### Run the Backend

```bash
uvicorn app.main:app --reload
```

or

```bash
bash start.sh
```

### API Documentation

Visit:

```
http://localhost:8000/docs
```

to explore the interactive Swagger UI.
