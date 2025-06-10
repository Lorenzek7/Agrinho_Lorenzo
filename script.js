// Dados dos itens recicláveis com informações educativas
const itensReciclaveis = [
    { 
        nome: "Garrafa PET", 
        tipo: "plastico", 
        emoji: "🧴 Recipiente de sabonete líquido de plástico", 
        descricao: "Leva até 400 anos para se decompor no meio ambiente. Reciclar uma tonelada de plástico economiza cerca de 130 kg de petróleo." 
    },
    { 
        nome: "Jornal", 
        tipo: "papel", 
        emoji: "📰 Jornal", 
        descricao: "O papel pode ser reciclado até 7 vezes. Cada tonelada de papel reciclado poupa 22 árvores e consome 70% menos energia." 
    },
    { 
        nome: "Lata de Alumínio", 
        tipo: "metal", 
        emoji: "🥫 Lata de molho de tomate", 
        descricao: "O alumínio é 100% reciclável infinitamente. Reciclar uma lata economiza energia suficiente para manter uma TV ligada por 3 horas." 
    },
    { 
        nome: "Garrafa de Vidro", 
        tipo: "vidro", 
        emoji: "🍾 Garrafa de Vinho", 
        descricao: "O vidro leva 1 milhão de anos para se decompor, mas pode ser reciclado infinitamente sem perder pureza ou qualidade." 
    },
    { 
        nome: "Embalagem Tetra Pak", 
        tipo: "papel", 
        emoji: "🥛 Embalagem de leite de papelão", 
        descricao: "Compõe-se de 75% papel, 20% plástico e 5% alumínio. Pode ser reciclado para fazer telhas, placas e outros produtos." 
    },
    { 
        nome: "Copo Descartável", 
        tipo: "plastico", 
        emoji: "🥤Copo de plástico descartável", 
        descricao: "Um copo plástico pode levar até 450 anos para se decompor. Opte por copos reutilizáveis para reduzir este impacto." 
    },
    { 
        nome: "Folha de Alumínio", 
        tipo: "metal", 
        emoji: "🧻 Papel Alumínio", 
        descricao: "Pode ser reciclada infinitamente. Limpe antes de descartar para facilitar o processo de reciclagem." 
    },
    { 
        nome: "Pote de Conserva", 
        tipo: "vidro", 
        emoji: "🧂 Recipiente de sal de vidro", 
        descricao: "Não precisa ser descartado após o uso. Pode ser esterilizado e reutilizado muitas vezes para armazenar alimentos." 
    }
];

// Variáveis do jogo
let pontuacao = 0;
let itensAcertados = [];

// Elementos do DOM
const itensContainer = document.getElementById('itens-container');
const placarElement = document.getElementById('pontos');
const feedbackElement = document.getElementById('feedback');

// Inicialização do jogo quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    criarItens();
    configurarCestos();
});

// Cria os itens arrastáveis na tela
function criarItens() {
    itensReciclaveis.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-reciclavel btn btn-light';
        itemElement.draggable = true;
        itemElement.dataset.tipo = item.tipo;
        itemElement.dataset.index = index;
        itemElement.innerHTML = `<span style="font-size: 2rem">${item.emoji}</span>`;
        itemElement.title = item.nome;
        
        // Eventos de arrastar e clique
        itemElement.addEventListener('dragstart', dragStart);
        itemElement.addEventListener('click', () => mostrarDica(item));
        
        itensContainer.appendChild(itemElement);
    });
}

// Configura os eventos de arrastar para os itens
function dragStart(e) {
    e.dataTransfer.setData('tipo', e.target.dataset.tipo);
    e.dataTransfer.setData('index', e.target.dataset.index);
    e.target.classList.add('dragging');
}

// Configura os cestos como áreas de soltar
function configurarCestos() {
    const cestos = document.querySelectorAll('.cesto');
    
    cestos.forEach(cesto => {
        cesto.addEventListener('dragover', dragOver);
        cesto.addEventListener('dragenter', dragEnter);
        cesto.addEventListener('dragleave', dragLeave);
        cesto.addEventListener('drop', drop);
    });
}

// Evento: Quando um item é arrastado sobre um cesto
function dragOver(e) {
    e.preventDefault();
}

// Evento: Quando um item entra em um cesto
function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hover');
}

// Evento: Quando um item sai de um cesto
function dragLeave() {
    this.classList.remove('hover');
}

// Evento: Quando um item é solto em um cesto
function drop(e) {
    e.preventDefault();
    this.classList.remove('hover');
    
    const tipoItem = e.dataTransfer.getData('tipo');
    const indexItem = e.dataTransfer.getData('index');
    const tipoCesto = this.dataset.tipo;
    const itemElement = document.querySelector(`.item-reciclavel[data-index="${indexItem}"]`);
    
    if (tipoItem === tipoCesto) {
        // Resposta correta
        if (!itensAcertados.includes(indexItem)) {
            pontuacao += 10;
            itensAcertados.push(indexItem);
            itemElement.classList.add('d-none');
            mostrarFeedback('✅ Correto! ' + itensReciclaveis[indexItem].descricao, 'success');
            atualizarPlacar();
            
            // Verifica se todos os itens foram acertados
            if (itensAcertados.length === itensReciclaveis.length) {
                setTimeout(() => {
                    mostrarFeedback('🎉 Parabéns! Você completou o desafio da reciclagem com sucesso!', 'primary');
                }, 1000);
            }
        }
    } else {
        // Resposta incorreta
        mostrarFeedback('❌ Ops! Este item vai para o cesto ' + tipoItem.toUpperCase(), 'danger');
        itemElement.classList.remove('dragging');
    }
}

// Mostra mensagens de feedback para o jogador
function mostrarFeedback(mensagem, tipo) {
    feedbackElement.textContent = mensagem;
    feedbackElement.className = `alert alert-${tipo} mt-3 text-center`;
    feedbackElement.style.display = 'block';
    
    setTimeout(() => {
        feedbackElement.style.display = 'none';
    }, 3000);
}

// Mostra informações educativas sobre o item
function mostrarDica(item) {
    mostrarFeedback(`💡 ${item.nome}: ${item.descricao}`, 'info');
}

// Atualiza a pontuação na tela
function atualizarPlacar() {
    placarElement.textContent = pontuacao;
}