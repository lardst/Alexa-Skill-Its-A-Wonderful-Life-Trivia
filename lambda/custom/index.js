/**
 * @author Lawrence Burnett <lawrence.burnett@outlook.com>
 * @copyright 2017
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version 0.1
 */

'use strict';

/*********************************************************************************************************************/

var Alexa = require('alexa-sdk'),
    AlexaD = require('./alexa-dummy'),
    Trivia = require('./engine/trivia'),
    InitHandlers,
    SetupHandlers,
    GameHandlers,
    HelpHandlers;

/*********************************************************************************************************************/

require('./support');
global.Alexa = Alexa;
global.Log = require('./log');
global.Trivia = Trivia;
global.Settings = require('./config/settings');
global.Strings = require('./strings');

/*********************************************************************************************************************/

InitHandlers = require('./handlers/initHandlers');
SetupHandlers = require('./handlers/setupHandlers');
GameHandlers = require('./handlers/gameHandlers');
HelpHandlers = require('./handlers/helpHandlers');

/*********************************************************************************************************************/

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(HelpHandlers, InitHandlers, SetupHandlers, GameHandlers);
    alexa.appId = Settings.appID;
    alexa.execute();
};

Trivia.initialize.call(AlexaD, true);
Trivia.help.call(AlexaD);