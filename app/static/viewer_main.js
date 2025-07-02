const slideCount = slides.length;
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: true,
    preloadImages: false,
    watchSlidesProgress: true,
    breakpoints: {
        720: {
            // 画面幅720px以上
            slidesPerView: 2,
            slidesPerGroup: 2,
        }
    },
    lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
    },
    initialSlide: 2,
    virtual: {
        slides: slides,
        addSlidesBefore: 2,
        addSlidesAfter: 2,
    },
});

function setNavigationLock(swiper, dir, lock) {
    // 移動できないようにする（キーでは移動できる）
    swiper[
        `allowSlide${dir.charAt(0).toUpperCase() + dir.slice(1)}`
    ] = !lock;
    // ナビゲーションをロック
    const lockClass = 'swiper-button-lock';
    if (lock) {
        swiper.navigation[`${dir}El`].classList.add(lockClass);
    } else {
        swiper.navigation[`${dir}El`].classList.remove(lockClass);
    }
}

function moveEpisode(direction) {
    let linkClass;
    switch (direction) {
        case 1:
            linkClass = 'episode-move-link-next';
            break;
        case -1:
            linkClass = 'episode-move-link-prev';
            break;
    }
    const link = document.querySelector(`.${linkClass}`);
    if (link !== null) {
        location.href = link.getAttribute('href');
    }
}

swiper.on('slidePrevTransitionEnd', function () {
    if (this.activeIndex < 2) {
        setNavigationLock(this, 'prev', true);
    }
    if (this.activeIndex >= slideCount - 4) {
        setNavigationLock(this, 'next', false);
    }
});

swiper.on('slideNextTransitionEnd', function () {
    if (this.activeIndex < slideCount - 2) {
        this.lazy.loadInSlide(this.activeIndex + 1);
        this.lazy.loadInSlide(this.activeIndex + 2);
    }
    if (this.activeIndex === 2) {
        setNavigationLock(this, 'prev', false);
    }
    if (this.activeIndex === slideCount - 2) {
        setNavigationLock(this, 'next', true);
        // 既読にする
        addReadEpisode();
    }
});

swiper.on('tap', function () {
    if (this.allowSlideNext) {
        this.slideNext();
    }
});

let touchStart;
swiper.on('touchStart', function (swiper, event) {
    touchStart = event;
});

let touchEnd;
swiper.on('touchEnd', function (swiper, event) {
    touchEnd = event;
    if (this.activeIndex < 2 || this.activeIndex > slideCount - 3) {
        if (touchEnd.changedTouches && touchStart.changedTouches) {
            const moveX = touchEnd.changedTouches[0].screenX - touchStart.changedTouches[0].screenX;
            const moveRatio = moveX / screen.width;
            if (moveRatio > 0.01 && this.activeIndex == slideCount - 2) {
                // 右方向へスワイプ
                moveEpisode(1);
            } else if (moveRatio < -0.01) {
                // 左方向へスワイプ
                if (this.activeIndex == 1) {
                    moveEpisode(-1);
                }
                if (this.activeIndex > slideCount - 3) {
                    // なぜか次のエピソードのスライドから戻った時にロックが解除されないための対応
                    setNavigationLock(swiper, 'next', false);
                }
            }
        }
    }
});

window.addEventListener('keydown', (evt) => {
    let direction = 0;
    if (!swiper.allowSlidePrev && evt.code == 'ArrowRight') {
        direction = -1;
    }
    if (!swiper.allowSlideNext && evt.code == 'ArrowLeft') {
        direction = 1;
    }
    if (direction !== 0) {
        moveEpisode(direction);
    }
    // 前・次のエピソードへのスライドから次・前のスライドにキーボードで進めないため対応
    if (direction === 0) {
        if (swiper.activeIndex < 2 && evt.code == 'ArrowLeft') {
            swiper.slideNext();
        }
        if (swiper.activeIndex > slideCount - 3 && evt.code == 'ArrowRight') {
            setNavigationLock(swiper, 'next', false);
            swiper.slidePrev();
        }
    }
});
