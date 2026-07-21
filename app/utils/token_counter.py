import tiktoken

def count_tokens(text: str, model_name: str = "gpt-4o-mini") -> int:
    """Returns the number of tokens in a text string using tiktoken."""
    try:
        encoding = tiktoken.encoding_for_model(model_name)
    except KeyError:
        encoding = tiktoken.get_encoding("cl100k_base")
    return len(encoding.encode(text))

def chunk_text_by_tokens(text: str, min_tokens: int = 400, max_tokens: int = 600) -> list[str]:
    """Chunks a block of text into chunks between min_tokens and max_tokens."""
    try:
        encoding = tiktoken.get_encoding("cl100k_base")
    except Exception:
        # Fallback character split
        words = text.split("\n")
        chunks = []
        curr = ""
        for line in words:
            if len(curr) + len(line) > max_tokens * 4:
                chunks.append(curr)
                curr = line + "\n"
            else:
                curr += line + "\n"
        if curr:
            chunks.append(curr)
        return chunks

    tokens = encoding.encode(text)
    chunks = []
    start = 0
    total_tokens = len(tokens)

    while start < total_tokens:
        end = min(start + max_tokens, total_tokens)
        chunk_tokens = tokens[start:end]
        chunk_text = encoding.decode(chunk_tokens)
        chunks.append(chunk_text)
        start = end

    return chunks
