<?php
$data = json_decode(trim(file_get_contents("php://input")));


if ($param != "") {
    $sql_code = DataToSqlUpdateSet($data, "agente","id_agente",$param);

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