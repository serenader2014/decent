/* globals jQuery, document */
(function () {
    var content = document.querySelector('#html-wrapper');
    var title = document.querySelector('title');
    var goToTop = document.querySelector('.go-to-top');
    var html = document.querySelector('html');
    var body = document.body;
    var windowHeight = document.documentElement.clientHeight;
    var timeoutHandler;
    var requestList = [];
    var progress = new Progress();

    // make sure `decentThemeConfig` is exist.
    if (typeof decentThemeConfig === 'undefined') {
        window.decentThemeConfig = {};
    }

    function get(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                requestList.splice(requestList.indexOf(url), 1);
                if (!requestList.length) {
                    progress.end();
                }
                callback(xhr.responseText);
            }
        };
        requestList.push(url);
        if (progress.status !== 'loading') {
            progress.start();
        }
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    function fadeOut(element, callback) {
        var currentOpacity = element.style.opacity || 1;

        setTimeout(function () {
            var opacity = Number(currentOpacity) - 0.05;
            element.style.opacity = opacity < 0 ? 0 : opacity;
            if (opacity > 0) {
                fadeOut(element, callback);
            } else {
                element.style.display = 'none';
                typeof callback === 'function' && callback();
            }
        }, 10);
    }

    function fadeIn(element, callback) {
        var currentOpacity = element.style.opacity || 1;
        var display = element.style.display;
        if (display === 'none') {
            element.style.display = 'block';
        }

        setTimeout(function () {
            var opacity = Number(currentOpacity) + 0.05;
            element.style.opacity = opacity > 1 ? 1 : opacity;
            if (opacity < 1) {
                fadeIn(element, callback);
            } else {
                typeof callback === 'function' && callback();
            }
        }, 10);
    }

    function scrollToTop(animate, distance, callback) {
        var currentTop = body.scrollTop;
        var direction = currentTop > distance ? -1 : 1;
        if (!animate) {
            body.scrollTop = distance;
            html.scrollTop = distance;
            return;
        }
        setTimeout(function () {
            var top;

            if (direction === 1) {
                top = currentTop + 10;
                body.scrollTop = top > distance ? distance : top;
                html.scrollTop = top > distance ? distance : top;
            } else {
                top = currentTop - 10;
                body.scrollTop = top < distance ? distance : top;
                html.scrollTop = top < distance ? distance : top;
            }

            if ((direction === 1 && top > distance) || (direction === -1 && top < distance)) {
                typeof callback && callback();
            } else {
                scrollToTop(animate, distance, callback);
            }
        }, 10);
    }

    // loading page using ajax
    function loadHTML(url) {
        fadeOut(content, function () {
            scrollToTop(false, 0);
            get(url, function (response) {
                var tmpElement = document.createElement('div');
                tmpElement.innerHTML = response;
                content.innerHTML = tmpElement.querySelector('#html').innerHTML;
                fadeIn(content, function () {
                    runScript(true);
                });

                var titleRegExp = /<title[^>]*>((.|[\n\r])*)<\/title>/im;
                var result = titleRegExp.exec(response);
                if (result.length && result[1]) {
                    title.innerText = result[1];
                }
                if (decentThemeConfig.ga) {
                    ga('send', 'pageview', url);
                }
            })
        })
    }

    // load comment
    function loadComment() {
        if (decentThemeConfig && decentThemeConfig.duoshuo) {
            document.querySelector('.ds-thread').style.display = 'block';
            window.duoshuoQuery = {short_name: decentThemeConfig.duoshuo};
            var ds = document.createElement('script');
            ds.type = 'text/javascript';ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.head || document.body).appendChild(ds);
        }
        if (decentThemeConfig && decentThemeConfig.disqus) {
            document.querySelector('#disqus_thread').style.display = 'block';
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
        var src = image.getAttribute('src');
        var newImg = new Image();
        newImg.addEventListener('load', function () {
            // save all the image's original size, will use in photoswipe
            image.setAttribute('data-width', newImg.width);
            image.setAttribute('data-height', newImg.height);
            typeof callback === 'function' && callback({width: newImg.width, height: newImg.height});
        });
        newImg.src = src;
    }

    // run scripts in every page
    function runScript(ajax) {
        var postContent = document.querySelector('.post-content');
        // $postContent.fitVids();

        if (!postContent) return;
        var images = [].slice.call(postContent.querySelectorAll('img'));
        images.forEach(function (item) {
            getImageRealSize(item);
        });

        if (ajax) {
            goToTop = document.querySelector('.go-to-top');
            Prism.highlightAll();
        }
    }

    // use ajax to loage webpage instead of a normal page request.
    function loadPageWithAjax() {
        // listen to the history change, load the target page
        window.addEventListener('popstate', function (e) {
            if (e.state && e.state.pathname) {
                loadHTML(e.state.pathname);
            }
        });

        // hook all the internal link, when user click the link,
        // perform an ajax request, and prevent the default behavior
        document.addEventListener('click', function (e) {
            if (e.target.tagName.toLowerCase() !== 'a') return;
            if (e.target.hostname !== location.hostname) return;
            e.preventDefault();
            var pathname = e.target.pathname;
            window.history.pushState({ pathname: pathname }, pathname, pathname);
            loadHTML(pathname);
        });
    }


    document.addEventListener('DOMContentLoaded', function () {
        runScript();

        // enable the ajax load only if the browser support history and pushState
        if (window.history && window.history.pushState) {
            loadPageWithAjax();
        }
    });

    //  goToTop button
    document.addEventListener('scroll', function () {
        if (document.documentElement.clientWidth <= 500) {
            return;
        }
        var top = body.scrollTop;
        if (top > windowHeight/2 && goToTop.style.display !== 'block') {
            fadeIn(goToTop);
        }
        if (top <= windowHeight/2 && goToTop.style.display === 'block') {
            fadeOut(goToTop);
        }
        if (timeoutHandler) {
            clearTimeout(timeoutHandler);
        }

        goToTop.classList.remove('less-opacity');
        timeoutHandler = setTimeout(function () {
            goToTop.classList.add('less-opacity');
        }, 2000);
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.value.split(' ').indexOf('.go-to-top') === -1) return;
        scrollToTop(true, 0);
    });

    // album image slider
    document.addEventListener('click', '.album img', function () {
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
    $(document).on('click', '.post-content img', function () {
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
    $(document).on('click', '.load-comments', function () {
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
})();
