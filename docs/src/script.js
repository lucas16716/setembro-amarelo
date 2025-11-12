// Função para esconder o menu quando o usuário rola para baixo
let lastScrollTop = 0;
const menu = document.getElementById("menu");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // O usuário rolou para baixo, esconde o menu
    menu.classList.add("hidden");
  } else {
    // O usuário rolou para cima, mostra o menu
    menu.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});

// Função para buscar palavras no conteúdo da página
let matches = [];
let currentMatchIndex = 0;

function searchWord(event) {
  event.preventDefault();

  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const content = document.querySelector("main");

  clearPreviousHighlights();

  if (searchInput) {
    const regex = new RegExp(searchInput, "gi");
    const textNodes = content.querySelectorAll("p, h1, h2, h3, h4, h5, h6");

    textNodes.forEach((node) => {
      let match;
      while ((match = regex.exec(node.textContent)) !== null) {
        matches.push({
          node: node,
          index: match.index,
          length: searchInput.length,
        });
      }
    });

    highlightMatches();
    if (matches.length > 0) {
      scrollToMatch(currentMatchIndex);
    } else {
      showMessage("Nenhuma correspondência encontrada.");
    }
  }
}

// Função para destacar as correspondências no texto
function highlightMatches() {
  matches.forEach((match) => {
    const { node, index, length } = match;
    const text = node.textContent;

    const highlightedText =
      text.slice(0, index) +
      `<mark>${text.slice(index, index + length)}</mark>` +
      text.slice(index + length);
    node.innerHTML = highlightedText;
  });
}

// Função para limpar as marcações anteriores
function clearPreviousHighlights() {
  document.querySelectorAll("mark").forEach((mark) => {
    const parentNode = mark.parentNode;
    parentNode.innerHTML = parentNode.textContent;
  });
}

// Função para rolar para a correspondência especificada pelo índice
function scrollToMatch(index) {
  const highlightedElements = document.querySelectorAll("mark");
  if (highlightedElements[index]) {
    highlightedElements[index].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

// Função para mostrar mensagens ao usuário
function showMessage(message) {
  const messageContainer = document.getElementById("messageContainer");
  if (messageContainer) {
    messageContainer.textContent = message;
    messageContainer.style.display = "block";
  } else {
    alert(message);
  }
}

// Função de botão footer para rolar a página para o início
document
  .querySelector(".scroll-top-btn")
  .addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
