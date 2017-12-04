/*
 * In this handler we only need the LaunchRequest handler defined.
 * This will take us from a no state to the setup state.
*/

module.exports = {
    'LaunchRequest': function () { Trivia.start(this); },
    'AMAZON.StartOverIntent': function () { Trivia.startOver(this); },
    'Unhandled': function () { Trivia.unhandled(this); }
};