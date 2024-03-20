<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `equipa`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT * FROM `equipa` WHERE id_equipa = $param");

    if (!$data) {
        $responseData = notFound("Equipa não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
