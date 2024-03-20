<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `estadio`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT * FROM `estadio` WHERE id_estadio = $param");

    if (!$data) {
        $responseData = notFound("estadio não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
