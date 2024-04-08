<?php
    $URL_SERVER_FILES .= "estadio/";

if ($param == "") {
    $data = selectAllRow("SELECT es.*, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `estadio` es LEFT JOIN fotos f ON es.id_foto = f.id_foto");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT es.*, eq.`nome` AS equipa_nome, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `estadio` es LEFT JOIN `equipa` eq ON es.id_estadio = eq.id_estadio LEFT JOIN fotos f ON es.id_foto = f.id_foto WHERE es.id_estadio = $param");

    if (!$data) {
        $responseData = notFound("estadio não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
