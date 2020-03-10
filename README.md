
# Portfolio Website - Shubham Singh

My portfolio displayed in a web page. 

You can find the same [here](https://shubham0812.github.io/).


## Technologies Used
- HTML5
- CSS3
- JavaScript
- SCSS


## Code Example

    // Moves the view to the starting of the page
    
    $("#navigation .brand a").click(function (e) {
	    e.preventDefault();
	    var targetElement = $(this).attr("href");
	    var targetPosition = $(targetElement).offset().top;
	    $("html,body").animate({ scrollTop: 0 }, "slow");
    });


## Credits

**©** **Shubham Kumar Singh** | *2020*

