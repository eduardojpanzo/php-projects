<?php
if ($param != "") {
    $db = DB::connect();
    $resp = $db->prepare("DELETE FROM usuario WHERE id_usuario = $param");
    $result = $resp->execute();

    if ($result) {
        $responseData = sucessOnlyMessage("Exluido com sucesso");
    }else{
        $responseData =  BadRequest();
    }

    return;
}
$responseData =  notFound();