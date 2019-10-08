$(window).on("load",function(){
    $(".loader .inner").fadeOut(500,function(){
        $(".loader").fadeOut(750);
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


$(document).ready(function() {

	$('#slides').superslides({
		animation: 'fade',
		play: 3000,
		pagination: false
	});

	var typed = new Typed(".typed", {
		strings: ["Full Stack Developer", "iOS Developer.", "Competitive Coder."],
		typeSpeed: 70,
		loop: true,
		startDelay: 1000,
    showCursor: false,
  });
  
  var skillInfo = new Typed(".skillInfo", {
		strings: ["Scroll to see more skills..."],
    typeSpeed: 50,
    loop: true,
    startDelay: 1000,
    showCursor: false,
    fadeOut: true


  })

	$('.owl-carousel').owlCarousel({
	    loop:true,
	    items: 4,
	    responsive:{
	        0:{
	            items:1
	        },
	        480:{
	            items:2
	        },
	        768:{
	            items:3
	        },
	        938:{
	            items:4
	        }
	    }
	});


	


	var skillsTopOffset = $(".skillsSection").offset().top;
	var statsTopOffset = $(".statsSection").offset().top;
	var countUpFinished = false;
	$(window).scroll(function() {

		if(window.pageYOffset > skillsTopOffset - $(window).height() + 200) {

			$('.chart').easyPieChart({
		        easing: 'easeInOut',
		        barColor: '#fff',
		        trackColor: false,
		        scaleColor: false,
		        lineWidth: 4,
		        size: 152,
		        onStep: function(from, to, percent) {
		        	$(this.el).find('.percent').text(Math.round(percent));
		        }
		    });


		}


		if(!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {
			$(".counter").each(function() {
				var element = $(this);
				var endVal = parseInt(element.text());

				element.countup(endVal);
			})

			countUpFinished = true;

		}


	});


	$("[data-fancybox]").fancybox();


	$("#filters a").click(function() {

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


	$("#navigation .brand a").click(function(e){
		e.preventDefault();
		var targetElement = $(this).attr("href");
		var targetPosition = $(targetElement).offset().top;
        $("html,body").animate({scrollTop: 0},"slow");
    });

    $("#navigation li a").click(function(e){
        e.preventDefault();
		var targetElement = $(this).attr("href");
		var targetPosition = $(targetElement).offset().top;
        $("html,body").animate({scrollTop: targetPosition -50},"slow");
	});

		
 
    const nav = $("#navigation");
    const navTop = nav.offset().top;

	$(window).on("scroll",stickNavigation);
    $(window).on("scroll",enterSection);
	
    
    function stickNavigation(){
        var body = $("body");

        if($(window).scrollTop() >= navTop){
            body.css("padding-top",nav.outerHeight()+ "px");
            body.addClass("fixedNav");

        } else{
            body.css("padding-top",0);
            body.removeClass("fixedNav");

        }
        
	}

	var current = navTop;
	const aboutTop = $("#about").offset().top;
	const skillsTop = $("#skills").offset().top;
	const statsTop = $("#stats").offset().top;
	const portfolioTop = $("#portfolio").offset().top;
	const contactTop = $("#contact").offset().top;


	function enterSection(){
		if($(window).scrollTop() < navTop){
			$(".brand").addClass("active");
			$(".item0").removeClass("active");
			$(".item1").removeClass("active");
			$(".item2").removeClass("active");
			$(".item3").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() <= aboutTop){
			$(".item0").addClass("active");
			$(".brand").removeClass("active");
			$(".item1").removeClass("active");
			$(".item2").removeClass("active");
			$(".item3").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() > aboutTop + 600 && $(window).scrollTop() < skillsTop  ){
			$(".item1").addClass("active");
			$(".brand").removeClass("active");
			$(".item0").removeClass("active");
			$(".item2").removeClass("active");
			$(".item3").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() > skillsTop + 500 && $(window).scrollTop() < statsTop  ){
			$(".item2").addClass("active");
			$(".brand").removeClass("active");
			$(".item1").removeClass("active");
			$(".item0").removeClass("active");
			$(".item3").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() > statsTop + 300 && $(window).scrollTop() < portfolioTop  ){
			$(".item3").addClass("active");
			$(".brand").removeClass("active");
			$(".item1").removeClass("active");
			$(".item2").removeClass("active");
			$(".item0").removeClass("active");
			$(".item4").removeClass("active");
		}
		else if ($(window).scrollTop() > portfolioTop + 800 && $(window).scrollTop() < contactTop  ){
			$(".item4").addClass("active");
			$(".brand").removeClass("active");
			$(".item1").removeClass("active");
			$(".item2").removeClass("active");
			$(".item3").removeClass("active");
			$(".item0").removeClass("active");
		}
	}
	


});
















