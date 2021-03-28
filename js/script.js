$(window).on("load", function () {
  $(".loader-wrapper").fadeOut(500, function () {});
  $(".items").isotope({
    filter: ".ios",
    animationOptions: {
      duration: 400,
      easing: "linear",
      queue: false,
    },
  });
});

var aboutSectionEntered = false;

$(document).ready(function () {
  var countUpFinished = false;
  var $window = $(window);
  var $portfolio_title = $("#portfolio-title");
  var $stats_title = $("#stats-title");
  var $tech_title = $("#technical-title");
  var $skill_caro = $(".left-double");
  var $portfolio_items = $(".squareItem");
  var $contact_section = $("#contact-me");
  var $contact_desc = $("#contact-desc");
  var $skills_show = $(".skill-showcase");
  var $filters = $(".filter");
  var $portfolio_container = $("#items-left-double");

  $("#slides").superslides({
    animation: "fade",
    play: 0,
    pagination: false,
  });

  new Typed(".typed", {
    strings: ["iOS Developer"],
    typeSpeed: 60,
    loop: false,
    startDelay: 800,
    showCursor: false,
    onComplete: function () {
      console.log("finished babt");
      new Typed(".alternate-job", {
        strings: ["Freelancer"],
        typeSpeed: 60,
        loop: false,
        startDelay: 0,
        showCursor: false,
        onComplete: function () {
          new Typed(".location-text", {
            strings: ["Bengaluru, India"],
            typeSpeed: 60,
            loop: false,
            startDelay: 0,
            showCursor: false,
          });
          $(".location-box > i").addClass("show");
        },
      });
    },
  });

  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      938: {
        items: 4,
      },
    },
  });

  $('[data-toggle="tooltip"]').tooltip();

  $("[data-fancybox]").fancybox();

  $("#filters a").click(function () {
    $("#filters .current").removeClass("current");
    $(".items").removeClass("large");
    $(this).addClass("current");

    if (this.innerHTML == "IOS") {
      console.log("found");
      $(".items").addClass("large");
    }

    console.log("clicked filter", this);
    var selector = $(this).attr("data-filter");

    $(".items").isotope({
      filter: selector,
      animationOptions: {
        duration: 400,
        easing: "linear",
        queue: true,
      },
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
    console.log(e.currentTarget.innerHTML.toLowerCase());
    if (e.currentTarget.innerHTML.toLowerCase() === "skills") {
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
      $stats_title.addClass("in-right");
    }
  });
  $(window).on("scroll", function () {
    if (isScrolledIntoView($portfolio_title, $window)) {
      $portfolio_title.addClass("in-left");
    }
  });
  $(window).on("scroll", function () {
    if (isScrolledIntoView($tech_title, $window)) {
      $tech_title.addClass("in-left");
    }
  });

  $(window).on("scroll", function () {
    if (isScrolledIntoView($skill_caro, $window)) {
      $skill_caro.addClass("in-left-double");
    }
  });
  $(window).on("scroll", function () {
    if (isScrolledIntoView($portfolio_items, $window) && !countUpFinished) {
      $portfolio_items.addClass("in-right-double");
      $(".counter").each(function () {
        var element = $(this);
        var endVal = parseInt(element.text());

        element.countup(endVal);
      });

      countUpFinished = true;
    }
  });
  $(window).on("scroll", function () {
    if (isScrolledIntoView($contact_section, $window)) {
      $contact_section.addClass("in-up");
    }
  });
  $(window).on("scroll", function () {
    if (isScrolledIntoView($contact_desc, $window)) {
      $contact_desc.addClass("in-up");
    }
  });

  $(window).on("scroll", function () {
    if (isScrolledIntoView($filters, $window)) {
      $filters.addClass("in-left");
    }
    if (isScrolledIntoView($filters, $window, 200)) {
      $portfolio_container.addClass("in-left");
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
      $(".active").removeClass("active");
      $(".brand").addClass("active");
    } else if ($(window).scrollTop() <= aboutTop) {
      $(".active").removeClass("active");
      $(".item0").addClass("active");
      showAboutIntroductionTexts();
    } else if (
      $(window).scrollTop() > aboutTop + 600 &&
      $(window).scrollTop() < skillsTop
    ) {
      $(".active").removeClass("active");
      $(".item1").addClass("active");
    } else if (
      $(window).scrollTop() > skillsTop + 500 &&
      $(window).scrollTop() < statsTop
    ) {
      $(".active").removeClass("active");
      $(".item2").addClass("active");
    } else if (
      $(window).scrollTop() > statsTop + 300 &&
      $(window).scrollTop() < portfolioTop
    ) {
      $(".active").removeClass("active");
      $(".item3").addClass("active");
    } else if (
      $(window).scrollTop() > portfolioTop + 800 &&
      $(window).scrollTop() < contactTop
    ) {
      $(".active").removeClass("active");
      $(".item4").addClass("active");
    }
  }

  function isScrolledIntoView($elem, $window, $value = 0) {
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();
    return (
      elemBottom + $value <= docViewBottom - 50 &&
      elemTop + $value >= docViewTop + 50
    );
  }
});

function showAboutIntroductionTexts() {
  if (!aboutSectionEntered) {
    new Typed("#work", {
      strings: [
        "Currently working @ <span class = 'color-primary'>Dailyrounds/Marrow, ex-Spacebasic Inc., ex-Infosys</span>",
      ],
      typeSpeed: 20,
      loop: false,
      startDelay: 0,
      showCursor: false,
      onComplete: function () {
        new Typed(".office-text", {
          strings: [
            "Devoting office hours into developing the Marrow app.",
          ],
          typeSpeed: 30,
          loop: false,
          startDelay: 0,
          showCursor: false,
          onComplete: function () {
            new Typed(".spare-text", {
              strings: [
                "In my spare time, I <span class = 'color-primary'>develop</span> iOS apps and <span class = 'color-primary'>explore</span> tech.",
              ],
              typeSpeed: 30,
              loop: false,
              startDelay: 0,
              showCursor: false,
              onComplete: function () {
                new Typed(".language-text", {
                  strings: [
                    "I code in Swift, HTML, CSS, Javascript , and Python",
                  ],
                  typeSpeed: 30,
                  loop: false,
                  startDelay: 0,
                  showCursor: false,
                  onComplete: function () {
                    new Typed(".hobby-text", {
                      strings: [
                        "I <span class = 'color-primary'>love</span> to talk about <span class = 'color-primary'>iOS</span>, <span class = 'color-primary'>technology</span> and <span class = 'color-primary'>life</span>.",
                      ],
                      typeSpeed: 30,
                      loop: false,
                      startDelay: 0,
                      showCursor: false,
                      onComplete: function () {
                        new Typed(".game-text", {
                          strings: [
                            "I also enjoy occasional gaming, my favorites being DOTA 2 and Fortnite",
                          ],
                          typeSpeed: 30,
                          loop: false,
                          startDelay: 0,
                          showCursor: false,
                          onComplete: function () {
                            new Typed(".contribution-text", {
                              strings: [
                                "I've recently created an <a href='https://www.instagram.com/shubham_iosdev/' target='_blank'><span class = 'color-palatte-4'> Instagram</span></a> handle to share my knowledge, connect with awesome people, and help other developers with iOS dev.",
                              ],
                              typeSpeed: 30,
                              loop: false,
                              startDelay: 0,
                              showCursor: false,
                              onComplete: function () {
                                new Typed(".motto", {
                                  strings: [
                                    "My long term goal is to develop something that makes a difference in people's life.",
                                  ],
                                  typeSpeed: 30,
                                  loop: false,
                                  startDelay: 0,
                                  showCursor: false,
                                  onComplete: function () {
                                    $(".grid-data").addClass("flip-in-x");
                                    $(".services-header ").addClass(
                                      "flip-in-x"
                                    );
                                  },
                                });
                              },
                            });
                          },
                        });
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
    aboutSectionEntered = true;
  }
}
