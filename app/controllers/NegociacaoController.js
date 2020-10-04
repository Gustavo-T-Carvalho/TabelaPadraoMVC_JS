class NegociacaoController {
  constructor() {
    //É possível atribuir uma função há uma variável em javascript
    let $ = document.querySelector.bind(document);
    /* bind(document) é utilziado para que se trate a variavel criada como
     um document. Ao chamar a função query selector, internamente existe uma 
     chamada para um this que refere ao document. Se ausentarmos o bind(document)
     esse this irá para a variável $ que chamou a função.*/

    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._listaNegociacoes = new ListaNegociacoes();
    
    this._negociacoesView = new NegociacoesView($("#negociacoesView"));
    this._negociacoesView.update(this._listaNegociacoes);

    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($("#mensagemView"));
    this._mensagemView.update(this._mensagem);
    /*Ao colocar no constructor a busca no dom só será feita uma vez.
        Caso fique no evento será chamada a cada clique no botão. Gerando execuções desnecessárias*/
  }

  adiciona(event) {
    
    /* O objeto date permite vários tipos de inputs para configurar uma data. 
    é possível passar por exemplo :
      Uma string separada por virgulas  "2019,05,02"
      3 argumentos (ano,mes,dia) sendo que o mes começa a contar de 0 Date(2019,4,2)
      Um array  ['2019','05','02']

    */

    // O operador ... desmembra o array e passa cada uma de suas posições como um parâmetro
    //Sem utilizar arrow function
    // let dataConvertida = new Date(
    //   ...this._inputData.value.split("-").map(function (item, indice) {
    //     return item - (indice % 2);
    //   })
    // );

    //Utilizando arrow function - Quando existe uma única instrução na arrow function é possível omitir o bloco
    // Quando só tem uma única instrução a arrow function já faz o retorno

    //let dataConvertida = new Date(this._inputData.replaceAll('-',','));
    
    event.preventDefault();
    
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._negociacoesView.update(this._listaNegociacoes);
    
    this._mensagem.texto='Negociação adicionada com sucesso';
    this._mensagemView.update(this._mensagem);

    this._limpaFormulario();

    console.log(this._listaNegociacoes.negociacoes);
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = "1";
    this._inputValor.value = "0.0";
    this._inputData.focus();
  }
}

/* 
Função Criada para manipular a string e retornar a nova data. Exsite um jeito mais fácil que foi utilizado no código

function criaData(stringData) {
  stringData = stringData.replaceAll("-", "");

  let stringAno = stringData.slice(0, 4);

  let stringMes = stringData.slice(4, 6);
  let stringDia = stringData.slice(6, 8);

  let novaData = new Date([stringAno,stringMes-1,stringDia]);
  console.log(novaData);
  console.log(typeof(novaData));
  return novaData;
}
*/
