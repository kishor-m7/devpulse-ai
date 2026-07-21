import logging
import os
from app.config import settings

os.makedirs(settings.LOGS_DIR, exist_ok=True)
log_file = os.path.join(settings.LOGS_DIR, "devpulse.log")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("DevPulseAI")
