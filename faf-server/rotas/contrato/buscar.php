<?php

if ($param == "") {
    $data = selectAllRow("SELECT c.* , j.nome AS nome_jogador, e.nome As nome_equipa FROM `contrato` c LEFT JOIN jogador j ON c.id_jogador = j.id_jogador LEFT JOIN equipa e ON c.id_equipa = e.id_equipa");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca do  paramentro id

    $contrato = selectOneRow("SELECT c.*, j.nome AS nome_jogador, e.nome As nome_equipa FROM `contrato` c LEFT JOIN jogador j ON c.id_jogador = j.id_jogador LEFT JOIN equipa e ON c.id_equipa = e.id_equipa  WHERE c.id_contrato = $param");

    if (!$contrato) {
        $responseData = notFound("Contrato não encontrado");
        return;
    }	

    $responseData = sucess($contrato, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
