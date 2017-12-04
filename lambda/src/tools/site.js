(function(global){
    global.Empty = function (_string, returnTheString, _default) {
        if (typeof(_string) !== 'undefined' || !_string || _string.length === 0 || !_string.trim()) {
            return _default || false;
        } else {
            return returnTheString ? _string : true;
        }
    };

    global.getUniqueRandomNumber = (min, max, tracker) => {
        let rand = Math.floor((Math.random() * (max - min + 1)) + min);
        if (tracker) {
            while (tracker.indexOf(rand) > -1) {
                rand = Math.floor((Math.random() * (max - min + 1)) + min);
            }
        }
        return rand;
    }

    global.cleanJSON = (jsonString) => {
        var commentRegEx = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;
        try {
            return jsonString.replace(commentRegEx, function (word) {
                return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
            });
        } catch(e) {
            console.log("typeof: " + typeof(jsonString));
            console.log(e);
        }
    }

    Array.prototype.Randomize = function() {
        var max = this.length - 1,
            rand;

        if (this.randomTracker.length === max) {
            this.randomTracker = [];
        }
        rand = getUniqueRandomNumber(0, max, this.randomTracker);
        this.randomTracker.push(rand);
        return this[rand];
    };

    Array.prototype.randomTracker = [];

    Array.prototype.JoinWith = function(separator, endWith, includeNumberBullets = false) {
        var returnString = '',
            arrayLength = this.length - 1;

        this.forEach(function(entry, index) {
            returnString += index > 0 ? index < arrayLength ? separator : separator + endWith : '';
            returnString += (includeNumberBullets ? (index + 1).toString() + ': ' : '') + entry;
        });

        return returnString;
    }

    Number.prototype.isInRange = function(min, max) {
        return this >= min && this <= max;
    };

    Object.prototype.getKeys = function(_key, _delimiter = ' ') {
        var key,
            value,
            returnArray = [];

        for(key in this) {
            if (key === _key) {
                returnArray.push(this[key]);
            } else if (typeof(this[key]) === 'object') {
                value = this[key].getKeys(_key);
                returnArray.push(value);
            }
        }

        return returnArray.join(_delimiter);
    }

    String.prototype.Clean = function() {
        var _return = this.replace(/\s{2,}/g, ' ').trim();
        _return = _return.replace(/\s(\.|\,)/g, '$1');
        _return = _return.replace(/(\.|\,)(\w)/g, '$1 $2');
        return _return;
    }

    String.prototype.Concat = function () {
        var _arguments = Array.prototype.slice.call(arguments, 0);
        return this + ' ' + _arguments.join(' ');
    }

    String.prototype.Format = function () {
        var text = this,
            args,
            formatRegExp = /%[sdj%]/g,
            i = 0;

        try {
            args = arguments[0].constructor === Array ? arguments[0]: arguments;
        } catch(e) {
            args = arguments;
        }

        if (args.length) {
            text = text.replace(formatRegExp, function (result) {
                var returnValue;
                switch (result) {
                    case '%%':
                        returnValue = '%';
                        break;
                    case '%s':
                        returnValue = typeof(args[i]) !== 'undefined' ? String(args[i]) : '%s';
                        break;
                    case '%d':
                        returnValue = typeof(args[i]) !== 'undefined' ? Number(args[i]) : '%d';
                        break;
                    case '%j':
                        try {
                            returnValue = JSON.stringify(args[i++]);
                        } catch (e) {
                            returnValue = {};
                        }
                }
                i++;
                return returnValue;
            });
        }

        return text;
    };

    String.prototype.Capitalize = function() {
        var _this = this;

        return _this.replace(/.+?[\.\?\!](\s|$)/g, function (_string) {
            return _string.charAt(0).toUpperCase() + _string.substr(1);
        });
    }
})(global);