<?php
$URL_SERVER_FILES .= "campeonato/";

if ($param == "") {
    $data = selectAllRow("SELECT c.*, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `campeonato` c LEFT JOIN fotos f ON c.id_foto = f.id_foto");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca do  paramentro id

    $campeonato = selectOneRowLikeArray("SELECT c.*, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `campeonato` c LEFT JOIN fotos f ON c.id_foto = f.id_foto WHERE c.id_campeonato = $param");

    if (!$campeonato) {
        $responseData = notFound("campeonato não encontrado");
        return;
    }

    $equipas = selectAllRow("SELECT e.*, CONCAT ('$URL_SERVER_FILES',f.nome_arquivo) AS url_foto FROM inscricao i JOIN equipa e ON i.id_equipa = e.id_equipa LEFT JOIN fotos f ON e.id_foto = f.id_foto WHERE i.estado = true AND i.id_campeonato = $param");

    $data = [
        'id_campeonato' => $campeonato['id_campeonato'],
        'nome_campeonato' => $campeonato['nome'],
        'data_inicio' => $campeonato['data_inicio'],
        'data_fim' => $campeonato['data_fim'],
        'descricao_campeonato' => $campeonato['descricao'],
        'valor_pagar' => $campeonato['valor_pagar'],
        'id_foto_campeonato' => $campeonato['id_foto'],
        'url_foto'=>$campeonato['url_foto'],
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
