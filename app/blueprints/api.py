from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models import ReadEpisode

api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.route("/read_episode", methods=["POST"])
def add_read_episode_api():
    data = request.get_json()
    comic_title = data.get("comic_title")
    episode_no = data.get("episode_no")

    if not comic_title or not episode_no:
        return jsonify({"error": "comic_title and episode_no are required"}), 400

    read_episode = ReadEpisode.query.filter_by(
        comic_title=comic_title, episode_no=episode_no
    ).first()
    if not read_episode:
        new_read_episode = ReadEpisode(comic_title=comic_title, episode_no=episode_no)
        db.session.add(new_read_episode)
        db.session.commit()

    return jsonify({"status": "success"}), 200


@api_bp.route("/read_episode", methods=["DELETE"])
def remove_read_episode_api():
    data = request.get_json()
    comic_title = data.get("comic_title")
    episode_no = data.get("episode_no")

    if not comic_title or not episode_no:
        return jsonify({"error": "comic_title and episode_no are required"}), 400

    read_episode = ReadEpisode.query.filter_by(
        comic_title=comic_title, episode_no=episode_no
    ).first()
    if read_episode:
        db.session.delete(read_episode)
        db.session.commit()

    return jsonify({"status": "success"}), 200


@api_bp.route("/read_episodes/<comic_title>")
def get_read_episodes_api(comic_title):
    read_episodes = ReadEpisode.query.filter_by(comic_title=comic_title).all()
    episode_nos = [ep.episode_no for ep in read_episodes]
    return jsonify(episode_nos), 200
