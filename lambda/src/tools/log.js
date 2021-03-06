var log = {
    "error": function (message) {
        if (typeof(message) === 'object') {
            message = message.message;
        }
        console.error(message);
    },
    "info": function (message) {
        console.info(message);
    },
    "warn": function (message) {
        console.warn(message);
    },
    "write": function (message) {
        console.log(message);
    }
};

module.exports = log;