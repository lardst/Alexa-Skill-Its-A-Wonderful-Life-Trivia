let wordsToNumbers = require('rocket-numbers').wordToNumber;

class Trivia {
    constructor () {
        this.alexa = null;
        this.questions = require('../questions/en-US');
        this.randomQuestions = [];
    }

    get attaboy () {
        var _attributes = this.attributes,
            _attaboys = Strings('end_attaboy'),
            _correctAnswerCount = _attributes.correctAnswerCount,
            _numberOfQuestions = _attributes.numberOfQuestions,
            _percent = Math.round((_correctAnswerCount / _numberOfQuestions) * 100),
            _segment = 100 / 4,
            _counter = 0,
            _index = 0;
        
        while(_counter < 100) {
            _counter += _segment;
            if (_percent <= _counter) {
                break;
            }
            _index++;
        }
        return _attaboys[_index];
    }

    get attributes () {
        return this.alexa.attributes;
    }

    set attributes (_value) {
        var attributes = this.alexa.attributes,
            err;
        if (typeof(_value) === 'object') {
            Object.assign(attributes, _value);
        } else {
            err = new Error(new Exception('invalidJSON').toString());
            Log.error(err.stack);
        }
    }

    get state () {
        return this.alexa.handler.state;
    }

    set state (_value) {
        this.alexa.handler.state = _value;
    }

    answerNotKnown (_alexa) {
        var _attributes = _alexa.attributes,
            _currentQuestionIndex = _attributes.currentQuestionIndex,
            _questionPlaceholder = this.randomQuestions[_currentQuestionIndex],
            _answerCopy = _questionPlaceholder.answerCopy,
            _choices = _questionPlaceholder.choices,
            _correctAnswer = _questionPlaceholder.answer,
            _correctAnswerIndex = _correctAnswer - 1,
            _isLastQuestion = _alexa.attributes.isLastQuestion,
            _prompt;
        
        this.alexa = _alexa;

        _prompt = Strings('play_answer_unknown').Format(
            _correctAnswer,
            _choices[_correctAnswerIndex]
        ).Concat(
            _answerCopy,
            Strings('short_pause')
        );
        
        if (_isLastQuestion) {
            this.endGame(_prompt);
        } else {
            this.play(_prompt);
        }
    }

    checkAnswer (_alexa) {
        var _attributes = _alexa.attributes,
            _currentQuestionIndex = _attributes.currentQuestionIndex,
            _questionPlaceholder = this.randomQuestions[_currentQuestionIndex],
            _answerCopy = _questionPlaceholder.answerCopy,
            _choices = _questionPlaceholder.choices,
            _choicesCount = _choices.length,
            _correctAnswer = _questionPlaceholder.answer,
            _correctAnswerIndex = _correctAnswer - 1,
            _correctAnswerCount = _attributes.correctAnswerCount,
            _isLastQuestion = _alexa.attributes.isLastQuestion,
            _answer,
            _prompt;

        this.alexa = _alexa;

        _answer = wordsToNumbers(this.intent('Number', 0));

        if (_answer.isInRange(1, _choicesCount)) {
            if (_answer === _correctAnswer) {
                _prompt = Strings('play_answer_correct').Concat(
                    _answerCopy,
                    Strings('short_pause')
                );
                _attributes.correctAnswerCount = ++_correctAnswerCount;
            } else {
                _prompt = Strings('play_answer_incorrect').Format(
                    _correctAnswer,
                    _choices[_correctAnswerIndex]
                ).Concat(
                    _answerCopy,
                    Strings('short_pause')
                );
            }
        }
        
        _attributes.isRepeatQuestion = false;

        this.attributes = _attributes;

        if (_isLastQuestion) {
            this.endGame(_prompt);
        } else {
            this.play(_prompt);
        }
    }

    endGame (_prompt) {
        var _attributes = this.attributes,
            _correctAnswerCount = _attributes.correctAnswerCount,
            _numberOfQuestions = _attributes.numberOfQuestions,
            _prompt,
            _reprompt = Strings('play_again_ask');

        // If the player replies with "Yes", then we need to call the start method.
        // A no answer ends the session.

        this.state = Settings.handlerStates.setup;

        _prompt = Strings('end_last_question').Format(
            _correctAnswerCount,
            _numberOfQuestions
        ).Concat(
            this.attaboy,
            Strings('short_pause'),
            Strings('end_thank_you_for_playing'),
            _reprompt
        );

        this.send(_prompt, _reprompt);
    }

    endSession (_alexa) {
        _alexa.emit(':tell', Strings('stop'));
    }

    help (_alexa) {
        this.alexa = _alexa;
    }

    intent (_key, _default) {
        var _intent,
            _value;

        try {
            _intent = this.alexa.event.request.intent,
            _value = typeof(_intent.slots[_key]) !== 'undefined' ?
                _intent.slots[_key].value :
                (typeof(_default) !== 'undefined' ? _default : '');
        } catch (e) {
            console.log(e);
            _value = typeof(_default) !== 'undefined' ? _default : '';
        }

        return _value;
    }

    keepPlaying () {

    }

