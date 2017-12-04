class AlexaIntent {
    constructor () {
        this._value = null;
    }

    get value () {
        return this._value;
    }

    set value (_value) {
        this._value = _value;
    }
}

var AlexaTest = {
    attributes: {},
    emit: function () {},
    emitWithState: function () {},
    handler: {
        state: ''
    },
    response: {
        speak: function (str) {
            console.log("/*********************************************************************************************************************/");
            console.log("");
            console.log('Speak:');
            console.log(str);
            console.log("");
            return this;
        },
        listen: function (str) {
            console.log("");
            console.log('Listen:');
            console.log(str);
            console.log("");
            return this;
        }
    },
    event: {
        request: {
            intent: {
                slots: {
                    Number: new AlexaIntent()
                }
            }
        }
    }
};

module.exports = AlexaTest;