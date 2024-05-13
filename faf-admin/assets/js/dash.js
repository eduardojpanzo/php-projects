initialDashView()

async function initialDashView() {
    const campeonatos = await getManyField("campeonato");
    const equipas = await getManyField("equipa");
    const jogadores = await getManyField("jogador");
    const tecnicos = await getManyField("tecnico");
    const estadios = await getManyField("estadio");

    document.querySelector("#cadastrados").innerHTML = `
        <div class="feature col">
            <div class="d-flex gap-2 align-items-start">
                <div class="feature-icon bg-dark bg-gradient">
                    <i class="fas fa-trophy nav_icon"></i> <span class="number-icon">${campeonatos.length}</span>
                </div>
                <h2>Campeonatos</h2>
            </div>
            <a href="./campeonato.html" class="icon-link">
                Ver
            </a>
        </div>
        <div class="feature col">
            <div class="d-flex gap-2 align-items-start">
                <div class="feature-icon bg-dark bg-gradient">
                    <i class="fas fa-shield-alt nav_icon"></i> <span class="number-icon">${equipas.length}</span>
                </div>
                <h2>Equipas</h2>
            </div>
            <a href="./equipa.html" class="icon-link">
                Ver
            </a>
        </div>
        <div class="feature col">
            <div class="d-flex gap-2 align-items-start">
                <div class="feature-icon bg-dark bg-gradient">
                    <i class="fas fa-tshirt nav_icon"></i> <span class="number-icon">${jogadores.length}</span>
                </div>
                <h2>Jogadores</h2>
            </div>
            <a href="./jogador.html" class="icon-link">
                Ver
            </a>
        </div>
        <div class="feature col">
            <div class="d-flex gap-2 align-items-start">
                <div class="feature-icon bg-dark bg-gradient">
                    <i class="fas fa-user-tie nav_icon"></i> <span class="number-icon">${tecnicos.length}</span>
                </div>
                <h2>Tecnicos</h2>
            </div>
            <a href="./tecnico.html" class="icon-link">
                Ver
            </a>
        </div>
        <div class="feature col">
            <div class="d-flex gap-2 align-items-start">
                <div class="feature-icon bg-dark bg-gradient">
                    <i class="fas fa-map-pin nav_icon"></i> <span class="number-icon">${estadios.length}</span>
                </div>
                <h2>Estadios</h2>
            </div>
            <a href="./estadio.html" class="icon-link">
                Ver
            </a>
        </div>
    `
}