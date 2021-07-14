const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 600;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];

        popupLink.addEventListener('click', (e) => {
            // const popupName = popupLink.getAttribute('href').replace('#', '');
            const popupName = popupLink.getAttribute('data-href');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.popup__close');

if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];

        el.addEventListener('click', (e) => {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup._open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }

        curentPopup.classList.add('_open');
        curentPopup.addEventListener('click', (e) => {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('_open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('body-lock');

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(() => {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }

        body.style.paddingRight = '0px';
        body.classList.remove('body-lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, timeout);
}

(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            let node = this;
            while (node) {
                if (node.matches(css)) {
                    return node;
                } else {
                    node = node.parentElement;
                }
            }
            return null;
        };
    }
})();

(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();
