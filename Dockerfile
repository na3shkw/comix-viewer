FROM python:3.13.5-bookworm AS builder

WORKDIR /app

COPY pyproject.toml uv.lock ./ 
RUN pip install --no-cache-dir uv \
    && uv sync --no-cache --no-dev

FROM python:3.13.5-slim-bookworm

WORKDIR /app

COPY --from=builder /app/.venv ./.venv
COPY app ./app
COPY wsgi.py .

ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONPATH=/app

CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]
