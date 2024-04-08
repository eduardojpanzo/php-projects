<?php
$URL_SERVER_FILES .= "equipa/";

if ($param == "") {
    $data = selectAllRow("SELECT e.*, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `equipa` e LEFT JOIN fotos f ON e.id_foto = f.id_foto");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
      //busca pelo paramentro id
    $equipa = selectOneRowLikeArray("SELECT e.*, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `equipa` e LEFT JOIN fotos f ON e.id_foto = f.id_foto WHERE e.id_equipa = $param");

    $jogadores = selectAllRow("SELECT j.*, CONCAT ('$URL_SERVER_FILES',f.nome_arquivo) AS url_foto FROM jogador j LEFT JOIN fotos f ON j.id_foto = f.id_foto WHERE j.id_equipa = $param");

    if (!$equipa) {
        $responseData = notFound("Equipa não encontrado");
        return;
    }

    $data = [
        'id_equipa' => $equipa['id_equipa'],
        'nome' => $equipa['nome'],
        'descricao' => $equipa['descricao'],
        'data_fundacao' => $equipa['data_fundacao'],
        'id_foto' => $equipa['id_foto'],
        'id_responsavel' => $equipa['id_responsavel'],
        'id_estadio' => $equipa['id_estadio'],
        'url_foto'=>$equipa['url_foto'],
        'jogadores' => $jogadores
    ];

    if (!$data) {
        $responseData = notFound("Equipa não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
