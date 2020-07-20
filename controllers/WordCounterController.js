const _ = require('lodash');
const StringService = require('../services/StringService');
const UrlService = require('../services/UrlService');
const FileService = require('../services/FileService');
const RamPersistWordCounters = require('../providers/RamPersistWordCounters');
const RedisPersist = require('../providers/RedisProvider');
//const persistProvider = new RamPersistWordCounters();
const persistProvider = new RedisPersist({host:"localhost"});
class WordCounterController {
    async handleWordCountRequest(req,res){
        try {
            const stringInput = _.get(req.body, 'string');
            if(stringInput){
                const stringService = new StringService(persistProvider);
                stringService.countWords(stringInput);
            }
            const url = _.get(req.body, 'url');
            if(url){
                const urlService = new UrlService(persistProvider);
                await urlService.countWords(url);
            }
            const filePath = _.get(req.body, 'filePath');
            if(filePath){
                const fileService = new FileService(persistProvider);
                await fileService.countWords(filePath);
            }
            return res.status(200).send('Success');
        } catch (err) {
            console.log(err)
            return res.status(500).end(`internal error : ${err}`);
        }
    }
    async handleGetWordCountRequest(req,res){
        try {
            const wordInput = _.get(req.params, 'word');
            let count=0;
            if(wordInput){
                count=await persistProvider.get(wordInput);
                if(!count)
                    count=0;
            }
            return res.status(200).send(`${count}`);
        } catch (err) {
            console.log(err)
            return res.status(500).end(`internal error : ${err}`);
        }
    }
}
module.exports = new WordCounterController();