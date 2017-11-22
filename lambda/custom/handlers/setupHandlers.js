module.exports = Alexa.CreateStateHandler(Settings.handlerStates.setup, {
    'initializeGame': Trivia.initialize,
    'NumberOfQuestionsIntent': Trivia.setupGame,
    'AnswerIntent': Trivia.setupGame,
    'AMAZON.YesIntent': Trivia.play,
    'AMAZON.NoIntent': Trivia.quit,
    'Unhandled': Trivia.help
});