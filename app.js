let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirTextoNaInicial(){
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Tente acertar o número secreto de 1 a 100. Boa sorte!");
}
exibirTextoNaInicial();

function verificarChute() {
    let chute = parseInt(document.querySelector("input").value);
    if (chute == numeroSecreto){
        exibirTextoNaTela("h1", "Parabéns!");
        let palavraTentativa = tentativas > 1 ? "tentativas!" : "tentativa!";
        let mensagemTentativas = ("Você acertou o número secreto com " + tentativas + " " + palavraTentativa);
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }
    else if (chute > numeroSecreto){
        exibirTextoNaTela("p", "O número secreto é menor");
    }
    else if (chute < numeroSecreto){
        exibirTextoNaTela("p", "O número secreto é maior");
    }
    else{
        exibirTextoNaTela("p", "Você não digitou um número válido");
    }
    tentativas++
    limparCampo();   
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadesDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadesDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        //console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirTextoNaInicial()
    document.getElementById("reiniciar").setAttribute("disabled",true);
}
