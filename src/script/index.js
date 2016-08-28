/* globals jQuery, document */
(function ($, undefined) {
    var $document = $(document);
    var $window = $(window);
    var $content = $('#html-wrapper');
    var $title = $('title');
    var goToTop = $('.go-to-top');
    var windowHeight = $window.height();
    var timeoutHandler;

    // make sure `decentThemeConfig` is exist.
    if (typeof decentThemeConfig === 'undefined') {
        window.decentThemeConfig = {};
    }

    // loading page using ajax
    function loadHTML(url) {
        $.get(url).success(function (response) {
            $content.fadeOut(function () {
                $content.html($(response).find('#html')).fadeIn();
                runScript(true);
            });
            var titleRegExp = /<title[^>]*>((.|[\n\r])*)<\/title>/im;
            var result = titleRegExp.exec(response);
            if (result.length && result[1]) {
                $title.html(result[1]);
            }
            ga('send', 'pageview', url);
        })
    }

    // load comment
    function loadComment() {
        if (decentThemeConfig && decentThemeConfig.duoshuo) {
            $('.ds-thread').show();
            window.duoshuoQuery = {short_name: decentThemeConfig.duoshuo};
            var ds = document.createElement('script');
            ds.type = 'text/javascript';ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0]
             || document.getElementsByTagName('body')[0]).appendChild(ds);
        }
        if (decentThemeConfig && decentThemeConfig.disqus) {
            $('#disqus_thread').show();
            var disqus_config = function () {
                this.page.url = '{{post.url}}';
                this.page.identifier = '{{post.id}}';
            };
            var d = document, s = d.createElement('script');
            s.src = '//' + decentThemeConfig.disqus + '.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        }
    }

    // get image's real size
    function getImageRealSize(image, callback) {
        var self = $(image);
        var src = self.attr('src');
        var newImg = new Image();
        newImg.addEventListener('load', function () {
            // save all the image's original size, will use in photoswipe
            self.attr('data-width', newImg.width).attr('data-height', newImg.height);
            typeof callback === 'function' && callback({width: newImg.width, height: newImg.height});
        });
        newImg.src = src;
    }

    // run scripts in every page
    function runScript(ajax) {
        var $postContent = $('.post-content');
        $postContent.fitVids();

        $postContent.find('img').each(function (index, item) {
            getImageRealSize(item);
        });

        if (ajax) {
            goToTop = $('.go-to-top');
            $('html, body').scrollTop(0);
            Prism.highlightAll();
        }
    }

    // hook ajax request, when a request was made, showing a progress bar
    // indicator, and hide it when the request was finished.
    function hookAjax() {
        var requestList = [];
        var progress = new Progress();
        $document.ajaxSend(function (event, xhr, option) {
            requestList.push(option.url);
            if (progress.status !== 'loading') {
                progress.start();
            }
        });

        $document.ajaxComplete(function (event, xhr, option) {
            requestList.splice(requestList.indexOf(option.url), 1);
            if (!requestList.length) {
                progress.end();
            }
        });
    }

    // use ajax to loage webpage instead of a normal page request.
    function loadPageWithAjax() {
        // listen to the history change, load the target page
        var history = History.createHistory();
        history.listen(function (location) {
            if (location.action === 'POP') {
                loadHTML(location.pathname);
            }
        })

        // hook all the internal link, when user click the link,
        // perform an ajax request, and prevent the default behavior
        $document.on('click', 'a', function (e) {
            if (this.hostname !== location.hostname) return;
            e.preventDefault();
            var pathname = this.pathname;
            history.push({
                pathname: pathname
            })
            loadHTML(pathname);
        });
    }

    $document.ready(function () {
        runScript();
        hookAjax();

        // enable the ajax load only if the browser support history and pushState
        if (window.history && window.history.pushState) {
            loadPageWithAjax();
        }
    });

    //  goToTop button
    $window.on('scroll', function () {
        if ($window.width() <= 500) {
            return;
        }
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

    $document.on('click', '.go-to-top', function () {
        $('body, html').animate({scrollTop: 0});
    });

    // album image slider
    $document.on('click', '.album img', function () {
        var album = $(this).parents('.album');
        var items = [];
        var imgList = album.find('img');

        imgList.each(function (index, img) {
            var $img = $(img);
            var src = $img.attr('src');
            var title = $img.siblings('figcaption');
            var option = {
                src: src,
                w: $img.data('width') || img.width,
                h: $img.data('height') || img.height,
                index: index,
            };
            if (title.length) {
                option.title = title.html();
            }
            items.push(option);
        });

        var index = imgList.index($(this));
        var pswpElement = $('.pswp').get(0);

        var options = {
            index: index,
            history: false,
        };

        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    });

    // post image slider
    $document.on('click', '.post-content img', function () {
        var $img = $(this);
        if ($img.parents('.album').length) {
            return;
        }
        var pswpElement = $('.pswp').get(0);
        var options = {
            index: 0,
            history: false,
        };
        var items = [{
            src: $img.attr('src'),
            w: $img.data('width') || $img.width(),
            h: $img.data('height') || $img.height(),
        }];

        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    });

    // load comment
    $document.on('click', '.load-comments', function () {
        loadComment();
        $(this).hide();
    })

    // GA
    if (decentThemeConfig.ga) {
        var trackId = decentThemeConfig.ga;
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', trackId, 'auto');
        ga('send', 'pageview');
    }
})(jQuery);
