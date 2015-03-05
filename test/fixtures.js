var _clone  = require( 'lodash-compat/lang/cloneDeep' );
var _assign = require( 'lodash-compat/object/assign' );

module.exports.args = {
    carousel: 'carousel',
    next: 'next',
    previous: 'previous',
    items: 'items'
}

var baseElement = {
    scrollWidth: 0,
    clientWidth: 0,
    offsetLeft:  0,
    offsetWidth: 50,
    classList: {
        toggle: function ( className, add ) {
            if ( add ) {
                this.classes.push( className );
                return;
            }

            var index = this.classes.indexOf( className );

            if ( index > -1 ) {
                this.classes.splice( index, 1 );
                return;
            }
        },
        contains: function ( className ) {
            return this.classes.indexOf( className ) > -1;
        },
        classes: []
    },
    addEventListener: function ( ev, cb ) {
        cb();
    }
}

module.exports.els = {
    carousel: _assign( _clone( baseElement ), { offsetLeft: 0, scrollWidth: 150, clientWidth: 100 } ),
    next:     _clone( baseElement ),
    previous: _clone( baseElement ),
    items:    [
        _assign( _clone( baseElement ), { offsetLeft: 0 } ),
        _assign( _clone( baseElement ), { offsetLeft: 50 } ),
        _assign( _clone( baseElement ), { offsetLeft: 100 } )
    ]

};
