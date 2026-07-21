# DevPulse AI - Backend

DevPulse AI is an AI Software Engineering Command Center designed to help developers understand codebases, explain architecture, detect bugs, generate documentation, and maintain project memory with **minimal OpenAI token usage**.

## Tech Stack
- **Python 3.12** & **FastAPI**
- **SQLite** with **SQLAlchemy**
- **ChromaDB** for vector store embeddings
- **Tree-sitter**, **AST**, & **Regex** for token-free local code parsing
- **Tiktoken** for precise context length management
- **OpenAI SDK** (`gpt-4.1-mini`, `text-embedding-3-small`)

## Key Architecture & Token Optimization
- **AI Request Router**: Solves repository statistics, component counting, unused imports, route discovery, and metrics **100% locally** without calling OpenAI.
- **RAG Engine**: Retrieves only Top 5 relevant chunks (400-600 tokens per chunk) keeping prompt context well under 2,000 tokens.
- **Caching**: Multi-level cache for questions, documentation, and unchanged repository hashes.

## Getting Started

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Add your OPENAI_API_KEY to .env
   ```

3. **Run Server**:
   ```bash
   uvicorn app.main:app --reload
   ```
   Or run the shell script:
   ```bash
   bash start.sh
   ```

4. **API Documentation**:
   Access interactive OpenAPI docs at `http://localhost:8000/docs`.
