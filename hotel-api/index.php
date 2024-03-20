<?php
function noWayResponse() {
    echo json_encode(["ERRO"=> "No way!"]);
    exit;
}

header("Access-Control-Allow-Origin:*"); // definir o cors, que pagina poderá cosumir nossa api, neste caso (*) todos
header("Access-Control-Allow-Methods: *");
header("Content-type: application/json"); // A api usará retorno de json, 

date_default_timezone_set("america/Sao_Paulo"); //fuso horário

if (isset($_GET["path"])) {
    $path = explode("/", $_GET["path"]);
} else {
    noWayResponse();
}

if (isset($path[0])) {$api = $path[0];} else {noWayResponse();}
if (isset($path[1])) {$acao = $path[1];} else {$acao = "";}
if (isset($path[2])) {$param = $path[2];} else {$param = "";}

$method = $_SERVER["REQUEST_METHOD"]; 

include_once "classes/db.class.php";

//models
include_once "api/clients/clients.php";
include_once "api/booking/booking.php";
include_once "api/hotelguest/hotelguest.php";
include_once "api/room/room.php";

?>