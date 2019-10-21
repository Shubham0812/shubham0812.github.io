$(window).on("load", function () {
	$(".loader-wrapper").fadeOut(500, function () {
	});
	$(".items").isotope({
		filter: '*',
		animationOptions: {
			duration: 1500,
			easing: 'linear',
			queue: false
		}
	});

});

$(document).ready(function () {

	new WOW().init();

	$('#slides').superslides({
		animation: 'fade',
		play: 3000,
		pagination: false
	});

	new Typed(".typed", {
		strings: ["Full Stack Developer", "iOS Developer", "Competitive Coder"],
		typeSpeed: 70,
		loop: true,
		startDelay: 1400,
		showCursor: false,
	});

	new Typed(".skillInfo", {
		strings: ["Swipe Horizontally to see more of my skills.."],
		typeSpeed: 50,
		loop: true,
		startDelay: 500,
		showCursor: false,
	})

	$('.owl-carousel').owlCarousel({
		loop: true,
		items: 4,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3
			},
			938: {
				items: 4
			}
		}
	});



	var countUpFinished = false;
	var $window = $(window);
	var $portfolio_title = $("#portfolio-title")
	var $stats_title = $("#stats-title")
	var $tech_title = $("#technical-title")
	var $skill_caro = $(".left-double")
	var $portfolio_items = $(".squareItem")
	var $contact_section = $("#contact-me")
	var $contact_desc = $("#contact-desc")
	var $skills_show = $(".skill-showcase")


	$("[data-fancybox]").fancybox();

	$("#filters a").click(function () {

		$("#filters .current").removeClass("current");
		$(this).addClass("current");

		var selector = $(this).attr("data-filter");

		$(".items").isotope({
			filter: selector,
			animationOptions: {
				duration: 1500,
				easing: 'linear',
				queue: false
			}
		});

		return false;
	});


	$("#navigation .brand a").click(function (e) {
		e.preventDefault();
		var targetElement = $(this).attr("href");
		var targetPosition = $(targetElement).offset().top;
		$("html,body").animate({ scrollTop: 0 }, "slow");
	});

	$("#navigation li a").click(function (e) {
		e.preventDefault();
		var targetElement = $(this).attr("href");
		var targetPosition = $(targetElement).offset().top;
		$("html,body").animate({ scrollTop: targetPosition - 50 }, "slow");
	});



	const nav = $("#navigation");
	const navTop = nav.offset().top;

	$(window).on("scroll", stickNavigation);
	$(window).on("scroll", enterSection);
	$(window).on("scroll", function () {
		// console.log($(window))
		if (isScrolledIntoView($stats_title, $window)) {
			$stats_title.addClass("in-right")
		}
	});
	$(window).on("scroll", function () {
		if (isScrolledIntoView($portfolio_title, $window) && countUpFinished === true) {
			$portfolio_title.addClass("in-left")
			$(".counter").each(function () {
				var element = $(this);
				var endVal = parseInt(element.text());
				element.countup(endVal);
			})

			countUpFinished = true;

		}
	});
	$(window).on("scroll", function () {
		if (isScrolledIntoView($tech_title, $window)) {
			$tech_title.addClass("in-left")
		}
	});

	$(window).on("scroll", function () {
		if (isScrolledIntoView($skill_caro, $window)) {
			$skill_caro.addClass("in-left-double")
		}
	});
	$(window).on("scroll", function () {
		if (isScrolledIntoView($portfolio_items, $window)) {
			$portfolio_items.addClass("in-right-double")
		}
	});
	$(window).on("scroll", function () {
		if (isScrolledIntoView($contact_section, $window)) {
			$contact_section.addClass("in-up")
		}
	});
	$(window).on("scroll", function () {
		if (isScrolledIntoView($contact_desc, $window)) {
			$contact_desc.addClass("in-up")
		}
	});

	$(window).on("scroll", function () {
		if (isScrolledIntoView($skills_show, $window)) {
			$skills_show.addClass("in-left-double")

			$('.chart').easyPieChart({
				easing: 'easeInOut',
				barColor: '#fff',
				trackColor: false,
				scaleColor: false,
				lineWidth: 4,
				size: 152,
				onStep: function (from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				}
			});

		}
	});




	function stickNavigation() {
		var body = $("body");

		if ($(window).scrollTop() >= navTop) {
			body.css("padding-top", nav.outerHeight() + "px");
			body.addClass("fixedNav");

		} else {
			body.css("padding-top", 0);
			body.removeClass("fixedNav");

		}

	}

	var current = navTop;
	const aboutTop = $("#about").offset().top;
	const skillsTop = $("#skills").offset().top;
	const statsTop = $("#stats").offset().top;
	const portfolioTop = $("#portfolio").offset().top;
	const contactTop = $("#contact").offset().top;


	function enterSection() {
		if ($(window).scrollTop() < navTop) {
			$(".brand").addClass("active");
			$(".item0").removeClass("active");
			$(".item1").removeClass("active");
			$(".item2").removeClass("active");
			$(".item3").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() <= aboutTop) {
			$(".item0").addClass("active");
			$(".brand").removeClass("active");
			$(".item1").removeClass("active");
			$(".item2").removeClass("active");
			$(".item3").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() > aboutTop + 600 && $(window).scrollTop() < skillsTop) {
			$(".item1").addClass("active");
			$(".brand").removeClass("active");
			$(".item0").removeClass("active");
			$(".item2").removeClass("active");
			$(".item3").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() > skillsTop + 500 && $(window).scrollTop() < statsTop) {
			$(".item2").addClass("active");
			$(".brand").removeClass("active");
			$(".item1").removeClass("active");
			$(".item0").removeClass("active");
			$(".item3").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() > statsTop + 300 && $(window).scrollTop() < portfolioTop) {
			$(".item3").addClass("active");
			$(".brand").removeClass("active");
			$(".item1").removeClass("active");
			$(".item2").removeClass("active");
			$(".item0").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() > portfolioTop + 800 && $(window).scrollTop() < contactTop) {
			$(".item4").addClass("active");
			$(".brand").removeClass("active");
			$(".item1").removeClass("active");
			$(".item2").removeClass("active");
			$(".item3").removeClass("active");
			$(".item0").removeClass("active");
		}
	}

	function isScrolledIntoView($elem, $window) {
		var docViewTop = $window.scrollTop();
		var docViewBottom = docViewTop + $window.height();
		var elemTop = $elem.offset().top;
		var elemBottom = elemTop + $elem.height();
		return ((elemBottom <= docViewBottom - 50) && (elemTop >= docViewTop + 50));
	}
});





