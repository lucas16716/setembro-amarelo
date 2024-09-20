// Função para esconder o menu quando o usuário rola para baixo
let lastScrollTop = 0; // Guarda a posição anterior do scroll
const menu = document.getElementById('menu'); // Obtém o elemento do menu

// Adiciona um ouvinte de evento para rolagem da página
window.addEventListener('scroll', function () {
    // Obtém a posição atual do scroll
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // O usuário rolou para baixo, esconde o menu
        menu.classList.add('hidden');
    } else {
        // O usuário rolou para cima, mostra o menu
        menu.classList.remove('hidden');
    }

    lastScrollTop = scrollTop; // Atualiza a posição do scroll
});

// Função para buscar palavras no conteúdo da página
let matches = []; // Array para armazenar as correspondências encontradas
let currentMatchIndex = 0; // Índice da correspondência atual

function searchWord(event) {
    event.preventDefault();  // Previne o envio padrão do formulário

    const searchInput = document.getElementById('searchInput').value.toLowerCase(); // Obtém o valor da busca
    const content = document.querySelector('main'); // Seleciona o conteúdo da página

    clearPreviousHighlights(); // Limpa as marcações anteriores

    if (searchInput) {
        const regex = new RegExp(searchInput, 'gi'); // Cria uma expressão regular para a busca
        const textNodes = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6');  // Seleciona todos os elementos de texto

        textNodes.forEach(node => {
            let match;
            while ((match = regex.exec(node.textContent)) !== null) {
                // Armazena cada correspondência encontrada
                matches.push({ node: node, index: match.index, length: searchInput.length });
            }
        });

        highlightMatches(); // Destaca as correspondências encontradas
        if (matches.length > 0) {
            scrollToMatch(currentMatchIndex); // Rola para a correspondência atual
        } else {
            showMessage('Nenhuma correspondência encontrada.'); // Mostra mensagem se não houver correspondências
        }
    }
}

// Função para destacar as correspondências no texto
function highlightMatches() {
    matches.forEach(match => {
        const { node, index, length } = match;
        const text = node.textContent;

        // Divide o texto e adiciona marcação HTML <mark>
        const highlightedText = text.slice(0, index) + `<mark>${text.slice(index, index + length)}</mark>` + text.slice(index + length);
        node.innerHTML = highlightedText; // Atualiza o conteúdo HTML do nó
    });
}

// Função para limpar as marcações anteriores
function clearPreviousHighlights() {
    document.querySelectorAll('mark').forEach(mark => {
        const parentNode = mark.parentNode;
        // Remove os elementos <mark> preservando o texto original
        parentNode.innerHTML = parentNode.textContent;
    });
}

// Função para rolar para a correspondência especificada pelo índice
function scrollToMatch(index) {
    const highlightedElements = document.querySelectorAll('mark');
    if (highlightedElements[index]) {
        // Rola suavemente até a correspondência
        highlightedElements[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Função para mostrar mensagens ao usuário
function showMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        messageContainer.textContent = message; // Define o texto da mensagem
        messageContainer.style.display = 'block'; // Exibe o container de mensagem
    } else {
        alert(message); // Exibe um alerta se o container de mensagem não existir
    }
}

// Função de botão footer para rolar a página para o início
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
