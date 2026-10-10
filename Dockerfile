FROM python:3.13.5-bookworm AS builder

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:0.12.23 /uv /bin/uv
COPY pyproject.toml uv.lock ./ 
RUN uv sync --locked --no-cache --no-dev

FROM python:3.13.5-slim-bookworm

WORKDIR /app

COPY --from=builder /app/.venv ./.venv
COPY app ./app
COPY wsgi.py .
COPY docker-entrypoint.sh /usr/local/bin/

ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONPATH=/app \
    STATIC_EXPORT_DIR=/srv/static

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]
