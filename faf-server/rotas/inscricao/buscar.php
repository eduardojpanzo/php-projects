<?php

if ($param == "") {
    $data = selectAllRow("SELECT i.*, e.nome AS nome_equipa, c.nome AS nome_campeonato FROM inscricao i JOIN equipa e ON i.id_equipa = e.id_equipa JOIN campeonato c ON i.id_campeonato = c.id_campeonato");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectAllRow("SELECT i.*, e.nome AS nome_equipa, c.nome AS nome_campeonato FROM inscricao i JOIN equipa e ON i.id_equipa = e.id_equipa JOIN campeonato c ON i.id_campeonato = c.id_campeonato WHERE i.id_campeonato = $param");

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
