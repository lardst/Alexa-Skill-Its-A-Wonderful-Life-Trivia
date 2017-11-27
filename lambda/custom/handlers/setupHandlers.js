module.exports = Alexa.CreateStateHandler(Settings.handlerStates.setup, {
    'initializeGame': Trivia.initialize,
    'NumberOfQuestionsIntent': Trivia.setupGame,
    'AnswerIntent': Trivia.setupGame,
    'AMAZON.HelpIntent' : Trivia.help,
    'AMAZON.YesIntent': Trivia.play,
    'AMAZON.NoIntent': Trivia.quit,
    'Unhandled': Trivia.help
});