<?php


if ($param == "") {
    $data = selectAllRow("SELECT p.*, c.nome AS nome_campeonato, ec.nome AS equipa_casa, ef.nome AS equipa_fora, r.gol_casa, r.gol_fora FROM partidas p INNER JOIN campeonato c ON p.id_campeonato = c.id_campeonato INNER JOIN equipa ec ON p.id_equipa_casa = ec.id_equipa INNER JOIN equipa ef ON p.id_equipa_fora = ef.id_equipa LEFT JOIN resultados r ON p.id_partida = r.id_partida")

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectAllRow("SELECT p.*, c.nome AS nome_campeonato, ec.nome AS equipa_casa, ef.nome AS equipa_fora, r.gol_casa, r.gol_fora FROM partidas p INNER JOIN campeonato c ON p.id_campeonato = c.id_campeonato INNER JOIN equipa ec ON p.id_equipa_casa = ec.id_equipa INNER JOIN equipa ef ON p.id_equipa_fora = ef.id_equsipa LEFT JOIN resultados r ON p.id_partida = r.id_partida WHERE i.id_campeonato = $param")
    
    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
