var win            = require( './browser-shim' );
var toggleDisabled = require( './lib' ).toggleDisabled;
var getRotator     = require( './lib' ).getRotator;

function bindHandlers ( carousel, items, next, previous ) {
    var rotate = getRotator( carousel, items, next, previous );

    next.addEventListener( 'click', function () {
        rotate();
    });

    previous.addEventListener( 'click', function () {
        rotate( true );
    });
}

/**
 * Adds carousel next/previous handlers to a carousel
 * @param  {object}   args
 * @param  {string}   args.carousel     Selector for carousel ul
 * @param  {string}   args.items        Selector for li children of carousel ul
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

    // Disable the "previous" button
    toggleDisabled( previous, true );

    bindHandlers( carousel, items, next, previous );
};
