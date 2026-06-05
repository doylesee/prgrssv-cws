{%- comment -%}
██╗██╗██╗  ░██████╗████████╗░█████╗░██████╗░  ██╗██╗██╗
██║██║██║  ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗  ██║██║██║
██║██║██║  ╚█████╗░░░░██║░░░██║░░██║██████╔╝  ██║██║██║
╚═╝╚═╝╚═╝  ░╚═══██╗░░░██║░░░██║░░██║██╔═══╝░  ╚═╝╚═╝╚═╝
██╗██╗██╗  ██████╔╝░░░██║░░░╚█████╔╝██║░░░░░  ██╗██╗██╗
╚═╝╚═╝╚═╝  ╚═════╝░░░░╚═╝░░░░╚════╝░╚═╝░░░░░  ╚═╝╚═╝╚═╝

This code is intended for use and maintenance by authorized Talemetry CWS Developers only.
If you are not part of the Talemetry CWS Development team, refrain from making any edits or modifications to the code.
Unauthorized changes may result in functionality issues or unintended errors.

For any updates, questions, or concerns, please contact your Account Manager for assistance.

░█▀▀▀█ ▀█▀ ▀▀█▀▀ ░█▀▀▀ 　 ░█─░█ ░█▀▀▀█ ░█▀▀▀ ░█▀▀▀█ 　 ▀▀█▀▀ ░█─░█ ░█▀▀▀ ░█▀▄▀█ ░█▀▀▀ ░█▀▀▀█ 
─▀▀▀▄▄ ░█─ ─░█── ░█▀▀▀ 　 ░█─░█ ─▀▀▀▄▄ ░█▀▀▀ ─▀▀▀▄▄ 　 ─░█── ░█▀▀█ ░█▀▀▀ ░█░█░█ ░█▀▀▀ ─▀▀▀▄▄ 
░█▄▄▄█ ▄█▄ ─░█── ░█▄▄▄ 　 ─▀▄▄▀ ░█▄▄▄█ ░█▄▄▄ ░█▄▄▄█ 　 ─░█── ░█─░█ ░█▄▄▄ ░█──░█ ░█▄▄▄ ░█▄▄▄█

This site utilizes the 'Progressive Theme' for styling and functionality.
Please update the Theme directly rather than making changes to this site.
Once updated, ensure the Theme is re-applied to all applicable sites to maintain consistency across the platform.


































{%- endcomment -%}
//config code
var company_name = "Progressive";
// .header-outer height
var top_offset_height = 0;

// Set height
function setHeight(the_selector) {
    var a_height = 0;
    $(the_selector).css('height', 'auto');

    if ($('.width-detector').width() >= '640') {
        $(the_selector).each(function() {
            if ($(this).outerHeight() > a_height) {
                a_height = $(this).outerHeight();
            }
        });
        $(the_selector).attr('style', 'height: ' + a_height + 'px;');    
    }
    else {
        $(the_selector).css('height', 'auto');
    }
}

// Responsive videos
function setrespvideos() {
    var $allVideos = $("iframe[src^='https://player.vimeo.com'], iframe[src^='https://www.youtube.com'], iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed").not('.no-resize-video');
    $allVideos.each(function() {
        $(this).attr('data-aspectRatio', this.height / this.width).removeAttr('height').removeAttr('width');
    });
    $(window).resize(function() {
        $allVideos.each(function() {
            newHeight = $(this).width() * $(this).attr('data-aspectRatio');
            $(this).attr('style', 'height: ' + newHeight + 'px !important');
        });
    }).resize();
}

function showhidesubitems() {
    // escape header subnav
    if ( $('.header__menu').hasClass('child-item-active') ) {
        $('.header__menu').removeClass('child-item-active');
        $('.parent-item').attr('aria-expanded','false').next('.child-item').attr('aria-hidden','true');
        $('.parent-item').removeClass('active').next('.child-item').removeClass('active').parent('li').removeClass('active');
    }
}