    play (_prompt) {
        var _attributes = this.attributes,
            _currentQuestionIndex = _attributes.currentQuestionIndex,
            _currentState = this.alexa.handler.state,
            _isRepeatQuestion = _attributes.isRepeatQuestion,
            _numberOfQuestions = _attributes.numberOfQuestions,
            _isLastQuestion = false,
            _questionPlaceholder,
            _reprompt;

        if (!_isRepeatQuestion) {
            ++_currentQuestionIndex;
            _attributes.currentQuestionIndex = _currentQuestionIndex;
        }

        _isLastQuestion = _currentQuestionIndex === (this.randomQuestions.length - 1);
        _attributes.isLastQuestion = _isLastQuestion;

        _questionPlaceholder = this.randomQuestions[_currentQuestionIndex];

        _prompt = (_prompt ? _prompt : '').Concat(
            Strings('play_ask').Format((_currentQuestionIndex + 1).toString()),
            _questionPlaceholder.question,
            _questionPlaceholder.choices.JoinWith(', ', 'or ', true) + '.'
        );

        _reprompt = Strings('play_instructions').Format(
            _questionPlaceholder.choices.length.toString()
        );

        _attributes.question = _questionPlaceholder;
        _attributes.numberOfChoices = _questionPlaceholder.choices.length;

        this.attributes = _attributes;
        this.send(_prompt, _reprompt);
    }

    repeat (_alexa) {
        var _currentState = _alexa.handler.state,
            _prompt;

        this.alexa = _alexa;

        switch (_currentState) {
            case 'GAME_STATE': // If the state is game, we need to repeat the question.
                this.attributes = {isRepeatQuestion: true};
                _prompt = Strings('play_repeat_question');
                this.play(_prompt);
                break;
            case 'GAME_END_STATE': // If the state is end, TBD

                break;
            case 'SETUP_STATE': // If the state is empty or setup, we need to repeat the setup questions.
            default:
                _prompt = Strings('setup_repeat_last_prompt').Concat(
                    this.attributes.prompt
                );
                this.send(_prompt);
        }
    }

    send (_prompt, _reprompt) {
        this.alexa.response.speak(_prompt.Clean());
        if (_reprompt) {
            this.alexa.response.listen(_reprompt.Clean());
        }

        this.attributes = {
            prompt: _prompt,
            reprompt: _reprompt
        };

        this.alexa.emit(':responseReady');
    }

    shuffleQuestions (max) {
        var shuffledItems = [],
            tracker = [],
            itemCount = this.questions.length,
            rand,
            index;

        itemCount = max > itemCount? max : itemCount;

        for (index = 0; index < max; index++) {
            rand = getUniqueRandomNumber(0, itemCount - 1, tracker);
            tracker.push(rand);
            shuffledItems.push(this.questions[rand]);
        }

        return shuffledItems;
    }

    /*
        * This is where the Skill is always launched from.
        * In here, we check the current handler state and branch appropriately.
    */
    start (_alexa) {
        var _attributes = Settings.attributes,
            _currentState = _alexa.handler.state,
            _defaultAttributes = Settings.attributeDefaults,
            _newGame = Empty(_currentState),
            _numberOfQuestions = 0,
            _askedNumberOfQuestions = false,
            _restartGame = _alexa.attributes.restartSetup,
            _prompt,
            _reprompt;

        this.alexa = _alexa;

        switch (_currentState) {
            case 'SETUP_STATE': // Returning from asking for number of questions.
                // Get the number of questions from the intent.
                _numberOfQuestions = wordsToNumbers(this.intent('Number', -1));
                // Add the number of question to the default attributes copy.
                _defaultAttributes.numberOfQuestions = _numberOfQuestions;
                // Set the Alexa attributes to the default + number of questions JSON object.
                this.attributes = _defaultAttributes;

                // Validate the number of questions against the valid number list in settings.
                if (Settings.gameLengthOptions.indexOf(_numberOfQuestions) > -1) {
                    _prompt = Strings('launch_with_options').Format(_numberOfQuestions.toString());
                    // Change the state to game
                    this.state = Settings.handlerStates.game;
                    // Get the random list of questions.
                    this.randomQuestions = this.shuffleQuestions(_numberOfQuestions);
                    // Play the game.
                    this.play(_prompt);
                } else {
                    // The number in the intent is invalid, prompt the player to try again.
                    if (_restartGame) {
                        _prompt = Strings('setup_okay_lets_start_over').Concat(Strings('setup_restart_setup'));
                        _reprompt = Strings('setup_restart_setup');
                    } else {
                        _prompt = Strings('launch_with_invalid_options').Format('', _numberOfQuestions);
                        _reprompt = Strings('launch_without_options_reprompt');
                    }
                    this.send(_prompt, _reprompt);
                }
                break;
            case 'GAME_STATE': // We are in a game but there is a request to start over.
            case 'GAME_END_STATE': // The game has ended but the player requested to play again.
                // We need to prompt the player without the welcome message.
                
                break;
            default: // This is a new game, we need to ask for number of questions.
                // Set the default attributes.
                this.attributes = _defaultAttributes;
                // Prompt the player.
                _prompt = Strings('launch_without_options').Format('');
                _reprompt = Strings('launch_without_options_reprompt');
                // Set the state to setup.
                this.state = Settings.handlerStates.setup;
                this.send(_prompt, _reprompt);
        }
    }

    startOver (_alexa) {
        var _state = this.state,
            _prompt = Strings('okay').Concat(_alexa.attributes.reprompt),
            _reprompt = _alexa.attributes.reprompt;

        this.alexa = _alexa;

        this.state = Settings.handlerStates.setup;

        _prompt = Strings('play_start_over_ask');

        this.send(_prompt, _prompt);
    }

    startOverConfirmed (_alexa) {
        var _state = this.state;
        this.alexa = _alexa;

        this.state = Settings.handlerStates.setup
        this.attributes = {restartSetup: true}

        this.start(_alexa);
    }

    stop (_alexa) {
        var _prompt = Strings('stop_request');
        this.alexa = _alexa;
        this.send(_prompt, _prompt);
    }

    unhandled (_alexa) {
        var _prompt = _alexa.attributes.reprompt,
            _reprompt = _alexa.attributes.reprompt
        this.alexa = _alexa;
        this.send(_prompt, _prompt);
    }
}

module.exports = new Trivia();