<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `tecnico`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT * FROM `tecnico` WHERE id_tecnico = $param");

    if (!$data) {
        $responseData = notFound("Tecnico não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
