var _strings = {
        play: {
            answer: {
                attaboy : [
                    "Umm, well... What can I say?",
                    "Hmm, apparently trivia is not your strong point. I am sure that you will get better at it over time.",
                    "Not too bad, but I am sure that you will do better next time.",
                    '<say-as interpret-as="interjection">bravo</say-as>! That was amazing! '
                ],
                influential : [
                    'Way to go!',
                    'Great job!',
                    'Perfect!',
                    'Good for you!',
                    "You're an inspiration!",
                    'You deserve a star!',
                    'Very good!',
                    'Well done!',
                    'Great answer!'
                ],
                jeers : [
                    '<prosody rate="85%"><say-as interpret-as="interjection">aw man</say-as>!</prosody>',
                    '<prosody rate="85%"><say-as interpret-as="interjection">d\'oh</say-as>!</prosody>',
                    '<prosody rate="85%">Awe, <say-as interpret-as="interjection">shucks</say-as>!</prosody>',
                    '<prosody rate="85%">Oh, <say-as interpret-as="interjection">darn</say-as>!</prosody>'
                ],
                responses: {
                    answer_unknown: "So sorry that you did not know that one.",
                    correct: "correct!",
                    incorrect: "incorrect.",
                    number_of_questions_correct : "You got %s out of %s questions correct.",
                    that_is_prefix : "That is",
                    the_correct_answer : "The correct answer is. %s. %s.",
                    the_last_question: "That was the last question.",
                    thank_you_for_playing: "Thank you for playing."
                }
            },
            ask: {
                question: "Question %s.",
                instructions : "Please answer with a number between 1 and %s.",
                play_again: "Would you like to play again?",
                repeat : {
                    instructions : "To repeat the last question, say, repeat.",
                    text : "I'll repeat the question."
                },
                start_over: "Are you sure that you want to stop this game and start a new one?",
            },
            start_over: "let's start the game over. I will ask you a new set of %s multiple choice questions.",
            play_again: "Okay, let's begin. I will ask you a new set of %s multiple choice questions.",
        },
        launch: {
            setup: {
                welcome_base: "Welcome to the " + `${Settings.gameName}` + ".",
                instructions: "Simply answer the questions with the number of the choice that you think is the correct answer.",
                i_will_ask: "I will ask you %s multiple choice trivia questions.",
                answer_example: "For example, if you believe that the answer to a question is the third choice, just say three, or even third.",
                before_we_can_begin: "Before we can begin,",
                how_many_questions: "How many questions would you like me to challenge you with? " + `${Settings.gameLengthOptions.JoinWith(', ', 'or ')}` + ".",
                i_need_to_know: "I need to know.",
                lets_begin: "Let's begin!",
                okay_lets_start_over: "Okay, let's start the game over.",
                invalid_numbers: "The number of questions you specified, %s, was invalid. Please specify one of the following number of questions. " + `${Settings.gameLengthOptions.JoinWith(', ', 'or ')}` + ".",
                repeat : {
                    text : "I'll repeat that."
                },
            }
        },
        shared: {
            okay: "Okay",
            pause : {
                short : '<break time="700ms"/>',
                medium : '<break time="1100ms"/>',
                long : '<break time="1500ms"/>'
            },
            thank_you: 'Thank you',
            ask: {
                stop: "Are you sure that you want to quit the game?",
            },
        }
    },
    map = {
        launch_without_options: `${_strings.launch.setup.welcome_base} ${_strings.launch.setup.i_will_ask} ${_strings.launch.setup.instructions} ${_strings.launch.setup.answer_example} ${_strings.shared.pause.short} ${_strings.launch.setup.before_we_can_begin} ${_strings.launch.setup.i_need_to_know} ${_strings.launch.setup.how_many_questions}`,
        launch_with_options: `${_strings.shared.okay} ${_strings.launch.setup.i_will_ask} ${_strings.shared.pause.short} ${_strings.launch.setup.lets_begin} ${_strings.shared.pause.short}`,
        launch_with_invalid_options: `${_strings.launch.setup.invalid_numbers}`,
        launch_without_options_reprompt: `${_strings.launch.setup.before_we_can_begin} ${_strings.launch.setup.i_need_to_know} ${_strings.launch.setup.how_many_questions}`,

        setup_number_of_questions: `${_strings.shared.thank_you}. ${_strings.launch.setup.i_will_ask}  ${_strings.launch.setup.lets_begin} ${_strings.shared.pause.short}`,
        setup_repeat_last_prompt: `${_strings.shared.okay}, ${_strings.launch.setup.repeat.text}`,
        setup_restart_setup: `${_strings.launch.setup.how_many_questions}`,
        setup_okay_lets_start_over: `${_strings.launch.setup.okay_lets_start_over}`,

        play_ask: `${_strings.play.ask.question}`,
        play_instructions: `${_strings.play.ask.instructions} ${_strings.play.ask.repeat.instructions}`,
        play_repeat_question: `${_strings.shared.okay}, ${_strings.play.ask.repeat.text} ${_strings.shared.pause.short}`,

        play_answer_correct: `${_strings.play.answer.responses.that_is_prefix} ${_strings.play.answer.responses.correct} ${_strings.play.answer.influential.Randomize()}`,
        play_answer_incorrect: `${_strings.play.answer.jeers.Randomize()} ${_strings.play.answer.responses.that_is_prefix} ${_strings.play.answer.responses.incorrect} ${_strings.play.answer.responses.the_correct_answer} ${_strings.shared.pause.short}`,
        play_answer_unknown: `${_strings.play.answer.responses.answer_unknown} ${_strings.play.answer.responses.the_correct_answer} ${_strings.shared.pause.short}`,
        play_start_over: `${_strings.play.start_over}`,
        play_again: `${_strings.play.play_again}`,
        play_again_ask: `${_strings.play.ask.play_again}`,
        play_start_over_ask: `${_strings.play.ask.start_over}`,

        end_last_question: `${_strings.play.answer.responses.the_last_question} ${_strings.play.answer.responses.number_of_questions_correct}`,
        end_thank_you_for_playing: `${_strings.play.answer.responses.thank_you_for_playing}`,
        end_attaboy: _strings.play.answer.attaboy,

        stop_request: `${_strings.shared.ask.stop}`,
        stop_confirmed: `${_strings.shared.okay} ${_strings.play.answer.responses.thank_you_for_playing}`,

        short_pause: `${_strings.shared.pause.short}`,
        okay: `${_strings.shared.okay}`,
    };

module.exports = map;