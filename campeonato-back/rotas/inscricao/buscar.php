<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `inscricao`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT * FROM `inscricao` WHERE id_inscricao = $param");

    if (!$data) {
        $responseData = notFound("Inscricão não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
