<?php
if($acao == "" && $param = ""){noWayResponse();}

if ($acao == "lista" && $param == "") {
    $db = DB::connect();

    $rs = $db->prepare("SELECT * FROM booking ORDER BY startDate");
    $rs->execute();
    $obj = $rs->fetchAll(PDO::FETCH_ASSOC);

    if ($obj) {
        echo json_encode(["dado"=>$obj]);
        exit;
    }else{
        echo json_encode(["dado"=>"Não existem dados"]);
        exit;
    }
}

if ($acao == "lista" && $param != "") {
    $db = DB::connect();

    $rs = $db->prepare("SELECT * From `booking` WHERE id_booking = $param");
    $rs->execute();
    $obj = $rs->fetchObject();

    if ($obj) {
    echo json_encode(["dado"=>$obj]);
    exit;
    }else{
    echo json_encode(["dado"=>"Não existem dados"]);
    exit;
    }
}