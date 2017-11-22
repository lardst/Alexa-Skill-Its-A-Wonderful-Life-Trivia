module.exports = {
    attributes: {},
    emit: function () {},
    handler: {
        state: ''
    },
    response: {
        speak: function (str) {
            console.log("-------------------------------------------------------------------------------");
            console.log('Speak:');
            console.log(str);
            console.log("-------------------------------------------------------------------------------");
            return this;
        },
        listen: function (str) {
            console.log("-------------------------------------------------------------------------------");
            console.log('Listen:');
            console.log(str);
            console.log("-------------------------------------------------------------------------------");
            return this;
        }
    },
    event: {
        request: {
            intent: {
                slots: {
                    Answer: {
                        value: "third"
                    },
                    NumberOfQuestions: {
                        value: "14"
                    }
                }
            }
        }
    }
};