<?php
if ($param != "") {
    $db = DB::connect();
    $resp = $db->prepare("DELETE FROM equipa WHERE id_equipa = $param");
    $result = $resp->execute();

    if ($result) {
        $responseData = sucessOnlyMessage("Exluido com sucesso");
    }else{
        $responseData =  BadRequest();
    }

    return;
}
$responseData =  notFound();