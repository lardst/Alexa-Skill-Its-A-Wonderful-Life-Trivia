module.exports = Alexa.CreateStateHandler(Settings.handlerStates.game, {
    'AnswerIntent': function () {Trivia.answer.call(this, false);},
    'NumberOfQuestionsIntent': function () {Trivia.answer.call(this, false);},
    'AnswerUnknownIntent': function () {Trivia.answer.call(this, true);},
    'ChangeNumberOfQuestionsIntent': Trivia.changeNumberOfQuestions,
    'AMAZON.CancelIntent': Trivia.cancel,
    'AMAZON.NoIntent': Trivia.quit,
    'AMAZON.RepeatIntent': Trivia.repeat,
    'AMAZON.StartOverIntent': Trivia.startOver,
    'AMAZON.StopIntent': Trivia.stop,
    'AMAZON.YesIntent': function () {Trivia.initialize.call(this, true, true);},
    'SessionEndedRequest': Trivia.end,
    'Unhandled': Trivia.unhandled
});