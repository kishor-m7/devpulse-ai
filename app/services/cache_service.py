import os
import json
import hashlib
from app.config import settings
from app.utils.logger import logger

class CacheService:
    def __init__(self):
        self.cache_dir = settings.CACHE_DIR
        os.makedirs(self.cache_dir, exist_ok=True)
        self.mem_cache = {}

    def _get_key_hash(self, key: str) -> str:
        return hashlib.sha256(key.encode('utf-8')).hexdigest()

    def get(self, key: str):
        key_hash = self._get_key_hash(key)
        if key_hash in self.mem_cache:
            return self.mem_cache[key_hash]

        filepath = os.path.join(self.cache_dir, f"{key_hash}.json")
        if os.path.exists(filepath):
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.mem_cache[key_hash] = data
                    return data
            except Exception as e:
                logger.error(f"Error reading cache file {filepath}: {e}")
        return None

    def set(self, key: str, value):
        key_hash = self._get_key_hash(key)
        self.mem_cache[key_hash] = value
        filepath = os.path.join(self.cache_dir, f"{key_hash}.json")
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(value, f, indent=2, default=str)
        except Exception as e:
            logger.error(f"Error writing cache file {filepath}: {e}")

cache_service = CacheService()
