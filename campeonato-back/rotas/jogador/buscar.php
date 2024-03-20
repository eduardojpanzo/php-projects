<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `jogador`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //buscapelo paramentro id
    $data = selectOneRow("SELECT * FROM `jogador` WHERE id_jogador = $param");

    if (!$data) {
        $responseData = notFound("Usuário não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
