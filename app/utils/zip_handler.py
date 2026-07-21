import zipfile
import shutil
import os

def extract_zip(zip_filepath: str, extract_to: str):
    os.makedirs(extract_to, exist_ok=True)
    with zipfile.ZipFile(zip_filepath, 'r') as zip_ref:
        zip_ref.extractall(extract_to)

def cleanup_directory(directory: str):
    if os.path.exists(directory):
        shutil.rmtree(directory, ignore_errors=True)
