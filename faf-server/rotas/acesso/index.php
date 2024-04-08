<?php
 	if ($method == "POST" && $acao == "entrar") {
        include_once "entrar.php";
    }else if ($method == "POST" && $acao == "sair") {
        include_once "sair.php";
    }else if ($method == "POST" && $acao == "cadastro") {
        include_once "cadastro.php";
    }else if ($method == "DELETE" && $acao == "remove") {
        include_once "remove.php";
    }else{
    	$responseData =  notFound();
    }
?>