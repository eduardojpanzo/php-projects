<?php 
$URL_SERVER_FILES = "http://localhost/php-projects/faf-server/uploads/";

$responseData = [
    'data' => [],
    'code' => 404,
    'message' => 'Rota não encotrado',
];

function sucess($data, $msg = 'Success') {
   return [
        'data' => $data?$data:[],
        'code' => 200,
        'message' => $msg,
    ];
}

function sucessOnlyMessage($msg="Executado com sucesso") {
    return [
         'code' => 200,
         'message' => $msg,
     ];
}

function forbidden($msg="Operação é Proibida") {
    return [
        'code' => 401,
        'message' => $msg,
    ];
}

function Unauthorized($msg="Operação não é autorizada") {
    return [
        'code' => 401,
        'message' => $msg,
    ];
}

function notFound($msg = "Rota não encotrado") {
    return [
        'code' => 404,
        'message' => $msg,
    ];
}


function notAllowed($msg = "Operação não é permitido") {
    return [
        'code' => 405,
        'message' => $msg,
    ];
}

function BadRequest($msg = "Deu algum erro na requisição feita") {
    return [
        'code' => 500,
        'message' => $msg,
    ];
}


// ---------


 function DataToSqlInsertInto($data, $table){
    foreach ($data as $key => $value) {
        $array[$key] = $value;
    }

    $sql = "INSERT INTO {$table} (";
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

    return $sql;
}

function DataToSqlUpdateSet($data, $table,$id,$id_value){
    foreach ($data as $key => $value) {
        $array[$key] = $value;
    }

    $sql = "UPDATE {$table} SET ";
    $contador = 1;
    foreach (array_keys($array) as $indece){    
        if (count($array)>$contador) {
            $sql .= "{$indece} = '{$array[$indece]}', ";
        } else {
            $sql .= "{$indece} = '{$array[$indece]}' ";
        }
        $contador++;
    }
    $sql .= "WHERE {$table}.{$id} = {$id_value}";
    return $sql;
}

function selectOneRow($sql){
    $db = DB::connect();
    $resp = $db->prepare($sql);
    $resp->execute();
    $data = $resp->fetchObject();

    return $data;
}

function selectOneRowLikeArray($sql){
    $db = DB::connect();
    $resp = $db->prepare($sql);
    $resp->execute();
    $data = $resp->fetch(PDO::FETCH_ASSOC);

    return $data;
}

function selectAllRow($sql){
    $db = DB::connect();
    $resp = $db->prepare($sql);
    $resp->execute();
    $data = $resp->fetchAll(PDO::FETCH_ASSOC);

    return $data;
}

 ?>