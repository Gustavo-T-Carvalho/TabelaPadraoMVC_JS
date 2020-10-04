class MensagemView extends View{
    constructor(elemento){
        super(elemento);
    }

    template(mensagem){
        //Em javascript uma string vazia, em branco, nula é interpretada como um falso
        if (!mensagem.texto){
            return `<p></p>`;
        }
        return `<p class="alert alert-info">${mensagem.texto}</p>`;


        /*Utilizando um if ternário
        return mensagem.texto? `<p class="alert alert-info">${mensagem.texto}</p>`: ``<p></p>`;
        */ 
    }

}