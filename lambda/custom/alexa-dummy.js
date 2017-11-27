module.exports = {
    attributes: {},
    emit: function () {},
    handler: {
        state: null
    },
    response: {
        speak: function (str) {
            console.log("-------------------------------------------------------------------------------");
            console.log(str);
            console.log("-------------------------------------------------------------------------------");
            return this;
        },
        listen: function (str) {
            return this;
        }
    },
    event: {
        request: {
            intent: {
                slots: {
                    Answer: {
                        value: "third"
                    }
                }
            }
        }
    }
};