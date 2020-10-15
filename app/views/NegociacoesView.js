class NegociacoesView extends View{
    constructor(elemento){
        super(elemento);
    }
  template(listaNegociacoes) {
  
    
    
    return  `
        <table  class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>

            <tbody id="corpo-tabela"></tbody>
            ${listaNegociacoes.negociacoes.map(n=>`
                    <tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr> 
                `
            ).join('')}
            <tfoot>
                <td colspan="3"></td>
                <td>
                ${
                    // Immediately invoked funtion expression - IIFE 
                    // (function(){
                    //     let total = 0;
                    //     listaNegociacoes.negociacoes.forEach(n => total+= n.volume);
                    //     return total;
                        
                    // })()
                    listaNegociacoes.volumeTotal



                }
                </td>
            </tfoot>
        </table>
        `;
  }
 
}


