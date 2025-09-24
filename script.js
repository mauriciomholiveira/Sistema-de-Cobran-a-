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

    // substitui {nome} pelo primeiro nome
    let msgPersonalizada = mensagemBruta.replace(/\{nome\}/g, primeiroNome);

    // encodeURIComponent garante emojis + quebras de linha
    let link = `https://wa.me/55${telefone}?text=${encodeURIComponent(msgPersonalizada)}`;

    tabela.innerHTML += `
      <tr>
        <td>${nomeCompleto}</td>
        <td>${telefone}</td>
        <td><a href="${link}" target="_blank">Enviar</a></td>
      </tr>`;
  }
}
