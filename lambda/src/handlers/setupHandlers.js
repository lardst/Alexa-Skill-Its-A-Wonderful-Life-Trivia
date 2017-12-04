module.exports = Alexa.CreateStateHandler(Settings.handlerStates.setup, {
    'AMAZON.HelpIntent' : function () { Trivia.help(this); },
    'AMAZON.RepeatIntent': function () { Trivia.repeat(this); },
    'AMAZON.StartOverIntent': function () { Trivia.startOver(this); },
    'AMAZON.StopIntent': function () { Trivia.stop(this); },
    'AMAZON.YesIntent': function () { Trivia.startOverConfirmed(this); },
    'AMAZON.NoIntent': function () { Trivia.endSession(this); },
    'NumberIntent': function () { Trivia.start(this); },
    'Unhandled': function () { Trivia.unhandled(this); }
});