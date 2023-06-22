<?php
if($acao == "" && $param = ""){noWayResponse();}

if ($acao == "lista" && $param == "") {
    $db = DB::connect();

    $rs = $db->prepare("SELECT * FROM booking INNER JOIN hotelguest ON booking.guest=hotelguest.id_guest INNER JOIN room ON booking.room=room.id");
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

    $rs = $db->prepare("SELECT * FROM booking INNER JOIN hotelguest ON booking.guest=hotelguest.id_guest INNER JOIN room ON booking.room=room.id WHERE id_booking = $param");
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