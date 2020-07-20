const _ = require('lodash');
const util = require('util');
const request = require('request');
const getAsync = util.promisify(request.get);
class UrlService{
    constructor(persistProvider){
        this._persistProvider = persistProvider;
    }
    async countWords(url){
        try {
            const urlResponse = await getAsync({url:url});
            const body = _.get(urlResponse,'body');
            if(body){
                const words = body.split(' ');
                words.forEach((word)=> this._persistProvider.add(word));
            }
        }
        catch(err){
            console.log(err);
        }

    }

}

module.exports = UrlService;