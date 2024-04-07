const url = location.href;
const indexOfId = url.indexOf("id=");
const idValue = url.substring(indexOfId + 3);

initialJogadorView()

async function initialJogadorView() {
    const jogador = await getOneField("jogador", idValue);
    const equipa = await getOneField("equipa", jogador.id_equipa);

    document.querySelector(".card-principal .card_image").innerHTML = `${jogador.url_foto ? `<img src="${jogador.url_foto}" class="card-img-top" alt="${jogador.nome_campeonato}"/>` : IMAGE_COVER}`

    document.querySelector(".card-body > .card-title").innerHTML = jogador.nome
    document.querySelector(".card-body > .card-text").innerHTML = `
        <p>Posição: ${jogador.posicao}</p>
        <p>Número: <span class="badge bg-light text-dark">${jogador.numero}</span></p>
        <p>Data de Nascimento:  <span class="badge bg-light text-dark">${formatarDataTexto(jogador.data_nascimento)}</span></p>
        <p>Sexo: <span class="badge bg-light text-dark">${jogador.sexo}</span></p>
    `

    document.querySelector(".row.equipa-row").innerHTML = `
    <div class="col-md-12 my-2 position-relative ">
        <div class="card">
        ${equipa.url_foto ? `<img src="${equipa.url_foto}" class="card-img-top" alt="${equipa.nome}"/>` : IMAGE_COVER}
            <div class="card-body">
                <h5 class="card-title">${equipa.nome}</h5>
            </div>
        </div>
        <a href="./equipa.html?id=${equipa.id_equipa}" class="link-card"></a>
    </div>
`;
}