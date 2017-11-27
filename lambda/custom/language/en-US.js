module.exports = {
    "game": {
        "answers": {
            "attaboy": [
                "Umm, well... What can I say?",
                "Hmm, apparently trivia is not your strong point. I am sure that you will get better at it over time.",
                "Not too bad, but I am sure that you will do better next time.",
                '<say-as interpret-as="interjection">bravo</say-as>! That was amazing! '
            ],
            "reply": {
                "correct": {
                    "text": "correct. %s. ",
                    "influential": [
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
                },
                "incorrect": {
                    "text": "incorrect. ",
                    "prefix": [
                        '<prosody rate="85%"><say-as interpret-as="interjection">aw man</say-as>!</prosody> ',
                        '<prosody rate="85%"><say-as interpret-as="interjection">d\'oh</say-as>!</prosody> ',
                        '<prosody rate="85%">Awe, <say-as interpret-as="interjection">shucks</say-as>!</prosody> ',
                        '<prosody rate="85%">Oh, <say-as interpret-as="interjection">darn</say-as>!</prosody> '
                    ],
                    "reply": "The correct answer is. %s. %s "
                },
                "unknown": {
                    "text": "Too bad you did not know that one. "
                },
                "prefix": "That is ",
            }
        },
        "end": {
            'text': "That was the last question. You got %s out of %s questions correct, %s. Thank you for playing!",
            'crux': "That was the last question. You got %s out of %s questions correct giving you a score of %s, %s. Thank you for playing!"
        },
        "letsBegin": "Let's begin. ",
        "play": {
            "again": "Okay, let me reset the game. %s I will ask you a new set of multiple choice questions."
        },
        "question": "Question %s. %s ",
        "repeat": {
            "question": "I'll repeat the question. "
        },
        "start": {
            "over": "Okay, let's start the game over. I will ask you a new set of %s multiple choice questions. "
        }
    },
    "global": {
        "game": {
            "name": "It's a Wonderful Life Trivia Game",
            "card": {
                "text": "You tested your It's A Wonderful Life trivia knowledge."
            }
        },
        "pause": {
            "short": '<break time="700ms"/>',
            "medium": '<break time="1100ms"/>',
            "long": '<break time="1500ms"/>'
        },
        "punctuation": {
            "period": ". ",
            "comma": ", "
        },
        "string": {
            "empty": "",
            "space": " "
        },
        "thankYou": "Thank you",
        "words": {
            "conjunctions": {
                "and": " and ",
                "or": " or "
            },
            "interjections": {
                "hey": " hey ",
                "okay": " okay "
            }
        }
    },
    "help": {
        "state": {
            "GAME_STATE": {
                "instructions": "Please answer with a number between 1 and %s. ",
                "repeat": {
                    "instructions": "To repeat the last question, say, repeat.",
                }
            },
            "SETUP_STATE": {
                "instructions": "I need to know. How many questions would you like me to challenge you with? %s."
            },
            "default" : {
                "instructions": " answer the questions with the number of the choice that you think is the correct answer. For example, if you believe that the answer to a question is the third choice, just say three, or even third."
            }
        }
    },
    "launch": {
        "areYouReady": "Are you ready to begin the game?",
        "beforeWeCanBegin": "Before we can begin, %s",
        "beforeWeCanBeginError": "That is an invalid number, Please choose from the following? %s.",
        "iWillAsk": " I will ask you %s multiple choice trivia questions. ",
        "welcome": "Welcome to the %s. %s Simply %s %s"
    }
};