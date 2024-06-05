<?php

//pega os dados enviados do front-end
$data = json_decode(trim(file_get_contents("php://input")));


if ($param == "") {
    $data = selectAllRow("SELECT c.*, jog.nome AS nome_jogador, equi.nome AS equipa_nome FROM contrato c INNER JOIN jogador jog ON c.id_jogador = jog.id_jogador INNER JOIN equipa equi ON c.id_equipa = equi.id_equipa WHERE c.id_jogador = $data->id_jogador");

    if (hasActiveContract($data)) {
        $responseData = BadRequest("O jogador tem um contrato ativo.");
        return;
    }
    
    $sql_code = DataToSqlInsertInto($data, "contrato");
    
    $db = DB::connect();
    $resp = $db->prepare($sql_code);
    $result = $resp->execute();
    
    if ($result) {
        $responseData =  sucess($result, "Criado com sucesso");
    }else{
        $responseData =  BadRequest();
    }
} else {
    $responseData =  notFound();
}
