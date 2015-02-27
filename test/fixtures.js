var _clone = require( 'lodash/lang/clone' );

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
    classList: {
        toggleClass: function ( className, add ) {
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
    carousel: _clone( baseElement ),
    next:     _clone( baseElement ),
    previous: _clone( baseElement ),
    items:    [
        _clone( baseElement ),
        _clone( baseElement )
    ]

};
