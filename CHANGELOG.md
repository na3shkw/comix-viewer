# Changelog

## [v0.2.1](https://github.com/na3shkw/comix-viewer/compare/v0.2.0...v0.2.1) - 2026-10-10

### Other Changes
- chore(deps): bump flask from 3.1.1 to 3.1.3 by @dependabot[bot] in https://github.com/na3shkw/comix-viewer/pull/10
- chore(deps): bump werkzeug from 3.1.3 to 3.1.9 by @dependabot[bot] in https://github.com/na3shkw/comix-viewer/pull/11
- chore(deps): bump python-dotenv from 1.1.1 to 1.2.2 by @dependabot[bot] in https://github.com/na3shkw/comix-viewer/pull/12

## [v0.2.0](https://github.com/na3shkw/comix-viewer/compare/v0.1.2...v0.2.0) - 2026-10-10

### New Features 🎉
- 静的コンテンツがホスト環境に存在しなくてもnginxでサーブできるように改善 by @na3shkw in https://github.com/na3shkw/comix-viewer/pull/7
### Fix bug 🐛
- リリースワークフローを修正 by @na3shkw in https://github.com/na3shkw/comix-viewer/pull/5
### Other Changes
- chore: nginxを1.31.6に更新 by @na3shkw in https://github.com/na3shkw/comix-viewer/pull/8
- chore: GitHub Actionsのバージョンを更新し、リリースフローを整理 by @na3shkw in https://github.com/na3shkw/comix-viewer/pull/9

## [v0.1.2](https://github.com/na3shkw/comix-viewer/compare/v0.1.1...v0.1.2) - 2025-07-08
### Fix bug 🐛
- fix: DATABASE_URLの設定を修正しデータが永続化されるようにする by @na3shkw in https://github.com/na3shkw/comix-viewer/pull/2
### Other Changes
- ライセンスを作成 by @na3shkw in https://github.com/na3shkw/comix-viewer/pull/3
- chore: CHANGELOG.mdを作成し、バージョン0.1.1までの変更内容を追加 by @na3shkw in https://github.com/na3shkw/comix-viewer/pull/4

## [v0.1.1](https://github.com/na3shkw/comix-viewer/compare/v0.1.0...v0.1.1) - 2025-07-04

### Fix bug 🐛

- エピソードディレクトリにディレクトリが含まれる場合に、空の画像が表示されるバグを修正しました

## [v0.1.0](https://github.com/na3shkw/comix-viewer/commits/v0.1.0) - 2025-07-03

### New Features 🎉

- ビューアーの基本的な機能を実装しました
  - 特定のディレクトリ構成で保存された画像を読み込んで一覧表示する機能
  - 左右にスワイプしてページおよびエピソード間を遷移できる機能
- 読んだエピソードが判別できるようにしました

### Other Changes

- タグをpushするとDockerイメージがパブリッシュされるワークフローを作成しました
