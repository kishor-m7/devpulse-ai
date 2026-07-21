from openai import OpenAI
from app.config import settings
from app.utils.logger import logger

class OpenAIService:
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None
        self.embedding_model = settings.EMBEDDING_MODEL
        self.completion_model = settings.COMPLETION_MODEL

    def get_embedding(self, text: str) -> list[float]:
        if not self.client:
            logger.warning("OpenAI client not initialized (missing API key). Returning dummy vector.")
            return [0.0] * 1536
        try:
            response = self.client.embeddings.create(
                input=text,
                model=self.embedding_model
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"OpenAI embedding error: {e}")
            raise e

    def get_completion(self, prompt: str, system_prompt: str = "You are DevPulse AI, a senior software architecture and code analysis assistant.") -> str:
        if not self.client:
            return "OpenAI API key is not configured. Please set OPENAI_API_KEY in backend/.env."
        try:
            response = self.client.chat.completions.create(
                model=self.completion_model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2,
                max_tokens=1500
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI completion error: {e}")
            return f"Error communicating with OpenAI: {str(e)}"

openai_service = OpenAIService()
