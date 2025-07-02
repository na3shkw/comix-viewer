const episodeReadClass = 'episode-read';

window.addEventListener('contextmenu', (e) => e.preventDefault());

document.querySelectorAll('.episode-list-item').forEach((listItem) => {
    listItem.addEventListener('mousedown', (evt) => {
        if (evt.button == 2) {
            evt.preventDefault();
            evt.stopPropagation();
            const episodeNo = parseInt(listItem.getAttribute('data-episode-no'));
            if (listItem.classList.contains(episodeReadClass)) {
                removeReadEpisode(episodeNo);
            } else {
                addReadEpisode(episodeNo);
            }
            listItem.classList.toggle(episodeReadClass);
        }
    });
});
