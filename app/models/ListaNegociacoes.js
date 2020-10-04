class ListaNegociacoes {
  constructor() {
    this._negociacoes = [];
  }
  adiciona(negociacao){
      this._negociacoes.push(negociacao);
  }
  get negociacoes(){
      return [].concat(this._negociacoes);
      //Programação defensiva. COm o objetivo de impedir que a lista seja manipulada fora do método adiciona podemos retornar uma
      //Lista igual que não referencia para o mesmo endereço da memória da Lista original. Estamos enviando uma versão "somente leitura"
  }

}
