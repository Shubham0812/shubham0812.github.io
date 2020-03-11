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

	$('#slides').superslides({
		animation: 'fade',
		play: 3000,
		pagination: false
	});

	new Typed(".typed", {
		strings: ["iOS Developer", "Web Developer"],
		typeSpeed: 100,
		loop: true,
		startDelay: 800,
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

	$('[data-toggle="tooltip"]').tooltip();

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
	var $filters = $(".filter")
	var $portfolio_container = $("#items-left-double")


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
		$("html,body").animate({ scrollTop: 0 }, "slow");
	});

	$("#navigation li a").click(function (e) {
		e.preventDefault();
		var targetElement = $(this).attr("href");
		console.log(e.currentTarget.innerHTML.toLowerCase() )
		if (e.currentTarget.innerHTML.toLowerCase() === 'skills') {
			var targetPosition = $(targetElement).offset().top + 80;
		} else {
			var targetPosition = $(targetElement).offset().top;
		}
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
		if (isScrolledIntoView($portfolio_title, $window)) {
			$portfolio_title.addClass("in-left")

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
		if (isScrolledIntoView($portfolio_items, $window) && !countUpFinished) {
			$portfolio_items.addClass("in-right-double")
			$(".counter").each(function () {
				var element = $(this);
				var endVal = parseInt(element.text());

				element.countup(endVal);
			})

			countUpFinished = true;

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

	// $(window).on("scroll", function () {
	// 	if (isScrolledIntoView($skills_show, $window, -150)) {
	// 		$skills_show.addClass("in-left-double")

	// 		$('.chart').easyPieChart({
	// 			easing: 'easeInOut',
	// 			barColor: '#fff',
	// 			trackColor: false,
	// 			scaleColor: false,
	// 			lineWidth: 4,
	// 			size: 152,
	// 			onStep: function (from, to, percent) {
	// 				$(this.el).find('.percent').text(Math.round(percent));
	// 			}
	// 		});

	// 	}
	// });

	$(window).on("scroll", function () {
		if (isScrolledIntoView($filters, $window)) {
			$filters.addClass("in-left")
		}
		if (isScrolledIntoView($filters, $window, 200)) {
			$portfolio_container.addClass("in-left")
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

	function isScrolledIntoView($elem, $window, $value = 0) {
		var docViewTop = $window.scrollTop();
		var docViewBottom = docViewTop + $window.height();
		var elemTop = $elem.offset().top;
		var elemBottom = elemTop + $elem.height();
		return ((elemBottom + $value <= docViewBottom - 50) && (elemTop + $value >= docViewTop + 50));
	}
});
