<?php
if($acao == "" && $param = ""){echo json_encode(["ERRO"=> "No way!"]); exit;}

if ($acao == "create" && $param == "") {
    $data = json_decode(trim(file_get_contents("php://input")));
    
    foreach ($data as $key => $value) {
        $array[$key] = $value;
    }

    $sql = "INSERT INTO hotelguest (";
    $contador = 1;
    foreach (array_keys($array) as $indece){    
        if (count($array)>$contador) {
            $sql .= "{$indece},";
        } else {
            $sql .= "{$indece}";
        }
        $contador++;
    }
    $sql .= ") VALUES (";
    $contador = 1;
    foreach (array_values($array) as $value){    
        if (count($array)>$contador) {
            $sql .= "'{$value}',";
        } else {
            $sql .= "'{$value}'";
        }
        $contador++;
    }
    $sql .= ")";

     $db = DB::connect();

    $rs = $db->prepare($sql);
    $exec = $rs->execute();

    if ($exec) {
        echo json_encode(["dado"=>"Inseridos com sucesso!"]);
    }else{
        echo json_encode(["dado"=>"Erro inesperado!"]);
    }
}