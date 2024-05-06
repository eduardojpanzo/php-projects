<?php

if ($param == "") {
    $data = selectAllRow("SELECT p.*, camp.nome AS nome_campeonato, equi.nome AS equipa_casa, equif.nome AS equipa_fora, res.gol_casa, res.gol_fora FROM partidas p INNER JOIN campeonato camp ON p.id_campeonato = camp.id_campeonato INNER JOIN equipa equi ON p.id_equipa_casa = equi.id_equipa INNER JOIN equipa equif ON p.id_equipa_fora = equif.id_equipa LEFT JOIN resultados res ON p.id_partida = res.id_partida");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectAllRow("SELECT p.*, camp.nome AS nome_campeonato, equi.nome AS equipa_casa, equif.nome AS equipa_fora, res.gol_casa, res.gol_fora FROM partidas p INNER JOIN campeonato camp ON p.id_campeonato = camp.id_campeonato INNER JOIN equipa equi ON p.id_equipa_casa = equi.id_equipa INNER JOIN equipa equif ON p.id_equipa_fora = equif.id_equipa LEFT JOIN resultados res ON p.id_partida = res.id_partida WHERE p.id_campeonato = $param");
    
    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
