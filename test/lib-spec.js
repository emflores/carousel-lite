require( 'should' );
var sinon = require( 'sinon' );

var lib = require( '../lib' );

var _assign = require( 'lodash-compat/object/assign' );
var _clone  = require( 'lodash-compat/lang/cloneDeep' );

// Fixtures
var baseEls = require( './fixtures' ).els;

describe( 'Carousel Lite Lib', function () {
    describe( 'Toggle Disabled', function () {
        it( 'calls classList toggle', function () {
            var toggleSpy = sinon.spy();
            var el = _clone( baseEls[ 'previous' ] );
            el.classList.toggle = toggleSpy;
            lib.toggleDisabled( el, true );
            toggleSpy.called.should.be.true;
        });
    });

    describe( 'Sync Scroll Index', function () {

    });

    describe( 'Rotator', function () {
        var els = null;
        var rotate = null;

        beforeEach( function () {
            els = _clone( baseEls );
            rotate = lib.getRotator(
                els.carousel,
                els.items,
                els.next,
                els.previous
            );
        });

        it( 'rotates a carousel to the right', function () {
            rotate();
            els.carousel.scrollLeft.should.equal( 50 );
        });

        it( 'rotates a carousel to the left', function () {
            rotate();
            rotate( true );
            els.carousel.scrollLeft.should.equal( 0 );
        });

        it( 'does nothing if a user attempts to rotate left and scrollLeft is already 0', function () {
            rotate();
            rotate( true );
            rotate( true );
            els.carousel.scrollLeft.should.equal( 0 );
        });

        it( 'does nothing if a user attempts to rotate right and scrollLeft is already at its max value', function () {
            rotate();
            rotate();
            els.carousel.scrollLeft.should.equal( 50 );
        });
    });
});
