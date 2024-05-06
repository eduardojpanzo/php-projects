<?php

$data = json_decode(trim(file_get_contents("php://input")));


if ($param == "") {
    $sql_code = DataToSqlInsertInto($data, "resultados");
    $id_partida= $data->id_partida;

    $partida = selectOneRow("SELECT * FROM `partidas` WHERE `partidas`.`id_partida` = $id_partida");

    if (!$partida) {
        $responseData = BadRequest("Essa partida não existe");
        return;
    }

    $result = executeSql($sql_code);
    if(!$result){
        $responseData =  BadRequest("Problema ao Definir o Resultado");
        return;
    }

    // //setar estado da partida como terminada
    $result = executeSql("UPDATE `partidas` SET `estado` = '1' WHERE `partidas`.`id_partida` = $id_partida");
    if(!$result){
        $responseData =  BadRequest("Problema ao terminar a partida");
        return;
    }

    if ($result) {
        $responseData =  sucess($result, "Definido com sucesso");
        return;
    }
} else {
    $responseData =  notFound();
}
