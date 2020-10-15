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
    this._ordemAtual = '';

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($("#negociacoesView")),
      "adiciona",
      "esvazia",
      "ordena",
      "inverteOrdem"
    );

    // O dódigo a cima pode ser descrito como: Crie um proxy factory com essa instância de ListaNegociacao.
    // quando adiciona ou esvazia forem chamados execute essa arrow function

    //  Resolução sem arrow functions
    //   this._listaNegociacoes = new ListaNegociacoes(this,function(model){
    //  this._negociacoesView.update(model);

    /*
    O escopo da arrow function é Léxico (fixo), ou seja, ao passar a função no escopo de Negociação Controller 
    o this se refere ao negociação controller.
    */
    // this._listaNegociacoes = new ListaNegociacoes((model) =>
    //   this._negociacoesView.update(model)
    // );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($("#mensagemView")),
      "texto"
    );

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
    this._mensagem.texto = "Negociação adicionada com sucesso";
    this._limpaFormulario();
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = "Negociações apagadas com sucesso";
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
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }
  importaNegociacoes() {
    let service = new NegociacaoService();
    service
      .obterNegociacoes()
      .then((negociacoes) => {
        negociacoes.forEach((negociacao) =>
          this._listaNegociacoes.adiciona(negociacao)
        );
        this._mensagem.texto = "Negociações do período importadas com sucesso";
      })
      .catch((error) => (this._mensagem.texto = error));
  }

  ordena(coluna) {
    if(this._ordemAtual==coluna){
      this._listaNegociacoes.inverteOrdem();
    }else{
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);

    }
    this._ordemAtual = coluna;
  }

  // Antes do promise All

  // service
  //   .obterNegociacoesDaSemana()
  //   .then((negociacoes) => {
  //     negociacoes.forEach((negociacao) =>
  //       this._listaNegociacoes.adiciona(negociacao)
  //     );
  //     this._mensagem.texto = "Negociacao da semana obtida com sucesso";
  //   })
  //   .catch((erro) => (this._mensagem.texto = erro));

  //   service
  //   .obterNegociacoesDaSemanaAnterior()
  //   .then((negociacoes) => {
  //     negociacoes.forEach((negociacao) =>
  //       this._listaNegociacoes.adiciona(negociacao)
  //     );
  //     this._mensagem.texto = "Negociacao da semana obtida com sucesso";
  //   })
  //   .catch((erro) => (this._mensagem.texto = erro));

  //   service
  //   .obterNegociacoesDaSemanaRetrasada()
  //   .then((negociacoes) => {
  //     negociacoes.forEach((negociacao) =>
  //       this._listaNegociacoes.adiciona(negociacao)
  //     );
  //     this._mensagem.texto = "Negociacao da semana obtida com sucesso";
  //   })
  //   .catch((erro) => (this._mensagem.texto = erro));

  //  Antes de usar padrão de projeto Promise
  // service.obterNegociacoesDaSemana((erro,negociacoes)=>{
  //   // Error first
  //   if(erro){
  //     this._mensagem.texto = erro;
  //     return;
  //   }
  //   negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
  //   this._mensagem.texto = 'Negociações importadas com sucesso';
  // });
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
