<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `resultados`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //buscapelo paramentro id
    $data = selectOneRow("SELECT * FROM `resultados` WHERE id_resultados = $param");

    if (!$data) {
        $responseData = notFound("Resultados não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