// Facet code
window.facet_history = true;
// Function for expanding/collapsing Facet options
function facet_expand_collapse(facet_item_this){
    facet_item_this.parent().next('.facet-item__options').slideToggle();
    facet_item_this.parents('.facet-item').toggleClass('facet-item--expanded facet-item--collapsed');

    if (facet_item_this.parents('.facet-item').hasClass('facet-item--expanded')) {
        facet_item_this.attr('aria-expanded','true')
    }
    else {
        facet_item_this.attr('aria-expanded','false')
    }
}
// Function for Ajax-ing Job Search Results
function ds_tm_get_jobs_ajax(url){
    window.facet_loading = true;
    
    var t = $(".jobs-section").offset().top - (top_offset_height+$('.jobs-category-section').outerHeight());
    t = t > 0 ? t : 1;
 
    $('.preloader--search').show().find('.facet-jobs-loading').fadeIn().attr('tabindex','0').focus();
    $('.jobs-section__inner').hide().find('.facet-jobs-loaded').fadeOut();
    
    if(window.facet_history==true && window.history!=null && window.history.pushState!=null){
        window.history.pushState({},"",url);
    }
    
    $.get(url, function(data) {
        $(".jobs-category-section").html( $(data).find('.jobs-category-section').html() );
        $(".jobs-category-banner").html( $(data).find('.jobs-category-banner').html() );
        $(".jobs-heading").html( $(data).find('.jobs-heading').html() );
        $(".facet-section").html( $(data).find('.facet-section').html() );
        $(".jobs-section").html( $(data).find('.jobs-section').html() );
 
        var tagtitle = $(data).filter('title').text();
        document.title = (tagtitle!="") ? tagtitle : company_name+" Careers";
            
        $(".jobs-section__list").hide();
        $(".jobs-section__list").fadeIn(500);
 
        $('.facet-section').removeClass("ds_tm_ff_wait");
        window.facet_loading = false;
    
        $('.preloader--search').hide();
        $('.jobs-section__inner').show();

        $('html, body').animate({scrollTop: t}, 400, 'swing');

        $('.facet-jobs-loading').fadeOut();
        $('.facet-jobs-loaded').fadeIn().attr('tabindex','0').focus();
    });
}
function ds_tm_facet_click(e){
    if ($('.facet-section').hasClass('active')) {
        $('.facet-section-inner-2').addClass('slideUp');
    }
    else {
        $('.facet-section-inner-2').removeClass('slideUp');
    }

    e.preventDefault();
    var l = $(e.target).closest(".facet-item__option-link");
   
    if(window.facet_loading==true) {
        $('.facet-section').addClass("ds_tm_ff_wait");
    }
    else {
        l.addClass("ds_tm_ff_loading");
        $('.facet-section').addClass("ds_tm_ff_wait");
  
        var url = l.attr("href");
        ds_tm_get_jobs_ajax(url);
    }
} 
// Function to showing more Facet options over the facet_num_limit
function ds_tm_facet_more_click(e){
    var l = $(e.target).closest(".facet-item__show-more");
    var facetname = l.attr("ref");
    $("#facet-item__row--"+facetname).slideToggle();
    l.parent().addClass('hide');
}

function load_facet_jobs(facet_url,facet_div) {
    window.facet_history = false;
    facet_url = facet_url ? facet_url : "";
    
    window.facet_loading = true;
    
    if(window.facet_history==true && window.history!=null && window.history.pushState!=null){
        window.history.pushState({},"",facet_url);
    }
    
    $.get(facet_url, function(data) {
        $(facet_div).html( $(data).find('.jobs-section').html() );
        window.facet_loading = false;
    });
}

// Function to load Similar Jobs within Job Details pages
function ajaxloadjobs(jobsurl,callback) {
    $.get(jobsurl, function(data) {
        $('.similar-jobs--job-js').html( $(data).find('.similar-jobs--jobs-search-js').html() );
        var similar_jobs_content = $(data).find('.similar-jobs--jobs-search-js').html();
        // check if similar_jobs_content is not empty
        if ($.trim(similar_jobs_content)) {
            $('.similar-jobs-element-js').each(function() {
                var similar_jobs_element_classes = $(this).attr('class');
                //var similar_jobs_element_classes_new = similar_jobs_element_classes.replaceAll('--has-similar-jobs-js','').replaceAll('hide','');
                var similar_jobs_element_classes_new = similar_jobs_element_classes.replace(/--has-similar-jobs-js/g,'').replace(/hide/g,'');
                $(this).attr('class',similar_jobs_element_classes_new);
            });
        }
        else {
            $('.similar-jobs-element-js').each(function() {
                var similar_jobs_element_classes = $(this).attr('class');
                //var similar_jobs_element_classes_new = similar_jobs_element_classes.replaceAll('--no-similar-jobs-js','');
                var similar_jobs_element_classes_new = similar_jobs_element_classes.replace(/--no-similar-jobs-js/g,'');
                $(this).attr('class',similar_jobs_element_classes_new);
            });
        }
        callback();
    });
}
function loadjob() {
    $('.job-details-preloader-js').addClass('hide');
    $('.job-details-inner-js').addClass('active');
}

