(function ($) {
	"use strict";
    
    var bootsnav = {
        initialize: function() {
            this.event();
        },
        event : function(){
            
            // ------------------------------------------------------------------------------ //
            // Variable
            // ------------------------------------------------------------------------------ //
            var getNav = $("nav.navbar.bootsnav");
            
            // ------------------------------------------------------------------------------ //
            // Navbar Sticky 
            // ------------------------------------------------------------------------------ //
            var navSticky = getNav.hasClass("navbar-sticky");
            if( navSticky ){
                // Wraped navigation
                getNav.wrap("<div class='wrap-sticky'></div>");
            }   
            
            // ------------------------------------------------------------------------------ //
            // Navbar Center 
            // ------------------------------------------------------------------------------ //
            if( getNav.hasClass("brand-center")){                
                var postsArr = new Array(),
                    index = $("nav.brand-center"),
                    $postsList = index.find('ul.navbar-nav');

                //Create array of all posts in lists
                index.find('ul.navbar-nav > li').each(function(){
                    postsArr.push($(this).html());
                });
                
                //Split the array at this point. The original array is altered.
                var firstList = postsArr.splice(0, Math.round(postsArr.length / 2)),
                    secondList = postsArr,
                    ListHTML = '';
                
                var createHTML = function(list){
                    ListHTML = '';
                    for (var i = 0; i < list.length; i++) {
                        ListHTML += '<li>' + list[i] + '</li>'
                    }
                }
                
                //Generate HTML for first list
                createHTML(firstList);
                $postsList.html(ListHTML);
                index.find("ul.nav").first().addClass("navbar-left");
                
                //Generate HTML for second list
                createHTML(secondList);
                //Create new list after original one
                $postsList.after('<ul class="nav navbar-nav"></ul>').next().html(ListHTML);
                index.find("ul.nav").last().addClass("navbar-right");
                
                //Wrap navigation menu
                index.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>");
                index.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>");
                
                //Selection Class
                index.find('ul.navbar-nav > li').each(function(){ 
                    var dropDown = $("ul.dropdown-menu", this),
                        megaMenu = $("ul.megamenu-content", this);
                    dropDown.closest("li").addClass("dropdown");
                    megaMenu.closest("li").addClass("megamenu-fw");
                });
            }
        }
    }

// Full
if( getNav.hasClass("navbar-full")){
    // Add Class to body
    $("nav.navbar.bootsnav").find("ul.nav").wrap("<div class='wrap-full-menu'></div>");
    $(".wrap-full-menu").wrap("<div class='nav-full'></div>");
    $("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><i class='fa fa-times'></i></a></li>");
}else if( getNav.hasClass("navbar-mobile")){
    getNav.removeClass("no-full");
}else{
    getNav.addClass("no-full");
}

// Mobile

if( getNav.hasClass("navbar-mobile")){
    // Add Class to body
    $('.navbar-collapse').on('shown.bs.collapse', function() {
        $("body").addClass("side-right");
    });
    $('.navbar-collapse').on('hide.bs.collapse', function() {
        $("body").removeClass("side-right");
    });
    
    $(window).on("resize", function(){
        $("body").removeClass("side-right");
    });
}
});