var win               = require( './browser-shim' );
var toggleDisabled    = require( './lib' ).toggleDisabled;
var getRotator        = require( './lib' ).getRotator;
var getScrollIndex    = require( './lib' ).getScrollIndex;
var carouselCanScroll = require( './lib' ).carouselCanScroll;
var handleScroll      = require( './lib' ).handleScroll;

/**
 * The scroll listener on the carousel short circuits if the
 * ignoreScroll flag is set to true. This wrapper ensures that
 * the handler can differentiate between a native scroll and a
 * programmatic one.
 * @param   {function}  rotate
 * @param   {object}    carousel
 * @return  {function}
 */
function addScrollSuppressor ( rotate, carousel ) {
    return function ( reverse ) {
        carousel.ignoreScroll = true;
        rotate( reverse );

        // Setting this flag async ensures that the scroll handler
        // is invoked first (allowing it to short circuit).
        setTimeout( function () {
            carousel.ignoreScroll = false;
        }, 0 );
    };
}

function bindHandlers ( carousel, items, next, previous ) {
    var rotate = addScrollSuppressor(
        getRotator( carousel, items, next, previous ),
        carousel
    );

    next.addEventListener( 'click', function () {
        rotate();
    });

    previous.addEventListener( 'click', function () {
        rotate( true );
    });

    carousel.addEventListener( 'scroll', function () {
        if ( carousel.ignoreScroll ) {
            return;
        }

        handleScroll( carousel, items, next, previous );
    });
}

/**
 * Adds carousel next/previous handlers to a carousel
 * @param  {object}   args
 * @param  {string}   args.carousel     Selector for carousel ul
 * @param  {string}   args.items        Selector for li children of the carousel ul
 * @param  {string}   args.next         Selector for next button
 * @param  {string}   args.previous     Selector for previous button
 */
module.exports.register = function ( args ) {
    var carousel = win.document.querySelector( args.carousel );
    var next     = win.document.querySelector( args.next );
    var previous = win.document.querySelector( args.previous );
    var items    = win.document.querySelectorAll( args.items );

    if ( !carousel || !next || !previous || !items.length ) {
        return;
    }

    // Disable the "previous" button by default, and the next button
    // if the entirety of list fits within the carousel's clientWidth.
    toggleDisabled( previous, true );
    toggleDisabled( next, carouselCanScroll( carousel, items ) );

    bindHandlers( carousel, items, next, previous );
};
