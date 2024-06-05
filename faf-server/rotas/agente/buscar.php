<?php
$URL_SERVER_FILES .= "agente/";
if ($param == "") {
    $data = selectAllRow("SELECT a.*, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `agente` a LEFT JOIN fotos f ON a.id_foto = f.id_foto");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca do  paramentro id

    $data = selectOneRow("SELECT a.*, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `agente` a LEFT JOIN fotos f ON a.id_foto = f.id_foto WHERE a.id_agente = $param");

    if (!$data) {
        $responseData = notFound("agente não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
