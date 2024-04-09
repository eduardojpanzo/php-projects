<?php

$data = json_decode(trim(file_get_contents("php://input")));


if ($param == "") {
    
    $nome = $data->nome;
    $tipo = $data->tipo;
    $senha =password_hash($data->senha, PASSWORD_DEFAULT);

    $sql_code = "INSERT INTO usuario (nome,tipo,senha) VALUES ('{$nome}','{$tipo}','{$senha}')";

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