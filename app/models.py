from app.extensions import db


class ReadEpisode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comic_title = db.Column(db.String(255), nullable=False)
    episode_no = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        db.UniqueConstraint("comic_title", "episode_no", name="_comic_episode_uc"),
    )

    def __repr__(self):
        return f"<ReadEpisode {self.comic_title} - {self.episode_no}>"
