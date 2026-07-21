#!/usr/bin/env bash
set -e

echo "Starting DevPulse AI Backend Setup..."

if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Starting FastAPI server..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
