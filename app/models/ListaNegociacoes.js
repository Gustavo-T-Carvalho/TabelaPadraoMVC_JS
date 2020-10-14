class ListaNegociacoes {
  //Resolução sem arrwo function
  // constructor(contexto,armadilha) {
  //   this._negociacoes = [];
  //   this._armadilha = armadilha;
  //   this._contexto = contexto;
  // }

  constructor(armadilha) {
    this._negociacoes = [];
    //this._armadilha = armadilha;
   
  }
  adiciona(negociacao){
     // this._negociacoes.push(negociacao);
      // Como o push não promove uma mudança em nenhum atributo ele não dispara o set do proxy, uma alternativa seria fazer 
      // o seguinte comando (uma gambiarra). Nesse caso, toda vez que uma negociacao for criada será necessario um código mais custoso que um push
     this._negociacoes = [].concat(this._negociacoes,negociacao);
      //this._armadilha(this);

      //O contexto é dinÂmico. Como queremos que o this refira ao negociacaoController podemos passar o this no Negociaco controller
      // como contexto e usar a classe reflect com o método apply para passar os atributos na seguinte ordem: Função, contexto e parâmetros da função em um array

      //Reflect.apply(this._armadilha, this._contexto, [this]);
  }
  get negociacoes(){
      return [].concat(this._negociacoes);
      //Programação defensiva. COm o objetivo de impedir que a lista seja manipulada fora do método adiciona podemos retornar uma
      //Lista igual que não referencia para o mesmo endereço da memória da Lista original. Estamos enviando uma versão "somente leitura"
  }
  esvazia(){
    this._negociacoes= [];
    //this._armadilha(this);
    //Reflect.apply(this._armadilha, this._contexto, [this]);
    //this._armadilha(this);

  }
  get volumeTotal() {
    return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
 }
}
