<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `campeonato`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca do  paramentro id
    $campeonato = selectOneRowLikeArray("SELECT * FROM `campeonato` WHERE id_campeonato = $param");

    $equipas = selectAllRow("SELECT e.* FROM inscricao i JOIN equipa e ON i.id_equipa = e.id_equipa WHERE i.estado = true AND i.id_campeonato = $param");

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

    if (!$data) {
        $responseData = notFound("campeonato não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
