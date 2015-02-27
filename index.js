var win = require( './util' ).win;

function isDisabled ( newIndex, items ) {
    return {
        previous:  newIndex === 0,
        next:      newIndex === items.length
    };
}

function getRotator ( carousel, items, next, previous ) {
    return function ( reverse ) {
        var currentIndex = carousel.currentIndex || 0;
        var currentItem  = items[ currentIndex ];
        var nextPos      = currentItem.offsetLeft - carousel.offsetLeft + currentItem.offsetWidth;

        var incrementor  = reverse ? -1 : 1;
        var newIndex     = currentIndex += incrementor;

        // @todo - this is broken. need to figure out a way how to calculate
        // when there is no more room to scroll.
        //
        // Do we enable/disable the next button based the scrollable area too?
        if ( newIndex < 0 || nextPos >= carousel.scrollWidth ) {
            return;
        }

        var disabled = isDisabled( newIndex, items );

        previous.classList.toggle( 'disabled', disabled.previous );
        next.classList.toggle( 'disabled', disabled.next );

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

    bindHandlers( carousel, items, next, previous );
};
