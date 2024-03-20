<?php

if($acao == "" && $param == ""){echo json_encode(["ERRO"=> "No way!"]); exit;}

if($acao == "update" && $param == ""){echo json_encode(["ERRO"=> "Necessário informar um cliente!"]); exit;}

if ($acao == "update" && $param != "") {
    $data = json_decode(trim(file_get_contents("php://input")));
    
    foreach ($data as $key => $value) {
        $array[$key] = $value;
    }

    $sql = "UPDATE clients SET ";
    $contador = 1;
    foreach (array_keys($array) as $i){    
        if (count($array)>$contador) {
            $sql .= "{$i} = '{$array[$i]}', ";
        } else {
            $sql .= "{$i} = '{$array[$i]}' ";
        }
        $contador++;
    }
    $sql .="WHERE id={$param}";

    $db = DB::connect();
    $rs = $db->prepare($sql);
    $exec = $rs->execute();

    if ($exec) {
    echo json_encode(["dado"=>"Atualizados com sucesso!"]);
    }else{
    echo json_encode(["dado"=>"Erro inesperado!"]);
    }
}