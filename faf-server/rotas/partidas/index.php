<?php
function buscarCampeonato($id){
    $campeonato = selectOneRowLikeArray("SELECT * FROM `campeonato` WHERE campeonato.id_campeonato = $id");

    if (!$campeonato) {
        $responseData = notFound("campeonato não encontrado");
        return;
    }

    $equipas = selectAllRow("SELECT e.* FROM inscricao i JOIN equipa e ON i.id_equipa = e.id_equipa WHERE i.estado = true AND i.id_campeonato = $id");

    $data = [
        'id_campeonato' => $campeonato['id_campeonato'],
        'nome_campeonato' => $campeonato['nome'],
        'data_inicio' => $campeonato['data_inicio'],
        'data_fim' => $campeonato['data_fim'],
        'descricao_campeonato' => $campeonato['descricao'],
        'valor_pagar' => $campeonato['valor_pagar'],
        'id_foto_campeonato' => $campeonato['id_foto'],
        'equipas' => $equipas
    ];

    return $data;
}

function verificarEquipasIds($equipas, $ids){
    $idsEncontrados = [];

    foreach($equipas as $equipa){
        if (in_array($equipa["id_equipa"], $ids)) {
            $idsEncontrados[] = $equipa["id_equipa"];
        }
    }

    return $idsEncontrados;
}
 	if ($method == "POST" && $acao == "criar") {
        include_once "criar.php";
    }else if ($method == "GET" && $acao == "buscar") {
        include_once "buscar.php";
    }else if ($method == "GET" && $acao == "buscarporequipa") {
        include_once "buscarporequipa.php";
    }else if ($method == "PUT" && $acao == "atualizar") {
        include_once "atualizar.php";
    }else if ($method == "DELETE" && $acao == "remove") {
        include_once "remove.php";
    }else{
    	$responseData =  notFound();
    }
?>