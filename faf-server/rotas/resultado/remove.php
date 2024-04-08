<?php
if ($param != "") {
    $db = DB::connect();
    $resp = $db->prepare("DELETE FROM resultados WHERE id_resultados = $param");
    $result = $resp->execute();

    if ($result) {
        $responseData = sucessOnlyMessage("Exluido com sucesso");
    }else{
        $responseData =  BadRequest();
    }

    return;
}
$responseData =  notFound();