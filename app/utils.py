from pathlib import Path
from typing import Literal


def list_items(
    path: str, item_type: Literal["all", "file", "dir"] = "all"
) -> list[str]:
    """指定されたパス内のアイテム（ファイルまたはディレクトリ）を一覧表示します。

    Args:
        path: アイテムを一覧表示するディレクトリのパス。
        item_type: 一覧表示するアイテムの種類。
            "all": ファイルとディレクトリの両方（デフォルト）。
            "file": ファイルのみ。
            "dir": ディレクトリのみ。

    Returns:
        指定された種類のアイテム名のリスト。
        パスが存在しないか、ディレクトリでない場合は空のリストを返します。
    """
    path_obj = Path(path)
    
    if not path_obj.is_dir():
        return []
    
    if item_type == "file":
        return [item.name for item in path_obj.iterdir() if item.is_file()]
    elif item_type == "dir":
        return [item.name for item in path_obj.iterdir() if item.is_dir()]
    elif item_type == "all":
        return [item.name for item in path_obj.iterdir()]

    return []
