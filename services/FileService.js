const fs = require('fs');

class FileService{
    constructor(persistProvider){
        this._persistProvider = persistProvider;
    }
    async countWords(filePath){
        if(fs.existsSync(filePath)){
            await this.readChunks(filePath);
            console.log('No such file in the system')
        }
    }

    async readChunks(filePath){
        return new Promise(function(resolve,reject){
            const stream = fs.createReadStream(filePath, {encoding: 'utf8'});
            stream.on('data', data => {
                const line = data.toString();
                const words = line.split(' ');
                words.forEach((word)=> this._persistProvider.add(word));
                stream.destroy();
            });
            stream.on('close', () => {;
                resolve();
            });
        }).catch(function(e){console.log(e)});
    }
}

module.exports = FileService