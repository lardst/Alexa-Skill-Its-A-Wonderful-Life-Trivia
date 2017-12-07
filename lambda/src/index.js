/**
 * @author Lawrence Burnett <lawrence.burnett@outlook.com>
 * @copyright 2017
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version 2.0
 */

/*********************************************************************************************************************/

require('./tools/site');
global.Exception = require('./exceptions/exceptions');
global.Settings = require('./settings/settings');
global.Strings = require('./tools/strings');
global.Log = require('./tools/log');
global.Trivia = require('./engine/trivia');

/*********************************************************************************************************************/

var Alexa = global.Alexa = require("alexa-sdk"),
    GameHandlers = require('./handlers/gameHandlers'),
    InitHandlers = require('./handlers/initHandlers'),
    SetupHandlers = require('./handlers/setupHandlers'),
    AlexaTest = Settings.isDevelopment ? require('./testAPI/alexa-object') : null;

/*********************************************************************************************************************/

exports.handler = function(event, context) {
    var alexa;
    if (Settings.appID && event.session.application.applicationId === Settings.appID) {
        alexa = Alexa.handler(event, context);
        alexa.registerHandlers(InitHandlers, SetupHandlers, GameHandlers);
        alexa.appId = Settings.appID;
        alexa.execute();
    } else {
        throw new Exception('invalidAppID');
    }
};

/*********************************************************************************************************************/

if (Settings.isDevelopment) {
    console.log("");
    console.log("");
    Trivia.start(AlexaTest);
    Trivia.repeat(AlexaTest);

    AlexaTest.handler.state = 'SETUP_STATE';
    AlexaTest.event.request.intent.slots.Number.value = 20;

    Trivia.start(AlexaTest);
    Trivia.repeat(AlexaTest);

    AlexaTest.handler.state = 'SETUP_STATE';
    AlexaTest.event.request.intent.slots.Number.value = 7;

    Trivia.start(AlexaTest);
    Trivia.repeat(AlexaTest);

    AlexaTest.handler.state = 'GAME_STATE';
    AlexaTest.event.request.intent.slots.Number.value = 3;
    Trivia.checkAnswer(AlexaTest);


    AlexaTest.handler.state = 'GAME_STATE';
    Trivia.answerNotKnown(AlexaTest);


    AlexaTest.handler.state = 'GAME_STATE';
    AlexaTest.attributes.correctAnswerCount = 1;
    Trivia.endGame(AlexaTest);

    AlexaTest.handler.state = 'GAME_STATE';
    AlexaTest.attributes.correctAnswerCount = 3;
    Trivia.endGame(AlexaTest);

    AlexaTest.handler.state = 'GAME_STATE';
    AlexaTest.attributes.correctAnswerCount = 5;
    Trivia.endGame(AlexaTest);

    AlexaTest.handler.state = 'GAME_STATE';
    AlexaTest.attributes.correctAnswerCount = 7;
    Trivia.endGame(AlexaTest);

    AlexaTest.handler.state = 'GAME_STATE';
    Trivia.startOver(AlexaTest);

    AlexaTest.handler.state = 'GAME_STATE';
    Trivia.stop(AlexaTest);
}

/*********************************************************************************************************************/