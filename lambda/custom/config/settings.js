module.exports = {
    "appID": process.env.ALEXA_APP_ID || true,
    "attributeDefaults": {
        "choiceCount": 0,
        "correctAnswersCount": 0,
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
    "enableCruxBasedScoringOfQuestions": process.env.ENABLE_CRUX_BASED_SCORING_OF_QUESTIONS || false,
    "gameLengthOptions": [7, 14, 21],
    "handlerStates": {
        "game"            : "GAME_STATE",
        "help"            : "HELP_STATE",
        "setup"           : "SETUP_STATE"
    },
    "smallIconURL": "https://api.amazonalexa.com/v0/skills/amzn1.ask.skill.6a834ad5-9c03-4461-9582-f079a7cd139b/images/eyJkIjoiWGtpRExmMEV2dVVyV2hYd0RxKzVPbUZ1NkdzMzkrbWxQQ1d0SXNRbTVmaTNkQ3Q5SEZJbnNtYTdJL3hESUVvZ205NUZWclRVQ1VlRkNjOWNOK0xJWWxJd2dlR1IwNURUSnpVL25KSzNLbHJCc1hvaDZzN1Y4bE00dU9BSWxXQlAiLCJpdiI6InNVcGNISXNSNUFxSjhTREFnZmlDSEE9PSIsInYiOjF9",
    "largeIconUri": "https://api.amazonalexa.com/v0/skills/amzn1.ask.skill.6a834ad5-9c03-4461-9582-f079a7cd139b/images/eyJkIjoiWW5YYjFWS1hQWVkwSGZMYUFveVAwTVBzUU5tWTlKOUo2SkpCTmV6RHdxdWtrQVRUSG12UTQ3d1loMmRQOXYyNWFkTStBcU4xT2VCQlFGU0luNHVOdnpwT2hvaGVyR2o1Yy9nSkcvZVRyQ3ppQjAyeDNQeEw4VG1HSlI0N1R0SmNERlY2U0J4azhZYktsbFZnTUlIbVZBPT0iLCJpdiI6Imo0dm5NTFFZa0YxRFBNU3pkbU1Hb0E9PSIsInYiOjF9"
}