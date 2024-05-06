<?php
    $URL_SERVER_FILES .= "jogador/";
if ($param == "") {
    $data = selectAllRow("SELECT j.* , eq.`nome` AS equipa_nome, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `jogador` j LEFT JOIN `equipa` eq ON j.id_equipa = eq.id_equipa LEFT JOIN fotos f ON j.id_foto = f.id_foto");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT j.*, eq.`nome` AS equipa_nome, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `jogador` j LEFT JOIN `equipa` eq ON j.id_equipa = eq.id_equipa LEFT JOIN fotos f ON j.id_foto = f.id_foto WHERE j.id_jogador = $param");

    if (!$data) {
        $responseData = notFound("Jogador não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
