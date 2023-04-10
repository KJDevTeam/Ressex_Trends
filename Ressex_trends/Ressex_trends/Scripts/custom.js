////$(function() {

////    $('input[name="fromdate"], input[name="tomdate"]').daterangepicker({
////      singleDatePicker: true,
////      showDropdowns: true, 
////      dateFormat: 'dd/mm/yy',
////    });

////    //$('input[name="fromdate"], input[name="tomdate"]').daterangepicker({
////    //  singleDatePicker: true,
////    //  showDropdowns: true,     
////    //});

////  });
////  $(document).ready(function() {
////    $('#projects').on("click", function(){
////        if( $(this).is(':checked') ){
////            $(".filterDropdown").removeClass("d-none");
////        }
////    });
////    $('#locations').on("click", function(){
////        if( $(this).is(':checked') ){
////            $(".filterDropdown").addClass("d-none");
////        }
////    });

////  });

////// Popover Hover overlayPopover
////$(".textEllipsisPop").hover(
////    function () { $(".overlayPopover").show(); },
////    function () { $(".overlayPopover").hide(); }
////);

////$('.inputTab').on('click', function (evt) {
////    evt.preventDefault();
////    $(this).toggleClass('active');
////    var sel = this.getAttribute('data-toggle-target');
////    $('.minSqftList').removeClass('active').filter(sel).addClass('active');
////});

////});
////// Popover Hover overlayPopover
////$(document).on("mouseover", ".popover", function () {
////    $(".overlayPopover").show();
////});
////$(document).on("mouseout", ".popover", function () {
////    $(".overlayPopover").hide();
////});

////$(".textEllipsisPop").popover({
////    trigger: "manual", html: true,
////    animation: false,
////    template: '<div class="popover custom-popover" role="tooltip"><div class="popover-body"></div></div>'
////})
////    .on("mouseenter", function () {
////        var _this = this;
////        $(this).popover("show");
////        $(".popover").on("mouseleave", function () {
////            $(_this).popover('hide');
////        });
////    }).on("mouseleave", function () {
////        var _this = this;
////        setTimeout(function () {
////            if (!$(".popover:hover").length) {
////                $(_this).popover("hide");
////            }
////        }, 200);
////    });

////$(function () {
////    $("#sortResizable").sortable({
////        containment: ".tab-incontent",
////        handle: '.handle'
////    });
////    $("#sortResizable").disableSelection();
////    $(".colResize").resizable({
////        containment: ".removeMl"
////    });

////});

////$(document).ready(function () {
////    // Select2
////    $(".select2").select2({
////        minimumResultsForSearch: -1,
////        placeholder: 'Select an option...',
////    });
////    $('.select2').addClass('select2-custom');

////    $("#visibileSelect2").select2({


////    });
////    //  Slick Slider
////    $('.transactionCardSlider').slick({
////        autoplay: true,
////        infinite: true,
////        slidesToShow: 1,
////        slidesToScroll: 1,
////        dots: false,
////        arrows: false,
////        speed: 500,
////        fade: true,
////        cssEase: 'linear'
////    });

////});

// daterangepicker
$(function () {
    $('input[name="fromdate"], input[name="tomdate"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
    });
});

$(document).ready(function () {
    $('#projects').on("click", function () {
        if ($(this).is(':checked')) {
            $(".filterDropdown").removeClass("d-none");
        }
    });
    $('#locations').on("click", function () {
        if ($(this).is(':checked')) {
            $(".filterDropdown").addClass("d-none");
        }
    });

    // Popover Hover overlayPopover
    $(".textEllipsisPop").hover(
        function () { $(".overlayPopover").show(); },
        function () { $(".overlayPopover").hide(); }
    );

    $('.inputTab').on('click', function (evt) {
        evt.preventDefault();
        $(this).toggleClass('active');
        var sel = this.getAttribute('data-toggle-target');
        $('.minSqftList').removeClass('active').filter(sel).addClass('active');
    });

});
// Popover Hover overlayPopover
$(document).on("mouseover", ".popover", function () {
    $(".overlayPopover").show();
});
$(document).on("mouseout", ".popover", function () {
    $(".overlayPopover").hide();
});

$(".textEllipsisPop").popover({
    trigger: "manual", html: true,
    animation: false,
    template: '<div class="popover custom-popover" role="tooltip"><div class="popover-body"></div></div>'
})
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 200);
    });

//$(function () {
//    $(".sortResizable").sortable({
//        containment: ".tab-incontent",
//        handle: '.handle'
//    });
//    $(".sortResizable").disableSelection();
//    $(".colResize").resizable({
//        containment: ".removeMl"
//    });

//});

$(document).ready(function () {
    // Select2
    //$(".select2").select2({
    //    minimumResultsForSearch: -1,
    //    placeholder: 'Select an option...',
    //});
    //$('.select2').addClass('select2-custom');

    $("#visibileSelect2").select2({


    });
    //  Slick Slider
    $('.transactionCardSlider').slick({
        autoplay: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

});


