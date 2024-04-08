<?php
    $URL_SERVER_FILES .= "responsavel/";
if ($param == "") {
    $data = selectAllRow("SELECT * FROM `responsavel`");
     $data = selectAllRow("SELECT res.*, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `responsavel` res LEFT JOIN fotos f ON res.id_foto = f.id_foto");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //buscapelo paramentro id
    $data = selectOneRow("SELECT res.*, eq.`nome` AS equipa_nome, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `responsavel` res LEFT JOIN `equipa` eq ON res.id_responsavel = eq.id_responsavel LEFT JOIN fotos f ON res.id_foto = f.id_foto WHERE res.id_responsavel = $param");

    if (!$data) {
        $responseData = notFound("Resposável não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
