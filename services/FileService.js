const fs = require('fs');

class FileService{
    constructor(persistProvider){
        this._persistProvider = persistProvider;
    }
    async countWords(filePath){
        await this.readChunks(filePath);
    }

    async readChunks(filePath){
        return new Promise(resolve =>{
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
        })
    }
}

module.exports = FileService