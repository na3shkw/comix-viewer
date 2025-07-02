function getComicTitleFromPath() {
    const pathParts = location.pathname.split('/');
    // /comic/<comic_title>/episode/<int:episode_no> または /comic/<comic_title>/
    if (pathParts[1] === 'comic' && pathParts[2]) {
        return pathParts[2];
    }
    return null;
}

async function addReadEpisode(episodeNo = null) {
    const comicTitle = getComicTitleFromPath();
    if (!comicTitle) return;

    if (episodeNo === null) {
        const pathParts = location.pathname.split('/');
        episodeNo = parseInt(pathParts[4]);
    }

    try {
        const response = await fetch('/api/read_episode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comic_title: comicTitle, episode_no: episodeNo }),
        });
        if (!response.ok) {
            console.error('Failed to add read episode:', await response.text());
        }
    } catch (error) {
        console.error('Error adding read episode:', error);
    }
}

async function removeReadEpisode(episodeNo = null) {
    const comicTitle = getComicTitleFromPath();
    if (!comicTitle) return;

    if (episodeNo === null) {
        const pathParts = location.pathname.split('/');
        episodeNo = parseInt(pathParts[4]);
    }

    try {
        const response = await fetch('/api/read_episode', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comic_title: comicTitle, episode_no: episodeNo }),
        });
        if (!response.ok) {
            console.error('Failed to remove read episode:', await response.text());
        }
    } catch (error) {
        console.error('Error removing read episode:', error);
    }
}

// 既読エピソードを取得し、UIを更新する関数
async function fetchReadEpisodesAndApplyToUI() {
    const comicTitle = getComicTitleFromPath();
    if (!comicTitle) return;

    try {
        const response = await fetch(`/api/read_episodes/${encodeURIComponent(comicTitle)}`);
        if (response.ok) {
            const readEpisodeNos = await response.json();
            document.querySelectorAll('.episode-list-item').forEach(listItem => {
                const episodeNo = parseInt(listItem.getAttribute('data-episode-no'));
                if (readEpisodeNos.includes(episodeNo)) {
                    listItem.classList.add('episode-read');
                } else {
                    listItem.classList.remove('episode-read');
                }
            });
        } else {
            console.error('Failed to fetch read episodes:', await response.text());
        }
    } catch (error) {
        console.error('Error fetching read episodes:', error);
    }
}