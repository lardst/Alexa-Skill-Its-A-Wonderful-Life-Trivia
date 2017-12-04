/* global module, RegExp */
(function () {
    'use strict';

    var Ordinals = {
            numbers: {
                zero            : 0,
                one             : 1,
                fir             : 1,
                two             : 2,
                twe             : 2,
                twen            : 2,
                secon           : 2,
                three           : 3,
                thir            : 3,
                four            : 4,
                for             : 4,
                fort            : 4,
                five            : 5,
                fif             : 5,
                fift            : 5,
                six             : 6,
                seven           : 7,
                eight           : 8,
                nine            : 9,
                ten             : 10
            },
            magnitude: {
                hundre          : 100,
                thousan         : 1000,
                million         : 1000000,
                billion         : 1000000000,
                trillion        : 1000000000000,
                quadrillion     : 1000000000000000,
                quintillion     : 1000000000000000000,
                sextillion      : 1000000000000000000000,
                septillion      : 1000000000000000000000000,
                octillion       : 1000000000000000000000000000,
                nonillion       : 1000000000000000000000000000000,
                decillion       : 1000000000000000000000000000000000
            },
            modifier: {
                teen    : 10,
                ty      : 10
            }
        },
        RocketNodeJS = {
        regExp: [
            /\b(\w{3,})(ven|lve|teen)\b/,
            /\b(\w{3,})(ty)\-?(\w*)\b/,
            new RegExp(
                "\\b(\\w{3,}(?:ty|teen|)\\-?\\w*)\\s((" +
                Object.keys(Ordinals.magnitude).join('|') +
                ")(|d|dth|th))(\\s|$|\\b)"
            )
        ],
        convertToNumber: function (_word) {
            var returnValue = 0,
                match,
                ordinal,
                modifier,
                quantifier;

            if (typeof (Ordinals.numbers[_word]) !== 'undefined') {
                returnValue = Ordinals.numbers[_word];
            } else {
                RocketNodeJS.regExp.forEach((regExpression, index) => {
                    match = _word.match(new RegExp(regExpression, 'i'));

                    if (match) {
                        switch (index) {
                            case 0 : // This is a teen.
                                ordinal = Ordinals.numbers[match[1]];
                                modifier = Ordinals.modifier[match[2]];
                                returnValue = ordinal + modifier;
                                break;
                            case 1 : // This is a "ty", as in twenty, thirty, etc.
                                ordinal = Ordinals.numbers[match[1]];
                                modifier = Ordinals.modifier[match[2]];
                                quantifier = Ordinals.numbers[match[3]] || 0;
                                returnValue = (ordinal * modifier) + quantifier;
                                break;
                            case 2 : // This is a magnitude.
                                ordinal = RocketNodeJS.convertToNumber(match[1]);
                                modifier = Ordinals.magnitude[match[2]];
                                returnValue = ordinal * modifier;
                                break;
                            default:
                        }
                    }
                });
            }
            return returnValue;
        },
        clean: function (_word) {
            var _punctuation = /[\.,\/#!$%\^&\*;:\{\}=_`~\(\)]/g,
                _return = _word.replace(/\s{2,}/, ' ');
            _return = _return.replace(_punctuation, '');
            _return = _return.replace(/\b(a|and)\b/, ' ');
            _return = _return.replace(/ieth(\s|$)/g, 'y$1');
            _return = _return.replace(/(st|d|th)(\s|$)/g, '$2');
            return _return.trim().toLowerCase();
        },
        getRegions: function (_word) {
            var regularExpressions = RocketNodeJS.regExp.map((item) => {
                return item;
            }),
                returnValue = [],
                _match;

            // Check if the word is in the ordinal array.
            if (typeof (Ordinals.numbers[_word]) !== 'undefined') {
                returnValue = [_word];
            } else {
                // Reverse the array so that we can get the magnitudes first.
                regularExpressions.reverse();
                regularExpressions.forEach((regExpression) => {
                    _match = _word.match(new RegExp(regExpression, 'ig'));
                    if (_match) {
                        _match.map((item) => {
                            returnValue.push(item);
                        });
                    }
                });
            }
            return returnValue;
        },
        wordToNumber: function (_word) {
            var returnValue = 0,
                isNumber = !isNaN(parseInt(_word, 10)),
                word_regions;

            if (isNumber) {
                return parseInt(_word, 10);
            } else {
                word_regions = RocketNodeJS.getRegions(RocketNodeJS.clean(_word));
                word_regions.forEach((item) => {
                    returnValue += RocketNodeJS.convertToNumber(item);
                });
            }
            return returnValue;
        }
    };

    module.exports = RocketNodeJS;
})();