'use strict';

var WOW;

(function ($) {

  WOW = function WOW() {

    return {

      init: function init() {

        var animationName = [];

        var once = 1;

        function mdbWow() {

          var windowHeight = window.innerHeight;
          var scroll = window.scrollY;

          $('.wow').each(function () {

            if ($(this).css('visibility') == 'visible') {
              return;
            }

            if (windowHeight + scroll - 100 > getOffset(this) && scroll < getOffset(this) || windowHeight + scroll - 100 > getOffset(this) + $(this).height() && scroll < getOffset(this) + $(this).height() || windowHeight + scroll == $(document).height() && getOffset(this) + 100 > $(document).height()) {

              var index = $(this).index('.wow');

              var delay = $(this).attr('data-wow-delay');

              if (delay) {

                delay = $(this).attr('data-wow-delay').slice(0, -1

                );
                var self = this;

                var timeout = parseFloat(delay) * 1000;

                $(self).addClass('animated');
                $(self).css({
                  'visibility': 'visible'
                });
                $(self).css({
                  'animation-delay': delay
                });
                $(self).css({
                  'animation-name': animationName[index]
                });

                var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;

                if ($(this).attr('data-wow-delay')) {

                  removeTime += $(this).attr('data-wow-delay').slice(0, -1) * 1000;
                }

                var self = this;

                setTimeout(function () {

                  $(self).removeClass('animated');
                }, removeTime);
              } else {

                $(this).addClass('animated');
                $(this).css({
                  'visibility': 'visible'
                });
                $(this).css({
                  'animation-name': animationName[index]
                });

                var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;

                var self = this;

                setTimeout(function () {

                  $(self).removeClass('animated');
                }, removeTime);
              }
            }
          });
        }

        function appear() {

          $('.wow').each(function () {

            var index = $(this).index('.wow');

            var delay = $(this).attr('data-wow-delay');

            if (delay) {

              delay = $(this).attr('data-wow-delay').slice(0, -1);

              var timeout = parseFloat(delay) * 1000;

              $(this).addClass('animated');
              $(this).css({
                'visibility': 'visible'
              });
              $(this).css({
                'animation-delay': delay + 's'
              });
              $(this).css({
                'animation-name': animationName[index]
              });
            } else {

              $(this).addClass('animated');
              $(this).css({
                'visibility': 'visible'
              });
              $(this).css({
                'animation-name': animationName[index]
              });
            }
          });
        }

        function hide() {

          var windowHeight = window.innerHeight;
          var scroll = window.scrollY;

          $('.wow.animated').each(function () {

            if (windowHeight + scroll - 100 > getOffset(this) && scroll > getOffset(this) + 100 || windowHeight + scroll - 100 < getOffset(this) && scroll < getOffset(this) + 100 || getOffset(this) + $(this).height > $(document).height() - 100) {

              $(this).removeClass('animated');
              $(this).css({
                'animation-name': 'none'
              });
              $(this).css({
                'visibility': 'hidden'
              });
            } else {

              var removeTime = $(this).css('animation-duration').slice(0, -1) * 1000;

              if ($(this).attr('data-wow-delay')) {

                removeTime += $(this).attr('data-wow-delay').slice(0, -1) * 1000;
              }

              var self = this;

              setTimeout(function () {

                $(self).removeClass('animated');
              }, removeTime);
            }
          });

          mdbWow();

          once--;
        }

        function getOffset(elem) {

          var box = elem.getBoundingClientRect();

          var body = document.body;
          var docEl = document.documentElement;

          var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;

          var clientTop = docEl.clientTop || body.clientTop || 0;

          var top = box.top + scrollTop - clientTop;

          return Math.round(top);
        }

        $('.wow').each(function () {

          $(this).css({
            'visibility': 'hidden'
          });
          animationName[$(this).index('.wow')] = $(this).css('animation-name');
          $(this).css({
            'animation-name': 'none'
          });
        });

        $(window).scroll(function () {

          if (once) {

            hide();
          } else {

            mdbWow();
          }
        });

        appear();
      }
    };
  };
})(jQuery);










