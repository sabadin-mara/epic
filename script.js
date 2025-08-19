// Selecionando os elementos HTML
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// Array de perguntas sobre "Epic, O Musical"
const perguntas = [
    {
        enunciado: "Qual deus grego é o principal antagonista de Odisseu, buscando vingança ao longo de sua jornada após a Guerra de Troia?",
        alternativas: [
            {
                texto: "Zeus",
                correta: false,
                afirmacao: "Zeus é o rei dos deuses, mas não o principal inimigo de Odisseu em sua odisseia."
            },
            {
                texto: "Poseidon",
                correta: true,
                afirmacao: "Você acertou! **Poseidon**, o deus dos mares, é o grande antagonista de Odisseu."
            }
        ]
    },
    {
        enunciado: "Na ilha de Eea, qual feiticeira transforma os companheiros de Odisseu em porcos, exigindo que ele demonstre astúcia para salvá-los?",
        alternativas: [
            {
                texto: "Medusa",
                correta: false,
                afirmacao: "Medusa é uma figura diferente da mitologia, conhecida por petrificar quem a olha."
            },
            {
                texto: "Circe",
                correta: true,
                afirmacao: "Isso mesmo! **Circe** é a feiticeira de Eea que transforma os homens de Odisseu."
            }
        ]
    },
    {
        enunciado: "Qual o nome do gigante de um olho só que Odisseu engana e cega para escapar de sua caverna, enfurecendo ainda mais Poseidon?",
        alternativas: [
            {
                texto: "Minotauro",
                correta: false,
                afirmacao: "O Minotauro é uma criatura de labirinto, não o gigante ciclope."
            },
            {
                texto: "Polifemo",
                correta: true,
                afirmacao: "Correto! **Polifemo** é o ciclope que Odisseu derrota com sua inteligência."
            }
        ]
    },
    {
        enunciado: "Após anos de ausência, qual é o nome da esposa leal de Odisseu que o espera em Ítaca, resistindo bravamente aos pretendentes?",
        alternativas: [
            {
                texto: "Helena",
                correta: false,
                afirmacao: "Helena é famosa pela Guerra de Troia, mas não é a esposa de Odisseu."
            },
            {
                texto: "Penélope",
                correta: true,
                afirmacao: "Exato! **Penélope** é a fiel e astuta esposa de Odisseu."
            }
        ]
    },
    {
        enunciado: "No clímax da história, o que Odisseu usa para provar sua verdadeira identidade aos pretendentes e restaurar seu reinado em Ítaca?",
        alternativas: [
            {
                texto: "Sua espada lendária",
                correta: false,
                afirmacao: "A espada era importante, mas não foi o objeto central para provar sua identidade naquele momento."
            },
            {
                texto: "Seu arco indomável",
                correta: true,
                afirmacao: "Acertou! O **arco de Odisseu**, que só ele conseguia armar, foi a prova decisiva de sua identidade."
            }
        ]
    }
];

let atual = 0; // Índice da pergunta atual
let perguntaAtual; // Objeto da pergunta atual
let pontuacao = 0; // Pontuação do quiz
let afirmacoesFinais = []; // Armazena as afirmações para o resultado final

// Função para exibir a próxima pergunta
function mostraPergunta() {
    // Se todas as perguntas foram respondidas, mostra o resultado final
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    
    perguntaAtual = perguntas[atual]; // Pega a pergunta atual do array
    caixaPerguntas.textContent = perguntaAtual.enunciado; // Define o texto do enunciado
    caixaAlternativas.innerHTML = ""; // Limpa as alternativas anteriores

    // Cria e exibe os botões de alternativas
    mostraAlternativas();
}

// Função para criar os botões das alternativas
function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        // Adiciona um evento de clique para chamar respostaSelecionada
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas); // Adiciona o botão à caixa de alternativas
    }
}

// Função chamada quando o usuário seleciona uma resposta
function respostaSelecionada(opcaoSelecionada) {
    // Adiciona a afirmação da alternativa selecionada ao histórico
    afirmacoesFinais.push(opcaoSelecionada.afirmacao);

    // Verifica se a resposta está correta e aumenta a pontuação
    if (opcaoSelecionada.correta) {
        pontuacao++;
    }

    atual++; // Avança para a próxima pergunta
    mostraPergunta(); // Chama a próxima pergunta ou o resultado final
}

// Função para exibir o resultado final do quiz
function mostraResultado() {
    caixaPerguntas.textContent = "Quiz sobre Epic, O Musical - Concluído!"; // Título do resultado
    caixaAlternativas.innerHTML = ""; // Limpa os botões de alternativa
    caixaResultado.style.display = "block"; // Garante que a caixa de resultado esteja visível

    // Exibe a pontuação final
    textoResultado.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

    // Adiciona um botão para recomeçar o quiz
    const botaoRecomecar = document.createElement("button");
    botaoRecomecar.textContent = "Recomeçar Quiz";
    botaoRecomecar.classList.add("botao-recomecar"); // Adiciona uma classe para estilização via CSS
    botaoRecomecar.addEventListener("click", recomecarQuiz);
    caixaAlternativas.appendChild(botaoRecomecar); // Adiciona o botão de recomeçar na área das alternativas
}

// Função para reiniciar o quiz
function recomecarQuiz() {
    atual = 0; // Volta para a primeira pergunta
    pontuacao = 0; // Reseta a pontuação
    afirmacoesFinais = []; // Limpa as afirmações
    textoResultado.textContent = ""; // Limpa o texto do resultado
    caixaResultado.style.display = "none"; // Opcional: Esconde a caixa de resultado até que um novo quiz seja concluído
    mostraPergunta(); // Inicia o quiz novamente
}

// Inicia o quiz ao carregar a página
mostraPergunta();
