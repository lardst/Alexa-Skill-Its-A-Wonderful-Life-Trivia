var _strings = require('../language/en-US');

function strings (stringPointer) {
    var stringPointerArray = stringPointer.split('.'),
        stringToReturn = stringPointerArray.reduce(function(o, x) { return o[x] }, _strings);
    return typeof(stringToReturn) !== 'undefined' ? stringToReturn : stringPointer;
}

module.exports = strings;