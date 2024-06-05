<?php
include_once "utils.php";

header("Access-Control-Allow-Origin: *"); // definir o cors, que pagina poderá cosumir nossa api, neste caso (*) todos
header("Access-Control-Allow-Methods: *");
header("Content-type: application/json"); // A api usará retorno de json, 

date_default_timezone_set("Africa/Luanda"); //fuso horário

if (isset($_GET["path"])) {
    $path = explode("/", $_GET["path"]);
} else {
    $responseData = notFound();
}

if (isset($path[0])) {$rota = $path[0];} else {$rota = ""; $responseData = notFound();}
if (isset($path[1])) {$acao = $path[1];} else {$acao = "";}
if (isset($path[2])) {$param = $path[2];} else {$param = "";}

$method = $_SERVER["REQUEST_METHOD"]; 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

//banco de dados
include_once "classes/db.class.php";

//rotas
include_once "rotas/index.php";



// Respostas
$jsonResponse = json_encode($responseData);
http_response_code($responseData['code']);
// Enviando a resposta JSON de volta ao cliente
echo $jsonResponse;
exit;

?>