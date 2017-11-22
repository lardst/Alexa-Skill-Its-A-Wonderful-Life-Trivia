module.exports = {
    "appID": process.env.ALEXA_APP_ID || true,
    "attributeDefaults": {
        "choiceCount": 0,
        "correctAnswerCopy": '',
        "correctAnswerSlotNumber": 0,
        "currentQuestionSlotNumber": -1, // Always start with a -1 so that it will be incremented to 0 at game start.
        "isRepeat": false, // Players are allowed 1 addition question asking.
        "newGame": false,
        "numberOfQuestions": 7,
        "playerAnswer": 0,
        "prompt": '',
        "questionCrux": 2, // This is the default. 1 is easy, 2 is medium, 3 is hard.
        "questionCopy": '',
        "reprompt": '',
        "score": 0,
        "selectedQuestionIndexes": [], // This holds the randomly selected question indexes.
        "startOver": false
    },
    "cruxScores": [50, 100, 150], // easy, medium, hard
    "enableCruxBasedScoringOfQuestions": process.env.ENABLE_CRUX_BASED_SCORING_OF_QUESTIONS || true,
    "gameLengthOptions": [7, 14, 21],
    "handlerStates": {
        "game"            : "_GAME_STATE",
        "help"            : "_HELP_STATE",
        "setup"           : "_SETUP_STATE"
    }
}