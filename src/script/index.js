/* globals jQuery, document */
(function ($, undefined) {
    var $document = $(document);
    $document.ready(function () {
        var $postContent = $('.post-content');
        var postTitleLink = $('.post-title a');
        var container = $('.content');
        var $album = $('.album');
        var pswpElement = $('.pswp').get(0);    
        var goToTop = $('.go-to-top');
        var win = $(window);
        var windowHeight = win.height();
        var timeoutHandler;

        /*
            Fix video size.
         */
        $postContent.fitVids();


        /*
            Image gallery
         */
        $('.post-content img').each(function () {
            var src = $(this).attr('src');
            var self = $(this);
            var newImg = new Image();
            newImg.addEventListener('load', function () {
                // save all the image's original size, will use in photoswipe
                self.data('width', newImg.width).data('height', newImg.height);
            });
            newImg.src = src;
        }).on('click', function () {
            if ($(this).parents('.album').length) {
                return;
            }
            var options = {
                index: 0
            };
            var items = [{
                src: $(this).attr('src'),
                w: $(this).data('width') || $(this).width(),
                h: $(this).data('height') || $(this).height(),
            }];

            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        });

        $album.each(function () {
            var items = [];
            var figureList = $(this).find('figure');
            var imgList = $(this).find('img');

            if (figureList.length) {
                figureList.each(function (index, item) {
                    var img = $(item).find('img');
                    var src = img.attr('src');
                    var newImg = new Image();
                    newImg.addEventListener('load', function () {
                        var caption = $(item).find('figcaption');
                        var option = {
                            src: src,
                            w: newImg.width,
                            h: newImg.height,
                            title: caption.html(),
                            index: index,
                        };
                        items.push(option);
                    });
                    newImg.src = src;
                });
            } else {
                imgList.each(function (index, img) {
                    var newImg = new Image();
                    var src = $(img).attr('src');
                    newImg.addEventListener('load', function () {
                        var option = {
                            src: src,
                            w: newImg.width,
                            h: newImg.height,
                            index: index,
                        };
                        items.push(option);
                    });
                    newImg.src = src;
                });
            }

            $(this).data('gallery', items);
        });

        $album.on('click', 'img', function () {
            var album = $(this).parents('.album');
            var items = album.data('gallery').sort(function (a, b) {return a.index - b.index;});
            var index = album.find('img').index($(this));

            var options = {
                index: index
            };

            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        });


        /*
            Scroll To Top button
         */
        win.on('scroll', function () {
            var top = $(this).scrollTop();
            if (top > windowHeight/2 && !goToTop.is(':visible')) {
                goToTop.fadeIn();
            }
            if (top <= windowHeight/2 && goToTop.is(':visible')) {
                goToTop.fadeOut();
            }
            if (timeoutHandler) {
                clearTimeout(timeoutHandler);
            }

            goToTop.removeClass('less-opacity');
            timeoutHandler = setTimeout(function () {
                goToTop.addClass('less-opacity');
            }, 2000);
        });
        goToTop.on('click', function () {
            $('body, html').animate({scrollTop: 0});
        });


        /*
            GA service
         */
        // make sure `decentThemeConfig` is exist.
        if (typeof decentThemeConfig === 'undefined') {
            window.decentThemeConfig = {};
        }

        if (decentThemeConfig.ga) {
            var trackId = decentThemeConfig.ga;
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', trackId, 'auto');
            ga('send', 'pageview');
        }
    });
})(jQuery);
