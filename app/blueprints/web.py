import os
from flask import Blueprint, render_template
from natsort import natsorted

from app.models import ReadEpisode

web_bp = Blueprint(
    "web", __name__, template_folder="../templates", static_folder="../static"
)

APP_NAME = os.getenv("APP_NAME", "Comix Viewer")
COMIC_DIR = "/data/comic_image"


@web_bp.route("/")
def index():
    comic_titles = [
        d for d in os.listdir(COMIC_DIR) if os.path.isdir(os.path.join(COMIC_DIR, d))
    ]
    comic_titles.sort()

    return render_template(
        "index.jinja",
        app_name=APP_NAME,
        comic_titles=comic_titles,
    )


@web_bp.route("/comic/<comic_title>/")
def comic_detail(comic_title):
    comic_path = os.path.join(COMIC_DIR, comic_title)
    if not os.path.isdir(comic_path):
        return "Comic not found", 404

    episode_no_list = sorted(
        [
            int(s.replace("episode_", ""))
            for s in os.listdir(comic_path)
            if os.path.isdir(os.path.join(comic_path, s))
        ]
    )
    read_episodes_from_db = ReadEpisode.query.filter_by(comic_title=comic_title).all()
    read_episode_nos = [ep.episode_no for ep in read_episodes_from_db]

    return render_template(
        "comic.jinja",
        app_name=APP_NAME,
        episode_no_list=episode_no_list,
        read_episode=read_episode_nos,
        current_comic_title=comic_title,
    )


@web_bp.route("/comic/<comic_title>/episode/<int:episode_no>")
def viewer(comic_title, episode_no):
    comic_path = os.path.join(COMIC_DIR, comic_title)
    if not os.path.isdir(comic_path):
        return "Comic not found", 404

    episode_dir = os.path.join(comic_path, "episode_%d" % episode_no)
    if not os.path.isdir(episode_dir):
        return "Episode not found", 404

    file_list = natsorted(os.listdir(episode_dir))
    return render_template(
        "episode.jinja",
        app_name=APP_NAME,
        comic_title=comic_title,
        episode_no=episode_no,
        file_list=file_list,
        page_count=len(file_list),
        episode_count=len(
            [
                d
                for d in os.listdir(comic_path)
                if os.path.isdir(os.path.join(comic_path, d))
            ]
        ),
        current_comic_title=comic_title,
    )
