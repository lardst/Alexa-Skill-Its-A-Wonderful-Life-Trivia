function Exception (_errorType) {
    this.message = '';
    this.name = '';

    switch(_errorType) {
        case 'invalidJSON' : 
            this.message = 'The value must be a valid JSON object';
            this.name = 'Invalid JSON Object';
            break;
        case 'invalidAppID' : 
            this.message = 'The app ID on the server is not the same as the ID passed to Alexa.';
            this.name = 'Invalid app ID';
            break;
        default :
            this.message = 'A general error has occurred.';
            this.name = 'Unhandled Exception';
    }

    this.toString = function() {
        return this.message;
     };
}

module.exports = Exception;