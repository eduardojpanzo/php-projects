<?php
if ($param != "") {
    $db = DB::connect();
    $resp = $db->prepare("DELETE FROM contrato WHERE id_contrato = $param");
    $result = $resp->execute();

    if ($result) {
        $responseData = sucessOnlyMessage("Exluido com sucesso");
    }else{
        $responseData =  BadRequest();
    }

    return;
}
$responseData =  notFound();