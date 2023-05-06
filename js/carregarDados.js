/** 
 * * Objetivo: arquivo responsavel por carregar os dados dos nomess
 *      fazendo a integração entre o front e back
 * Data: 03/05/2023
 * Autor: Octavio Goncalves
 * Versão: 1.0
 */

//pega o id do botao pesquisar
const botaoPesquisar = document.getElementById("pesquisar");
//pega o id da caixa de texto
const texto = document.getElementById("insiraNome");


//Função com o botao pesquisar, ele realiza um fetch na api do ibge nomes
const pesquisar = function(){

    let nome = texto.value;
    let link = "https://servicodados.ibge.gov.br/api/v2/censos/nomes/"+nome;

    //Realiza um fetch, com o link da api e com o nome digitado pelo usuario
    fetch(link)
    .then(function(retornoJson){
        return retornoJson.json();
    }).then(function(dadosNome){

        //forEach feito para add os textos do json no HTML
        dadosNome.forEach(function(itemNome){

            let res = itemNome.res;
            criaLinhas(res);            
        });
    });
    
    //remove o texto da variavel texto
    texto.value = " ";
    

};

//Função que cria as linhas dos anos e frequencias do nome
const criaLinhas = function(res){

    let ul_anos = document.getElementById('listaAnos');
    let ul_freq = document.getElementById('listaFreq');

    res.forEach(function(dadoNome){
        let anoNome = dadoNome.periodo.replace(/[#@[!,&]/g,' ');
        let freqNome = dadoNome.frequencia;

        let textoAno = document.createTextNode(anoNome);
        let textofreq = document.createTextNode(freqNome);

        let li_anos = document.createElement('li');
        ul_anos.appendChild(li_anos);
        let li_freq = document.createElement('li');
        ul_freq.appendChild(li_freq);

        li_anos.appendChild(textoAno);
        li_freq.appendChild(textofreq);


    });

};



//funcao que cria uma mascara para a entrada do nome
const mascaraNome = function(teclaDigitada){

}



//Evento de click no botao pesquisar
botaoPesquisar.addEventListener('click', function(){pesquisar();});

//Add um Evento na caixa do texto nome
texto.addEventListener("keypress", function(tecla){ mascaraNome(tecla); });