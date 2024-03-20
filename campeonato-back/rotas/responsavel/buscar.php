<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `responsavel`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //buscapelo paramentro id
    $data = selectOneRow("SELECT * FROM `responsavel` WHERE id_responsavel = $param");

    if (!$data) {
        $responseData = notFound("Resposável não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
