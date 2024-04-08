<?php

$URL_SERVER_FILES .= "user/";

if ($param == "") {

    $data = selectAllRow("SELECT u.`id_usuario`,  u.`nome`, u.`tipo`, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `usuario` u LEFT JOIN fotos f ON u.id_foto = f.id_foto");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT u.`id_usuario`,  u.`nome`, u.`tipo`, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto FROM `usuario` u LEFT JOIN fotos f ON u.id_foto = f.id_foto WHERE id_usuario = $param");

    if (!$data) {
        $responseData = notFound("Usuário não encontrado");
        return;
    }

    $responseData = sucess($data, 'Criado com sucesso');
}else {
    $responseData =  notFound();
}
