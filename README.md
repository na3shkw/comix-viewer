# Comix Viewer

## 起動方法

`.env` ファイルを作成し、以下のコマンドを実行する。

```bash
docker compose up
```

`APP_VERSION` を変更して起動した場合は古いバージョンのアプリの静的ファイル用ボリュームが残るため、以下のコマンドで削除する。

```bash
export $(grep '^APP_VERSION' .env) | tee
docker volume ls -f "name=comix-viewer_static_" --format "{{.Name}}" | grep -v "^comix-viewer_static_${APP_VERSION}$" | xargs -r docker volume rm
```

## 開発環境の起動方法

VSCode の Start Development Environment タスクを実行する。
