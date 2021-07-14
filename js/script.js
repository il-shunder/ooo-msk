let headerMain = document.querySelector('.header-main');
let headerTop = document.querySelector('.header-top');

window.addEventListener('scroll', () => {
    if (document.body.clientWidth > 1009) {
        if (window.scrollY > headerTop.clientHeight) {
            headerMain.classList.add('_fixed');
        } else if (window.scrollY <= headerTop.clientHeight) {
            headerMain.classList.remove('_fixed');
        }
    } else if (document.body.clientWidth <= 1009) {
        if (window.scrollY > headerTop.clientHeight) {
            headerMain.classList.add('_active');
        } else if (window.scrollY <= headerTop.clientHeight) {
            headerMain.classList.remove('_active');
        }
    }
});

let headerBurger = document.querySelector('.header__burger');
let headerMainBurger = document.querySelector('.header-main__burger');
let headerNav = document.querySelector('.header-main__nav');

headerBurger.addEventListener('click', () => {
    headerNav.classList.toggle('_active');
    document.body.classList.toggle('body-lock');
    headerBurger.classList.toggle('_active');
});

headerMainBurger.addEventListener('click', () => {
    headerNav.classList.toggle('_active');
    document.body.classList.toggle('body-lock');
    headerMainBurger.classList.toggle('_active');
});

window.addEventListener('click', (e) => {
    if (headerNav.classList.contains('_active')) {
        if (!e.target.closest('.header__burger')) {
            headerNav.classList.remove('_active');
            document.body.classList.remove('body-lock');
            headerBurger.classList.remove('_active');
            headerMainBurger.classList.remove('_active');
        }
    }
});

$('.work-top__slider').slick({
    dots: true,
    adaptiveHeight: true,
});

$('.work-bottom__slider').slick({
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.work-bottom__prev'),
    nextArrow: $('.work-bottom__next'),
    appendDots: $('.work-bottom__dots'),
    responsive: [
        {
            breakpoint: 1150,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                adaptiveHeight: true,
            },
        },
    ],
});

let questionItems = document.querySelectorAll('.question-top__item');
let questionLineHeight = 20;

questionItems.forEach((el) => {
    let elBody = el.querySelector('.question-top__body');
    let elRows = elBody.querySelector('.question-top__text').getClientRects().length;
    if (elRows * questionLineHeight > 300) {
        elBody.style.overflowY = 'auto';
    } else {
        elBody.style.overflowY = 'none';
    }

    el.querySelector('.question-top__btn').addEventListener('click', () => {
        let elBody = el.querySelector('.question-top__body');
        let elRows = elBody.querySelector('.question-top__text').getClientRects().length;
        if (elRows * questionLineHeight > 300) {
            elBody.style.overflowY = 'auto';
        } else {
            elBody.style.overflowY = 'none';
        }
        el.classList.toggle('_active');
    });
});

let headerMainItems = document.querySelectorAll(".header-main__item");

headerMainItems.forEach(el => {
    el.addEventListener("click", () => {
        headerMainItems.forEach(item => {
            if(item.classList.contains("_active")){
                item.classList.remove("_active");
            }
            el.classList.add("_active");
        })
    })
})

$('body').on('click', '[href*="#"]', function (e) {
    let fixed_offset = 100; //padding-top
    $('html,body')
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
    e.preventDefault();
});
