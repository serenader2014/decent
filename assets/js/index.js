/* globals jQuery, document */
(function ($, undefined) {
    var $document = $(document);

    $document.ready(function () {

        var $postContent = $('.post-content');
        var postTitleLink = $('.post-title a');
        var container = $('.content');
        $postContent.fitVids();
    });
})(jQuery);
