initialHomePage();

async function initialHomePage() {
    const campeonatos = await getManyField("campeonato");
    const equipas = await getManyField("equipa");
    const estadios = await getManyField("estadio");

    document.querySelector(".row.campeonato-row").innerHTML = "";
    document.querySelector(".row.equipa-row").innerHTML = "";
    document.querySelector(".row.estadio-row").innerHTML = "";

    campeonatos.map(
        ({ id_campeonato, nome, data_inicio, data_fim, descricao, valor_pagar, url_foto }, i) => {
            document.querySelector(".row.campeonato-row").innerHTML += `
              <div class="col-md-4 my-2 position-relative ">
                  <div class="card">
                      ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}
                      <div class="card-body">
                          <h5 class="card-title">${nome}</h5>
                          <p class="card-text">${descricao}</p>
                      </div>
                  </div>
                  <a href="./campeonato.html?id=${id_campeonato}" class="link-card"></a>
              </div>
          `;
        }
    );

    equipas.map(
        ({ id_equipa, nome, data_fundacao, descricao, url_foto }, i) => {
            document.querySelector(".row.equipa-row").innerHTML += `
              <div class="col-md-4 my-2 position-relative ">
                  <div class="card">
                      ${url_foto ? `<img src=${url_foto ? url_foto : "https://via.placeholder.com/150"} class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}
                      <div class="card-body">
                          <h5 class="card-title">${nome}</h5>
                          <p class="card-text">${descricao}</p>
                      </div>
                  </div>
                  <a href="./equipa.html?id=${id_equipa}" class="link-card"></a>
              </div>
          `;
        }
    );

    estadios.map(
        ({ nome, capacidade, localizacao, url_foto }, i) => {
            document.querySelector(".row.estadio-row").innerHTML += `
              <div class="col-md-4 my-2 position-relative ">
                  <div class="card">
                      ${url_foto ? `<img src="${url_foto}" class="card-img-top" alt="${nome}"/>` : IMAGE_COVER}
                      <div class="card-body">
                      <h5 class="card-title">Nome: ${nome}</h5>
                      <p class="card-text">Localizacão: ${localizacao}</p>
                      <p>Capacidade: <span class="badge bg-light text-dark">${capacidade ?? 0} pessoas</span></p>
                  </div>
                  </div>
              </div>
          `;
        }
    );
}