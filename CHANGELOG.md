# Changelog

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
