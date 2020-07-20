
class RamPersistWordCounter{
    constructor(){
        this._dictionary = {};
    }
    add(word){
        if(!(word in this._dictionary))
            this._dictionary[word]=0;
        this._dictionary[word]+=1;
    }
    get(word){
        return this._dictionary[word];
    }

}

module.exports = RamPersistWordCounter