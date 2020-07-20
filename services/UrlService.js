const _ = require('lodash');
const util = require('util');
const request = require('request');
const getAsync = util.promisify(request.get);
class UrlService{
    constructor(persistProvider){
        this._persistProvider = persistProvider;
    }
    async countWords(url){
        const urlResponse = await getAsync({url:url});
        const body = _.get(urlResponse,'body');
        if(body){
            const words = body.split(' ');
            words.forEach((word)=> this._persistProvider.add(word));
        }

    }

}

module.exports = UrlService;