module.exports = {
    appID: process.env.ALEXA_APP_ID || true,
    isDevelopment: process.env.NODE_ENV === 'development' ? true : false,
    attributeDefaults: {
        correctAnswerCount: 0,
        currentQuestionIndex: -1,
        isLastQuestion: false,
        isRepeatQuestion: false,
        numberOfChoices: 0,
        numberOfQuestions: 0,
        prompt: '',
        question: null,
        reprompt: '',
        score: 0
    },
    cruxScores: [50, 100, 150], // easy, medium, hard
    enableCruxBasedScoringOfQuestions: process.env.ENABLE_CRUX_BASED_SCORING_OF_QUESTIONS || false,
    gameLengthOptions: [7, 14, 21],
    gameName: "It's a Wonderful Life Trivia Game",
    handlerStates: {
        end             : "GAME_END_STATE",
        game            : "GAME_STATE",
        help            : "HELP_STATE",
        setup           : "SETUP_STATE"
    },
    cardType: typeof(process.env.CARD_SMALL_IMAGE_URL) !== 'undefined' ? "Standard" : "Simple",
    smallIconUri: "https://s3.amazonaws.com/ihavenoworkshop/iawftg-small.png",
    largeIconUri: "https://s3.amazonaws.com/ihavenoworkshop/iawftg-large.png"
}