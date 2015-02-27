var carousel = require( 'carousel-lite' );

window.addEventListener( 'DOMContentLoaded', function () {
    carousel.register({
        carousel: '.list',
        items:    '.item',
        previous: '.previous',
        next:     '.next'
    });
});
