var win = require( './util' ).win;

var DISABLED = 'carousel-button-disabled';

function isDisabled ( newIndex, nextPos, maxScroll ) {
    return {
        previous:  newIndex === 0,
        next:      nextPos >= maxScroll
    };
}

function toggleDisabled ( el, add ) {
    el.classList.toggle( DISABLED, add );
}

function getRotator ( carousel, items, next, previous ) {
    return function ( reverse ) {
        var currentIndex = carousel.currentIndex || 0;
        var maxScroll    = carousel.scrollWidth - carousel.clientWidth;
        var incrementor  = reverse ? -1 : 1;
        var direction    = reverse ? previous : next;
        var newIndex     = currentIndex += incrementor;
        var currentItem  = items[ newIndex ];

        if ( direction.classList.contains( DISABLED ) ) {
            return;
        }

        var nextPos  = currentItem.offsetLeft - carousel.offsetLeft;
        var disabled = isDisabled( newIndex, nextPos, maxScroll );

        toggleDisabled( previous, disabled.previous );
        toggleDisabled( next, disabled.next );

        carousel.scrollLeft   = nextPos;
        carousel.currentIndex = newIndex;
    };
}

function bindHandlers ( carousel, items, next, previous ) {
    var rotate = getRotator( carousel, items, next, previous );

    next.addEventListener( 'click', function () {
        rotate();
    });

    previous.addEventListener( 'click', function () {
        rotate( true );
    });
}

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
