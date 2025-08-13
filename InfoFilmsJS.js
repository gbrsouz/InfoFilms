function formatarTitulo(texto) {
  return texto
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join("+");
}

function buscarFilme() {
  const nome = document.getElementById("nomeFilme").value;
  const resultado = document.getElementById("resultado");

  if (!nome) {
    resultado.innerHTML = "<p>Digite um nome.</p>";
    return;
  }

  const nomeFormatado = formatarTitulo(nome);

  const url = `https://www.omdbapi.com/?t=${nomeFormatado}&apikey=edd8466e`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro na requisição da API");
      }
      return res.json();
    })
    .then((dados) => {
      if (dados.Response === "False") {
        throw new Error(dados.Error);
      }

      if (Array.isArray(dados.Ratings)) {
        dados.Ratings = dados.Ratings.map(
          (rating) => `${rating.Source}: ${rating.Value}`
        ).join(" | ");
      }

      dados.Poster = "<img src=" + '"' + dados.Poster + '">';

      let html = '<h2 id="infoTitulo">Informações</h2><ul>';
      for (const chave in dados) {
        html += `<li><strong>${chave}:</strong> ${dados[chave]}</li>`;
      }
      html += "</ul>";

      resultado.innerHTML = html;
    })
    .catch((err) => {
      resultado.innerHTML = `<p style="color:red;">Erro: ${err.message}</p>`;
    });
}
