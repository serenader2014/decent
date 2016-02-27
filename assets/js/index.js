/* globals jQuery, document */
(function ($, undefined) {
    var $document = $(document);

    $document.ready(function () {

        var $postContent = $('.post-content');
        var postTitleLink = $('.post-title a');
        var container = $('.content');
        $postContent.fitVids();
        // postTitleLink.on('click', function (event) {
        //     event.preventDefault();
        //     container.load(this.href + ' .content');
        // });
    });
})(jQuery);