// Set loading alert for slow pages pt 1/3
var is_page_slow = false;
var has_page_loaded = false
function pageload() {
    if (has_page_loaded == false) {
        $('.preloader-wrapper--page').addClass('active');
        $('.page-loading').fadeIn().attr('tabindex','0').focus();
    }
    else if ( (has_page_loaded == true) && (is_page_slow == true) ) {
        $('.preloader-wrapper--page').removeClass('active');
        $('.page-loaded').fadeIn().attr('tabindex','0').focus();
    }
    else {
        $('.preloader-loaded').remove();
    }
}

// Redirect for trailing slash 1/2
const currentPath = window.location.pathname; // Capture the path of the current URL
function hasTrailingSlash(path) { // Function to check for trailing slash
    return path.endsWith('/');
}

$(document).ready(function() {
    // Redirect for trailing slash 2/2
    const pathHasTrailingSlash = hasTrailingSlash(currentPath); // Check if the path has a trailing slash
    console.log('Current path: '+currentPath);
    console.log('Has trailing slash: '+pathHasTrailingSlash);
    if (!pathHasTrailingSlash) {
        var pathwtrailingslash = currentPath+'/'
        window.location.replace(window.location.href.replace(currentPath, pathwtrailingslash));
    }
    
    // Set loading alert for slow pages pt 2/3
    setTimeout(function(){
        if ( (is_page_slow == false) && (has_page_loaded == false) ) {
            is_page_slow = true;
            pageload(); 
        }
    }, 3000);

    top_offset_height = $('.header-outer').outerHeight() + 20;

    // Preloaders
    $('.preloader-wrapper').attr('style','top: '+$(window).scrollTop()+'px;');

    // Setting responsive videos
    setrespvideos();

    // Setting the Saved Jobs link
    var c_jobs_temp = localStorage.getItem('c_jobs') ? JSON.parse(localStorage.getItem('c_jobs')) : [];
    var saved_jobs_query;
    if (c_jobs_temp.length != 0) {
        saved_jobs_query = '/jobs/search?external_id[]='+c_jobs_temp.join('&external_id[]=')+'&saved_jobs=1';
        $('.saved_jobs_link').prop('href',saved_jobs_query);

        if (window.location.pathname == '/pages/saved-jobs') {
            window.location.replace(saved_jobs_query);
        }
    }

    $(window).resize(function(){
        // Always remove all active classes to header navigation - pulled from // START Web-accessible dropdown menu
        $('.header__menu').removeClass('active child-item-active');
        $('.parent-item').attr('aria-expanded','false').next('.child-item').attr('aria-hidden','true');
        $('.parent-item').removeClass('active').next('.child-item').removeClass('active').parent('li').removeClass('active');

        // Always remove .menu-active and .facet-active
        $('.menu-active, .facet-active').removeClass('menu-active facet-active');

        // Screen section: set min-height same as window height
        $('.screen-section').css('min-height',$(window).height()+'px');

        // Home page
        if ($('.job-category__item').length > 1) {
            setHeight('.job-category__item-inner');
            setHeight('.job-category__item');
        }

        // Content pages: set minimum height + set scrolling
        if ($(window).height() == $(document).height()) {
            $('body').addClass('no-scroll');
        }
        else {
            $('body').removeClass('no-scroll');
        }
        var constant_containers_height = $('.top-wrapper').outerHeight() + $('footer').outerHeight();
        var template_content_min_height = $(window).height() - constant_containers_height;
        $('.template-content').attr('style','min-height: '+template_content_min_height+'px;');
        var total_content_height = constant_containers_height+template_content_min_height;

        // Content pages: same height featured items
        if ($('.page-details__featured-item').length > 1) {
            setHeight('.page-details__featured-list-image');
        }

        // Same height containers
        var same_height_counter = 0;
        var same_height_class_new = '';
        if ( $('.same-height-parent-js').length > 0 ) {
            $('.same-height-parent-js').each( function() {
                same_height_counter++;
                if ( $(this).find('.same-height-item-js').length > 0 ) {
                    $(this).find('.same-height-item-js').each( function() {
                        same_height_class_new = 'same-height-item--'+same_height_counter;
                        $(this).addClass(same_height_class_new);
                    });
                    setHeight('.'+same_height_class_new);
                }
            });
        }

        // Facet code
        // Show/hide facets
        if ($('.width-detector').width() >= 640) {
            $('body').addClass('scroll');
        }
        else if ($('.facet-section').hasClass('active')) {
            $('body').removeClass('scroll');    
        }
        else {
            $('body').addClass('scroll');   
        }
    }).resize();

    $(window).scroll(function() {
        // Explore Careers / View Openings sticky
        /*if ($(window).scrollTop() > $('.explore-view-openings-anchor.js').offset().top) {
            $('.explore-view-openings').addClass('fixed');
        } else {
            $('.explore-view-openings').removeClass('fixed');
        }*/
    }).scroll();

    // Close Top Message
    if (!localStorage.getItem('top_msg_viewed')) {
        $('.top-message-js').removeClass('hide');
    }

    $('.top-message-close-js').click(function() {
        localStorage.setItem('top_msg_viewed', true);
        $('.top-message-js').addClass('viewed');
    });

    // Mobile menu
    $('.header__menu-mobile-button, .header__menu-close').click(function() {
        if ( $('.header__menu.active').length > 0 ) {
            $('.header__menu-mobile-button a').attr('aria-expanded','false');
            $('.header__menu').attr('aria-hidden','true');
            $('body').removeClass('menu-active');

            $('.header__menu').removeClass('active');
            $('.header__menu nav').removeClass('slideUp');
        }
        else {
            $('.header__menu-mobile-button a').attr('aria-expanded','true');
            $('.header__menu').attr('aria-hidden','false');
            $('body').addClass('menu-active');

            $('.header__menu').addClass('active');
            $('.header__menu nav').addClass('slideUp');
        }
    });
    // START Web-accessible dropdown menu
    $('.parent-item').click(function(event) {
        if ($(this).hasClass('active')) {
            // remove aria and active classes to existing item
            $('.header__menu').removeClass('active child-item-active');
            $(this).attr('aria-expanded','false').next('.child-item').attr('aria-hidden','true');
            $(this).removeClass('active').next('.child-item').removeClass('active').parent('li').removeClass('active');
        }
        else {
            // remove aria and active classes to existing items
            $('.parent-item').attr('aria-expanded','false').next('.child-item').attr('aria-hidden','true');
            $('.parent-item').removeClass('active').next('.child-item').removeClass('active').parent('li').removeClass('active');

            // add aria and active classes to clicked item
            $('.header__menu').addClass('child-item-active');
            $(this).attr('aria-expanded','true').next('.child-item').attr('aria-hidden','false');
            $(this).addClass('active').next('.child-item').addClass('active').parent('li').addClass('active');
        }
    });
    $('.child-item__back-link').click(function() {
        $('.header__menu').removeClass('child-item-active');
        $(this).parents('.child-item').attr('aria-hidden','true').removeClass('active').prev('.parent-item').attr('aria-expanded','false').removeClass('active');
    });
    // Set aria-hidden for header__menu and header_menu so screen reader can read/detect menu items
    if ($('.width-detector').width() >= 1024) {
        $('.header__menu, .header__menu').attr('aria-hidden','false');
        $('body').removeClass('menu-active');
        $('body').removeClass('facet-active');
    }
    else {
        $('.header__menu, .header__menu').attr('aria-hidden','true');
        $('.header__menu').removeClass('child-item-active');
        $('.parent-item').attr('aria-expanded','false').removeClass('active');
        $('.child-item').attr('aria-hidden','true').removeClass('active').parent('li').removeClass('active');
    }
    // ESC key - to escape header subnav
    document.addEventListener('keydown', function(event){
        if ( (event.key === "Escape") || (event.keyCode === 27) ){
            showhidesubitems();
        }
    });
    const v_menu = $('.header__menu');
    $(document).mouseup(function (e) {
        if ( (!v_menu.is(e.target) && v_menu.has(e.target).length === 0) ) {
            showhidesubitems();
        }
    });
    // END Web-accessible dropdown menu

    // Talent Network links
    $('.talent-network-link').click(function() {
        $('#talent-network-main-js')[0].click();
    });

    // General Referral links
    $('.general-referral-link').click(function() {
        $('#general-referral-main-js a')[0].click();
    });

    // General Referral links
    $('.employee-survey-link').click(function() {
        $('#employee-survey-main-js a')[0].click();
    });

    // Candidate Notifications
    $(document).on("click", ".candidate-notification-link", function(){
        launchCandidateJobNotification();
    });

    // Tooltip links
    $('a.tooltip-link').each(function() {
        var this_tooltip_content_height = $(this).find('.tooltip-content').outerHeight() + 15;
        $(this).attr('aria-haspopup','dialog').find('.tooltip-content').append('<button class="tooltip__link-close" tabindex="-1"><i class="fa-solid fa-xmark"></i></button>').attr({
            'role':'dialog',
            'tabindex':'-1',
            'style':'top: -'+this_tooltip_content_height+'px;'
        });
    })
    $('a.tooltip-link').click(function() {
        
        if ($(this).find('.tooltip-content').hasClass('active')) {
            $(this).focus().find('.tooltip-content').removeClass('active').find('.tooltip__link-close').attr('tabindex','-1');
        }
        else {
            $(this).find('.tooltip-content').addClass('active').focus().find('.tooltip__link-close').attr('tabindex','0');
        }
    });

    // Job Search Results page
    // Facet code
    // Show/hide facets
    $(document).on('click', '.facet-filter-results-button', function() {
        $('.facet-section').toggleClass('active');
        //$('.facet-section-inner-2').toggleClass('slideUp');
        $('body').toggleClass('scroll');

        if ($('.facet-section').hasClass('active')) {
            $('.facet-section-inner-2').addClass('slideUp');
            $('body').addClass('facet-active');
        }
        else {
            $('.facet-section-inner-2').removeClass('slideUp');
            $('body').removeClass('facet-active');
        }
    });
    // Expanding/collapsing Facet options
    $(document).on("click", ".facet-item__heading button", function(){ facet_expand_collapse($(this)); });
    // Ajax-ing Job Search Results
    $(document).on("click", ".facet-item__option-link", function(e){ ds_tm_facet_click(e); });
    // Showing more Facet options over the facet_num_limit
    $(document).on("click", ".facet-item__show-more", function(e){ ds_tm_facet_more_click(e); });

    // Job Details page
    // Back to Search Results button
    if ($('#back-to-search').length > 0) {
        if ( document.referrer.indexOf('/search') > -1 && document.referrer.indexOf('/jobs') > -1 && document.referrer != '' ) {
            $('#back-to-search').attr('href',document.referrer);
        }
    }
    // Bottom Apply button
    $('.apply-bottom.js').click(function() {
        $('#apply-top.js a')[0].click();
    });
    // Bottom Refer button
    $('.refer-bottom.js').click(function() {
        $('#refer-top.js a')[0].click();
    });
    // Share texts
    $('.cs_share_twitter_btn').append('<span class="show-for-sr">share to twitter</span>');
    $('.cs_facebook_btn').append('<span class="show-for-sr">share to facebook</span>');
    $('.cs_share_linkedin_btn').append('<span class="show-for-sr">share to linkedin</span>');
    // Social Referral
    $('a.social-share-url__copy-js').click(function() {
        var copiedtext = $(this).prev('input')[0];

        /* Select the text field */
        copiedtext.select();
        //copiedtext.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand('copy');

        $(this).text('Copied!');
        setTimeout(function(){ $(this).text('Copy'); }, 3000);
    });

    // Blog Posts
    $('a#article-publish-data__share--copy-js').click(function() {
        var copiedtext = $('#post-share-url-js');

        /* Select the text field */
        copiedtext.select();
        //copiedtext.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand('copy');

        $('.article-publish-data__share--copied.js').addClass('active').attr('tabindex','0').focus();
        setTimeout(function(){
            $('.article-publish-data__share--copied.js').removeClass('active').attr('tabindex','-1');
            $(this).attr('tabindex','0').focus();
        }, 3000);
    });

    // Layout: Video Scroller - pause / play video
    $('.scroller-left__button.js').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').parents('.scroller-left__button-outer').next().find('video')[0].pause();
        }
        else {
            $(this).addClass('active').parents('.scroller-left__button-outer').next().find('video')[0].play();
        }
    });
    // Layout: Video Player
    $('.video-player-image__button.js').click(function() {
        $(this).parent().addClass('inactive').next('.video-player-video').addClass('active');
        //$('.responsive-embed--155415 iframe')[0].src += "?autoplay=1&mute=1";
    });
    $('.video-transcript-button.js').click(function() {
        if ($(this).hasClass('active')) {
            var media_5_top = $(this).parents('.video-transcript-outer').prev('.video-player-outer').find('.video-player-image').offset().top - 50;

            $(this).removeClass('active').attr('aria-expanded','false').next().addClass('hide');
            $(this).find('.video-transcript-show-hide').toggleClass('hide');

            $('html, body').animate({scrollTop: media_5_top}, 400, 'swing');
        }
        else {
            $(this).addClass('active').attr('aria-expanded','true').next().removeClass('hide');
            $(this).find('.video-transcript-show-hide').toggleClass('hide');
        }
        
    });
});

$(window).on('load', function() {
    $(window).resize();

    // Set loading alert for slow pages pt 3/3
    has_page_loaded = true;
    pageload();
});