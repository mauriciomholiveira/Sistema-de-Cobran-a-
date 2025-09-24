const pastaTemplates = "./templates/";
let templates = {};

// Lista de arquivos de template (o nome do arquivo será o nome do template)
const listaArquivos = [
  "cobranca_dia1.txt",
  "cobranca_dia2.txt",
  "atraso_1_dia.txt",
  "atraso_2_dia.txt",
  // adicione mais arquivos aqui
];

// Função para carregar templates externos
async function carregarTemplates() {
  templates = {}; // limpa

  for (const arquivo of listaArquivos) {
    try {
      const response = await fetch(`${pastaTemplates}${arquivo}`);
      if (!response.ok) throw new Error("Não foi possível ler o arquivo");
      const texto = await response.text();
      // Nome do template = nome do arquivo sem extensão
      const nomeTemplate = arquivo.replace(".txt", "").replace(/_/g, " ");
      templates[nomeTemplate] = texto;
    } catch (err) {
      console.error(`Erro ao carregar ${arquivo}:`, err);
    }
  }

  renderTemplates();
}

// Renderiza no select
function renderTemplates() {
  const select = document.getElementById("templateSelect");
  select.innerHTML = `<option value="">-- Selecione um template --</option>`;
  for (const nome in templates) {
    const option = document.createElement("option");
    option.value = nome;
    option.textContent = nome;
    select.appendChild(option);
  }
}

// Usar template selecionado
function usarTemplate() {
  const select = document.getElementById("templateSelect");
  const valor = select.value;
  if (valor) document.getElementById("mensagem").value = templates[valor];
}

// Abrir nova mensagem (campo vazio)
function abrirCriarMensagem() {
  document.getElementById("mensagem").value = "";
  document.getElementById("mensagem").focus();
}

// Gerar links WhatsApp
function gerarLinks() {
  const nomes = document.getElementById('nomes').value.trim().split('\n');
  const telefones = document.getElementById('telefones').value.trim().split('\n');
  const mensagemBruta = document.getElementById('mensagem').value.trim();
  const tabela = document.getElementById('resultado');

  tabela.innerHTML = "<tr><th>Nome</th><th>Telefone</th><th>Link</th></tr>";

  for (let i = 0; i < nomes.length; i++) {
    const nomeCompleto = nomes[i].trim();
    if (!nomeCompleto) continue;

    const primeiroNome = nomeCompleto.split(" ")[0];
    const telefone = telefones[i] ? telefones[i].trim() : "";

    let msgPersonalizada = mensagemBruta.replace(/\{nome\}/g, primeiroNome);
    let link = `https://wa.me/55${telefone}?text=${encodeURIComponent(msgPersonalizada)}`;

    tabela.innerHTML += `
      <tr>
        <td>${nomeCompleto}</td>
        <td>${telefone}</td>
        <td><a href="${link}" target="_blank">Enviar</a></td>
      </tr>`;
  }
}

// Inicializar templates ao carregar página
document.addEventListener("DOMContentLoaded", carregarTemplates);
