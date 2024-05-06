<?php
$URL_SERVER_FILES .= "tecnico/";

if ($param == "") {
    $data = selectAllRow("SELECT tec.*, eq.`nome` AS equipa_nome, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `tecnico` tec LEFT JOIN equipa eq ON tec.id_equipa = eq.id_equipa LEFT JOIN fotos f ON tec.id_foto = f.id_foto");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT tec.*, eq.`nome` AS equipa_nome, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `tecnico` tec LEFT JOIN `equipa` eq ON tec.id_equipa = eq.id_equipa LEFT JOIN fotos f ON tec.id_foto = f.id_foto WHERE tec.id_tecnico = $param");

    if (!$data) {
        $responseData = notFound("Tecnico não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
