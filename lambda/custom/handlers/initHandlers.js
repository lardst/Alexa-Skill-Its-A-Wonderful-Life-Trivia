/*
 * In this handler we only need the LaunchRequest handler defined.
 * This will take us from a no state to the setup state.
*/

module.exports = {
    'LaunchRequest': function() {
        this.handler.state = Settings.handlerStates.setup;
        this.emitWithState('initializeGame', true, false);
    },
    'LaunchWithNumberOfQuestionsIntent': function() {
        this.handler.state = Settings.handlerStates.setup;
        this.emitWithState('initializeGame', true, false, true);
    },
    'Unhandled': Trivia.unhandled
};