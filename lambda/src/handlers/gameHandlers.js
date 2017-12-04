
module.exports = Alexa.CreateStateHandler(Settings.handlerStates.game, {
    'AMAZON.HelpIntent' : function () { Trivia.help(this); },
    'AMAZON.NoIntent': function () { Trivia.endSession(this); },
    'AMAZON.RepeatIntent': function () { Trivia.repeat(this); },
    'AMAZON.StartOverIntent': function () { Trivia.startOver(this); },
    'AMAZON.StopIntent': function () { Trivia.stop(this); },
    'AMAZON.YesIntent': function () { Trivia.startOverConfirmed(this); },
    'AnswerUnknownIntent': function () { Trivia.answerNotKnown(this); },
    'NumberIntent': function () { Trivia.checkAnswer(this); },
    'SessionEndedRequest': function () { Trivia.endSession(this); },
    'Unhandled': function () { Trivia.unhandled(this); }
});
