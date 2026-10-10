#!/bin/sh
set -e

# nginx と共有するボリュームへ、イメージに含まれる静的ファイルを起動のたびに同期する
if [ -d "$STATIC_EXPORT_DIR" ]; then
    find "$STATIC_EXPORT_DIR" -mindepth 1 -delete
    cp -a /app/app/static/. "$STATIC_EXPORT_DIR"/
fi

exec "$@"
