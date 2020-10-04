class Negociacao{
    constructor(data,quantidade,valor){
        this._data = new Date(data.getTime());
        /*Programação defensiva, ao criar um novo objeto
        quando formos apresentar a data no get data
        esse objeto que foi criado no construtor ficará
        inalterado*/
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
        //Object freeze é shallow, não consegue congelar as propriedades de um onjeto como data
    }
    get volume(){
        return this._quantidade*this._valor;
    }

    get data(){
        return new Date(this._data.getTime());
    }
    get valor(){
        return this._valor;
    }
    get quantidade(){
        return this._quantidade;
    }
}