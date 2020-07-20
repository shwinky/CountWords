const _ = require('lodash');
class StringService{
    constructor(persistProvider){
        this._persistProvider = persistProvider;
    }
    countWords(input){
        const words = input.split(' ');
        words.forEach((word)=> this._persistProvider.add(word));
    }

}

module.exports = StringService;