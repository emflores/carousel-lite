var DISABLED = 'carousel-button-disabled';

var _findIndex = require( 'lodash-compat/array/findIndex' );

function isDisabled ( newIndex, nextPos, maxScroll ) {
    return {
        previous: newIndex === 0,
        next:     nextPos >= maxScroll
    };
}

/**
 * When native scroll is utilized, estimate the scroll index position so
 * that we have a starting spot if the user begins utilizing the next/previous
 * buttons.
 * @param  {object} carousel
 * @param  {array}  items
 * @return {integer}
 */
function getScrollIndex ( carousel, items ) {
    var carouselScroll = carousel.scrollLeft;
    var carouselOffset = carousel.offsetLeft;

    return _findIndex( items, function ( item ) {
        return ( item.offsetLeft - carouselOffset ) >= carouselScroll;
    });
}

function shouldDisableNext ( carousel, items ) {
    var lastItem            = items[ items.length - 1 ];
    var lastItemRightOffset = lastItem.offsetLeft - carousel.offsetLeft + lastItem.offsetWidth;
    return lastItemRightOffset <= carousel.clientWidth;
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
        var newIndex     = currentIndex + incrementor;
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

module.exports.toggleDisabled    = toggleDisabled;
module.exports.getRotator        = getRotator;
module.exports.getScrollIndex    = getScrollIndex;
module.exports.shouldDisableNext = shouldDisableNext;
