import getWord from "./words.js";

// Seleção de elementos DOM
const ContentButons = document.querySelector(".botons");
const AdiviWorks = document.querySelector(".adivi_works");
const img = document.querySelector("img");
const Dicas = document.querySelector(".clue");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalButton = document.getElementById("modal-button");
const novoJogoButton = document.querySelector(".novo_jogo");

let indexImg;
let currentWord;

// Esconde o modal no início
modal.classList.add("hidden");

// Reiniciar jogo ao clicar no botão do modal
modalButton.onclick = () => {
    modal.classList.add("hidden"); // Esconde o modal
    init(); // Reinicia o jogo
};

// Reiniciar jogo ao clicar no botão "Novo Jogo"
novoJogoButton.onclick = () => {
    init(); // Reinicia o jogo
    modal.classList.add("hidden"); // Garante que o modal seja escondido
};

document.addEventListener("DOMContentLoaded", () => {
    init();
});

function init() {
    indexImg = 1; // Reseta o índice da imagem
    img.src = `img1.png`; // Reseta a imagem inicial
    AdiviWorks.textContent = ""; // Limpa as letras
    ContentButons.textContent = ""; // Limpa os botões
    gerarSecAdiv(); // Gera a palavra
    gerarBotons(); // Gera os botões
}

function showModal(message) {
    modalMessage.textContent = message; // Define a mensagem do modal
    modal.classList.remove("hidden"); // Mostra o modal
}

function wrongAnswer() {
    indexImg++;
    img.src = `img${indexImg}.png`;

    if (indexImg === 7) {
        setTimeout(() => {
            showModal(`Você perdeu! A palavra era: ${currentWord}`);
        }, 100);
    }
}

function verifyLetter(letter) {
    const spans = document.querySelectorAll(`[word="${letter.toUpperCase()}"]`);

    if (spans.length > 0) {
        spans.forEach((span) => {
            span.textContent = letter;
        });

        const allRevealed = Array.from(AdiviWorks.children).every(
            (span) => span.textContent !== "_"
        );

        if (allRevealed) {
            setTimeout(() => {
                showModal("Parabéns, você venceu!");
            }, 100);
        }
    } else {
        wrongAnswer();
    }
}

function gerarSecAdiv() {
    const { word, clue } = getWord();
    currentWord = word; // Salva a palavra atual

    const wordWithoutAccent = word
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    Array.from(wordWithoutAccent).forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = "_";
        span.setAttribute("word", letter.toUpperCase());
        AdiviWorks.appendChild(span);
    });

    Dicas.textContent = `Dica: ${clue}`;
}

function gerarBotons() {
    for (let i = 97; i < 123; i++) {
        const btn = document.createElement("button");
        const letter = String.fromCharCode(i).toLowerCase();

        btn.textContent = letter;
        btn.onclick = () => {
            btn.disabled = true;
            btn.style.background = "black";
            verifyLetter(letter);
        };

        ContentButons.appendChild(btn);
    }
}
