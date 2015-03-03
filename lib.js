var DISABLED = 'carousel-button-disabled';

var _findIndex = require( 'lodash-compat/array/findIndex' );

function isDisabled ( newIndex, newPos, carousel ) {
    return {
        previous: newIndex === 0,
        next:     newPos >= getMaxScroll( carousel )
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

function getMaxScroll ( carousel ) {
    return carousel.scrollWidth - carousel.clientWidth;
}

function getNextPosition ( carousel, newItem ) {
    return newItem.offsetLeft - carousel.offsetLeft;
}

function syncPositionState ( carousel, items, newIndex, next, previous ) {
    var newItem  = items[ newIndex ];
    var nextPos  = getNextPosition( carousel, newItem );
    var disabled = isDisabled( newIndex, nextPos, carousel );

    toggleDisabled( previous, disabled.previous );
    toggleDisabled( next, disabled.next );

    return nextPos;
}

function carouselCanScroll ( carousel, items ) {
    var lastItem            = items[ items.length - 1 ];
    var lastItemRightOffset = lastItem.offsetLeft - carousel.offsetLeft + lastItem.offsetWidth;
    return lastItemRightOffset <= carousel.clientWidth;
}

function handleScroll ( carousel, items, next, previous ) {
    var newIndex = Math.max(
        getScrollIndex( carousel, items ) - 1,
        0
    );

    syncPositionState( carousel, items, newIndex, next, previous );

    carousel.currentIndex = newIndex;
}

function toggleDisabled ( el, shouldDisable ) {
    el.classList.toggle( DISABLED, shouldDisable );
    el.disabled = shouldDisable;
}

function getRotator ( carousel, items, next, previous ) {
    return function ( reverse ) {
        var currentIndex = carousel.currentIndex || 0;
        var incrementor  = reverse ? -1 : 1;
        var direction    = reverse ? previous : next;
        var newIndex     = currentIndex + incrementor;

        if ( direction.classList.contains( DISABLED ) ) {
            return;
        }

        carousel.scrollLeft   = syncPositionState( carousel, items, newIndex, next, previous );
        carousel.currentIndex = newIndex;
    };
}

module.exports.toggleDisabled    = toggleDisabled;
module.exports.getRotator        = getRotator;
module.exports.getScrollIndex    = getScrollIndex;
module.exports.carouselCanScroll = carouselCanScroll;
module.exports.handleScroll      = handleScroll;
