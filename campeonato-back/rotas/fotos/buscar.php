<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `fotos`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT * FROM `fotos` WHERE id_foto = $param");

    if (!$data) {
        $responseData = notFound("foto não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
