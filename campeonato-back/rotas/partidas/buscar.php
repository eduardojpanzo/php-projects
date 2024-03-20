<?php

if ($param == "") {
    $data = selectAllRow("SELECT * FROM `partidas`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //buscapelo paramentro id
    $data = selectOneRow("SELECT * FROM `partidas` WHERE id_partida = $param");

    if (!$data) {
        $responseData = notFound("Usuário não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
