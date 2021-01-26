$(window).on("load", function () {
    $('.menu-item-submenu').on('click', function () {
        $('.menu-item-submenu').not(this).removeClass('menu-item-open');
        $(this).toggleClass('menu-item-open');
    });

    $('#kt_aside_mobile_toggle').on('click', function () {
        $('.aside-left').toggleClass('aside-on');
    });

    $('.folder').on('click', function (e) {
        $(this).toggleClass('folder-open');
        e.stopPropagation();
    });

    $('.file').on('click', function (e) {
        e.stopPropagation();
    });
});

function myFunction() {
    var x = document.getElementById("baselineTexd");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    };
  //  $('.selectpicker').selectpicker();
}

