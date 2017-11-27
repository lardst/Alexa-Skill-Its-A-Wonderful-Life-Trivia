var Questions = require('../content/questions'),
    ordinalToNumber = require('words-to-numbers').wordsToNumbers,
    trivia = {
        'answer': function (isAnswerUnknown) {
            var playerAnswer = -1,
                isPlayerAnswerCorrect = false,
                choiceCount = trivia.getAttribute.call(this, 'choiceCount'),
                correctAnswersCount = trivia.getAttribute.call(this, 'correctAnswersCount'),
                correctAnswerCopy = trivia.getAttribute.call(this, 'correctAnswerCopy'),
                correctAnswerSlotNumber = trivia.getAttribute.call(this, 'correctAnswerSlotNumber'),
                currentQuestionSlotNumber = trivia.getAttribute.call(this, 'currentQuestionSlotNumber'),
                isRepeatQuestion = false;
                numberOfQuestions = trivia.getAttribute.call(this, 'numberOfQuestions'),
                prompt = '',
                questionIndex = trivia.getAttribute.call(this, 'questionIndex'),
                questionCrux = trivia.getAttribute.call(this, 'questionCrux'),
                questionObject = Questions[questionIndex];
                score = trivia.getAttribute.call(this, 'score');

            Log.write("Is the answer not known? " + isAnswerUnknown.toString());

            if (!isAnswerUnknown) {
                playerAnswer = parseInt(ordinalToNumber(trivia.getIntent.call(this, 'Number', -1)), 10);
            }

            if (playerAnswer.isInRange(1, choiceCount)) {
                isPlayerAnswerCorrect = correctAnswerSlotNumber === playerAnswer;
                prompt = Strings('game.answers.reply.prefix');

                if (isPlayerAnswerCorrect) {
                    score = trivia.calculateScore(score, questionCrux);
                    ++correctAnswersCount;
                    prompt += Strings('game.answers.reply.correct.text').Format(
                        Strings('game.answers.reply.correct.influential').Randomize()
                    );
                    prompt += correctAnswerCopy;
                } else {
                    prompt += Strings('game.answers.reply.incorrect.text').Concat(
                        Strings('game.answers.reply.incorrect.reply').Format(
                            correctAnswerSlotNumber,
                            correctAnswerCopy
                        ),
                        questionObject.choices[correctAnswerSlotNumber],
                        Strings('global.pause.short')
                    );
                }

                prompt += Strings('global.pause.short');

                trivia.setAttributes.call(this, {
                    'correctAnswersCount': correctAnswersCount,
                    'isRepeat': false,
                    'playerAnswer': playerAnswer,
                    'score': score
                });
            } else if (isAnswerUnknown) {
                prompt = Strings('game.answers.reply.unknown.text').Concat(
                    Strings('game.answers.reply.incorrect.reply').Format(
                        correctAnswerSlotNumber,
                        correctAnswerCopy
                    )
                );
            } else {
                prompt = Strings('help.state.GAME_STATE.instructions').Format(choiceCount).Concat(
                    Strings('global.string.space'),
                    Strings('help.state.GAME_STATE.repeat.instructions'),
                    Strings('global.pause.short')
                );
                isRepeatQuestion = true;
            }

            if (currentQuestionSlotNumber < --numberOfQuestions) {
                trivia.ask.call(this, isRepeatQuestion, prompt);
            } else {
                trivia.end.call(this, prompt);
            }
        },
        'ask': function (isRepeatQuestion, _prompt) {
            var prompt,
                reprompt,
                currentQuestionSlotNumber = trivia.getAttribute.call(this, 'currentQuestionSlotNumber'),
                selectedQuestionIndexes = trivia.getAttribute.call(this, 'selectedQuestionIndexes'),
                questionObject,
                choiceCount,
                correctAnswerCopy,
                correctAnswerSlotNumber,
                questionCrux,
                questionCopy,
                questionIndex;

            if (!isRepeatQuestion) {
                ++currentQuestionSlotNumber;
            }

            questionIndex = selectedQuestionIndexes[currentQuestionSlotNumber];

            questionObject = Questions[questionIndex];

            _prompt = _prompt || Strings('global.string.empty');
            prompt = _prompt.Concat(
                Strings('global.string.space'),
                Strings('game.question').Format(
                    (currentQuestionSlotNumber + 1).toString(),
                    questionObject.question
                ),
                questionObject.choices.JoinWith(', ', 'or ', true)
            );

            trivia.setAttributes.call(
                this,
                {
                    'choiceCount': questionObject.choices.length,
                    'correctAnswerCopy': questionObject.answerCopy,
                    'correctAnswerSlotNumber': questionObject.answer,
                    'currentQuestionSlotNumber': currentQuestionSlotNumber,
                    'isRepeat': isRepeatQuestion,
                    'questionCrux': questionObject.crux,
                    'questionCopy': questionObject.question,
                    'questionIndex': questionIndex
                }
            );

            reprompt = Strings('help.state.GAME_STATE.instructions').Format(questionObject.length).Concat(
                Strings('global.string.space'),
                Strings('help.state.GAME_STATE.repeat.instructions')
            )

            trivia.sendResponse.call(this, prompt, reprompt);
        },
        'calculateScore': function (score, crux) {
            var useCrux = Settings.enableCruxBasedScoringOfQuestions;

            score += useCrux ? Settings.cruxScores[crux] : 1;
            return score;
        },
        'cancel': function () {

        },
        'changeNumberOfQuestions': function () {

        },
        'end': function (_prompt) {
            var score = trivia.getAttribute.call(this, 'score'),
                correctAnswersCount = trivia.getAttribute.call(this, 'correctAnswersCount'),
                numberOfQuestions = trivia.getAttribute.call(this, 'numberOfQuestions'),
                percent = Math.round((correctAnswersCount / numberOfQuestions) * 100),
                attaboyIndex = trivia.getAttaboyIndex(percent),
                attaboy = Strings('game.answers.attaboy')[attaboyIndex],
                prompt,
                useCrux = Settings.enableCruxBasedScoringOfQuestions;;

            prompt = _prompt || Strings('global.string.empty');
            prompt += useCrux ?
                Strings('game.end.crux').Format(
                    correctAnswersCount,
                    numberOfQuestions,
                    score,
                    attaboy
                ) : 
                Strings('game.end.text').Format(
                    correctAnswersCount,
                    numberOfQuestions,
                    attaboy
                );
            trivia.sendResponse.call(this, prompt);
        },
        'getAttaboyIndex': function (percent) {
            var segment = 100 / 4,
                counter = 0,
                index = 0;
            
            while(counter < 100) {
                counter += segment;
                if (percent <= counter) {
                    break;
                }
                index++;
            }
            return index;
        },
        'getAttribute': function (attributeName) {
            var attributes = this.attributes;
            return typeof(attributes[attributeName]) !== 'undefined' ? attributes[attributeName] : '';
        },
        'getIntent': function (intentKey, defaultValue) {
            var intent = this.event.request.intent,
                intentValue = typeof(intent.slots[intentKey]) !== 'undefined' ?
                    intent.slots[intentKey].value :
                    (defaultValue ? defaultValue : '');

            return intentValue;
        },
        'help': function () {
            var state = Empty(this.handler.state, true, 'default'),
                numberOfQuestions,
                helpCopyObject = Strings('help.state')[state],
                prompt = helpCopyObject.getKeys('instructions', Strings('global.pause.short'));

            if (state === Settings.handlerStates.game) {
                numberOfQuestions = trivia.getAttribute.call(this, 'numberOfQuestions');
                prompt = prompt.Format(numberOfQuestions);
            }

            trivia.sendResponse.call(this, prompt.Clean().Capitalize());
        },
        'initialize': function (isNewGame, isStartOver, hasPlayerOptions = false) {
            var prompt,
                reprompt,
                numberOfQuestions = trivia.getAttribute.call(this, 'numberOfQuestions', 0),
                skipNumberOfQuestionsPrompt = false;

            // Initialize the Alexa attributes with the default attributes in settings.
            trivia.setAttributes.call(this);

            trivia.setAttributes.call(this, {
                "newGame": isNewGame,
                "startOver": isStartOver
            });

            reprompt = Strings('launch.beforeWeCanBegin').Format(
                Strings('help.state.SETUP_STATE.instructions').Format(
                    Settings.gameLengthOptions.JoinWith(', ', 'or ')
                )
            );

            this.response.card({
                type: "Standard",
                title: "Strings('global.game.name')", // this is not required for type Simple or Standard
                text: Strings('global.game.card.text'),
                image: {
                    smallImageUrl: Settings.smallImageUrl,
                    largeImageUrl: Settings.largeImageUrl
                }
            });

            if (hasPlayerOptions) {
                numberOfQuestions = trivia.getIntent.call(this, 'Number', 7);
                trivia.setAttributes.call(this, {'numberOfQuestions': numberOfQuestions});
                prompt = Strings('launch.welcome').Format(
                    Strings('global.game.name'),
                    Strings('launch.iWillAsk').Format(numberOfQuestions.toString()),
                    Strings('help.state.default.instructions'),
                    ''
                );
                skipNumberOfQuestionsPrompt = true;
            } else if (isNewGame && !isStartOver) {
                prompt = Strings('launch.welcome').Format(
                    Strings('global.game.name'),
                    Strings('launch.iWillAsk').Format(''),
                    Strings('help.state.default.instructions'),
                    reprompt
                ).Clean();
            } else if (isNewGame && isStartOver) {
                prompt = Strings('game.play.again').Format(Strings('global.pause.short')).Concat(
                    reprompt
                );
            } else {
                prompt = Strings('game.start.over').Format(numberOfQuestions);
                reprompt = prompt;
                skipNumberOfQuestionsPrompt = true;
            }

            if (skipNumberOfQuestionsPrompt) {
                trivia.play.call(this, prompt.Clean());
            } else {
                trivia.sendResponse.call(this, prompt.Clean(), reprompt.Clean());
            }
            
        },
        'play': function (_prompt) {
            var numberOfQuestions = trivia.getAttribute.call(this, 'numberOfQuestions'),
                selectedQuestionIndexes = trivia.randomizeQuestions(Questions.length, numberOfQuestions),
                prompt;

            prompt = (_prompt ? _prompt : '').Concat(
                ' ',
                Strings('game.letsBegin'),
                Strings('global.pause.short')
            ).Clean();

            trivia.setAttributes.call(this, {
                "selectedQuestionIndexes": selectedQuestionIndexes
            });

            this.handler.state = Settings.handlerStates.game;
            trivia.ask.call(this, false, prompt);
        },
        'quit': function () {

        },
        'randomizeQuestions': function (totalQuestionCount, limit) {
            var returnArray = [],
                rand,
                j = 0;

            totalQuestionCount = limit > totalQuestionCount? limit : totalQuestionCount;
    
            while (j < limit) {
                rand = getUniqueRandomNumber(0, totalQuestionCount - 1, returnArray);
                returnArray.push(rand);
                ++j;
            }
            return returnArray;
        },
        'repeat': function (_prompt) {
            var isRepeat = trivia.getAttribute.call(this, 'isRepeat'),
                prompt = _prompt ? _prompt : Strings('global.words.interjection.okay').Concat(
                    Strings('global.punctuation.period'),
                    Strings('game.repeat.question')
                ).Capitalize();

            Object.assign(this.attributes, {
                "isRepeat": true,
            });

            trivia.ask.call(this, true, prompt.Clean());
        },
        'sendResponse': function (prompt, reprompt, endSession) {
            this.response.speak(prompt);
            if (reprompt) {
                this.response.listen(reprompt);
            }
            if (endSession) {
                this.emit(':tell');
            } else {
                this.emit(':responseReady');
            }
            

            trivia.setAttributes.call(this, {
                "prompt": prompt,
                "reprompt": reprompt
            });
        },
        'setupGame': function () {
            var prompt = '',
                reprompt,
                intentValue = trivia.getIntent.call(this, 'Number', 7),
                numberOfQuestions = parseInt(ordinalToNumber(intentValue), 10);

            if (Settings.gameLengthOptions.indexOf(numberOfQuestions) > -1) {
                prompt = Strings('global.thankYou').Concat(
                    Strings('global.punctuation.period'),
                    Strings('launch.iWillAsk').Format(numberOfQuestions.toString()),
                    Strings('global.pause.short')
                ).Clean();

                trivia.setAttributes.call(this, {'numberOfQuestions': numberOfQuestions});
                trivia.play.call(this, prompt);
            } else {
                reprompt = Strings('launch.beforeWeCanBeginError').Format(
                    Settings.gameLengthOptions.JoinWith(', ', 'or ')
                ).Clean();
                prompt = reprompt;
                trivia.sendResponse.call(this, prompt, reprompt);
            }
        },
        /**
         * Assigns JSON key/value pairs to the Alexa attributes.
         * @param {Object} newAttributeValues - A valid JSON object or null. If null, the default attributes are used.
         */
        'setAttributes': function (newAttributeValues) {
            var attributeKeyValues = newAttributeValues || Settings.attributeDefaults;
            Object.assign(this.attributes, attributeKeyValues);
        },
        'startOver': function () {

        },
        'stop': function () {

        },
        'unhandled': function () {
            trivia.sendResponse.call(this, 'Unhandled exception.');
        }
    };

module.exports = trivia;