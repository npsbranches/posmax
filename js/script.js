/*
 **  Прелоадер
 */


window.onload = function() {
    $('.preloader').fadeOut();
    $('body').css('overflow', 'visible');
}

/*
 ** Меню
 */

$('.btn-bars').click(function () {
    $('.btn-bars').toggleClass('active');
    $('.menu').toggleClass('active');
    $('body').toggleClass('overflow-hidden');
});

$(window).scroll(function () {
    var the_top = $(document).scrollTop();
    if (the_top > 114) {
        $('.header').addClass('sticky');
        $('.logo-on-menu').addClass('visible');
        $('body').addClass('padding');

    } else {
        $('.header').removeClass('sticky');
        $('.logo-on-menu').removeClass('visible');
        $('body').removeClass('padding');
    }
});

/*
 ** Слайдер баннеров на главном
 */

$('.home-slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    rows: 0,
    autoplay: true,
    autoplaySpeed: 2000,

});

/*
 ** Слайдер "Наши клиенты"
 */

$('.clients .wrapper').slick({
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,

    autoplaySpeed: 2000,
    responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 460,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});

/*
 ** Счётчик чисел "Posmax в цифрах"
 */

if ($(".company-statistics").length) {
    var show = true;
    var countbox = ".company-statistics";
    $(window).on("scroll load resize", function () {
        if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
        var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
        var w_height = $(window).height(); // Высота окна браузера
        var d_height = $(document).height(); // Высота всего документа
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
        if (w_top + 600 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $('.counter-number').css('opacity', '1');
            $('.counter-number').spincrement({
                thousandSeparator: "",
                duration: 4000
            });

            show = false;
        }
    });
}

/*
 ** Мобильная версия Сайдбара каталога 
 */

$('.catalog-button').click(function () {
    $('.catalog-sidebar').toggleClass('open');
    $('.catalog-content').toggleClass('opacity');
})

$('.callback-btn').click(function () {
    $('.callback-form').toggleClass('visible');
})


/*
 ** Форма обратной связи
 */

$('.js-form-subscriber').on('submit', function (e) {
    e.preventDefault();
    let $form = $(this);
    let $url = $form.prop('action');

    $.ajax({
        url: $url,
        method: 'post',
        data: $(this).serializeArray(),
        success: function (data) {
            Swal.fire('Спасибо!', 'мы свяжемся с вами в ближайшее время.', 'success');
            $form.find('small').text('');
            $form.find('input').text('');
        },
        error: function (data) {
            $form.find('small').text('');
            let $data = JSON.parse(data.responseText);
            $.each($data.errors, function (field, arr) {
                let $small = $form.find('[name="' + field + '"]').next('small');
                $small.text(arr[0]);
            });
        }
    });
})

$('.js-form-subscriber input[name="phone"]').inputmask({
    mask: "\\9\\98 99 999-99-99",
    greedy: false,
});