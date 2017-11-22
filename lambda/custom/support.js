(function(global){
    global.getUniqueRandomNumber = (min, max, tracker) => {
        let rand = Math.floor((Math.random() * (max - min + 1)) + min);
        if (tracker) {
            while (tracker.indexOf(rand) > -1) {
                rand = Math.floor((Math.random() * (max - min + 1)) + min);
            }
        }
        return rand;
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

    String.prototype.Clean = function() {
        return this.replace(/\s{2,}/g, ' ');
    }

    String.prototype.Concat = function (separator) {
        var _arguments = Array.prototype.slice.call(arguments, 1);
        return this + separator + _arguments.join(separator);
    }

    String.prototype.Format = function () {
        var text = this,
            args = arguments,
            formatRegExp = /%[sdj%]/g,
            i = 0;

        if (args.length) {
            if (args.length) {
                text = text.replace(formatRegExp, function (result) {
                    switch (result) {
                        case '%%':
                            return '%';
                        case '%s':
                            return String(args[i++]);
                        case '%d':
                            return Number(args[i++]);
                        case '%j':
                            try {
                                return JSON.stringify(args[i++]);
                            } catch (e) {
                                return {};
                            }
                    }
                });
            }
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