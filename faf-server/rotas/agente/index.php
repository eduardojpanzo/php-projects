<?php
 	if ($method == "POST" && $acao == "criar") {
        include_once "criar.php";
    }else if ($method == "GET" && $acao == "buscar") {
        include_once "buscar.php";
    }else if ($method == "PUT" && $acao == "atualizar") {
        include_once "atualizar.php";
    }else if ($method == "DELETE" && $acao == "remove") {
        include_once "remove.php";
    }else if ($method == "POST" && $acao == "upload") {
        include_once "uploadFile.php";
    }else{
    	$responseData =  notFound();
    }
?>