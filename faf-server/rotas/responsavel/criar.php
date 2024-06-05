<?php

$data = json_decode(trim(file_get_contents("php://input")));


if ($param == "") {
    $sql_code = DataToSqlInsertInto($data, "responsavel");

    if (!preg_match('/^[A-Za-z\s]+$/', preg_quote($data->nome))) {
        $responseData =  BadRequest("O nome só pode conter letras");
        return;
    }

    $db = DB::connect();

    $resp = $db->prepare($sql_code);
    $result = $resp->execute();
    
    if ($result) {
        $responseData =  sucess($result);
    }else{
        $responseData =  BadRequest();
    }
} else {
    $responseData =  notFound();
}
