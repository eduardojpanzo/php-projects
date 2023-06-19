<?php
if($acao == "" && $param == ""){echo json_encode(["ERRO"=> "No way!"]); exit;}

if($acao == "delete" && $param == ""){echo json_encode(["ERRO"=> "Necessário informar um cliente!"]); exit;}

if ($acao == "delete" && $param != "") {
    $db = DB::connect();
    $rs = $db->prepare("DELETE FROM clients WHERE id={$param}");
    $exec = $rs->execute();

    if ($exec) {
    echo json_encode(["dado"=>"Excluido com sucesso!"]);
    }else{
    echo json_encode(["dado"=>"Erro inesperado!"]);
    }
}