<?php
if($acao == "" && $param == ""){echo json_encode(["ERRO"=> "No way!"]); exit;}

if($acao == "change" && $param == ""){echo json_encode(["ERRO"=> "Necessário informar O Quarto!"]); exit;}

if ($acao == "change" && $param != "") {
    $data = json_decode(trim(file_get_contents("php://input")));
    
    foreach ($data as $key => $value) {
        $array[$key] = $value;
    }

    $sql = "UPDATE room SET ";
    $contador = 1;
    foreach (array_keys($array) as $i){    
        if (count($array)>$contador) {
            $sql .= "{$i} = '{$array[$i]}', ";
        } else {
            $sql .= "{$i} = '{$array[$i]}' ";
        }
        $contador++;
    }
    $sql .="WHERE id = $param";

    var_dump($sql);

    $db = DB::connect();
    $rs = $db->prepare($sql);
    $exec = $rs->execute();

    if ($exec) {
    echo json_encode(["dado"=>"Atualizados com sucesso!"]);
    }else{
    echo json_encode(["dado"=>"Erro inesperado!"]);
    }
}