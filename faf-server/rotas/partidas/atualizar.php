<?php
$data = json_decode(trim(file_get_contents("php://input")));


if ($param != "") {
    $sql_code = DataToSqlUpdateSet($data, "partidas","id_partida",$param);
    $id_campeonato= $data->id_campeonato;
    $hora_fim= $data->hora_fim;
    $hora_inicio= $data->hora_inicio;
    $data_partida= $data->data;
    $equipa_casa = $data->id_equipa_casa;
    $equipa_fora = $data->id_equipa_fora;

    if ($equipa_casa == $equipa_fora) {
        $responseData = BadRequest("As Equipas de uma partida devem ser diferentes");
        return;
    }

    $campeonato =  buscarCampeonato($id_campeonato);

    $equipas = $campeonato["equipas"];


    $idsEncontrados = verificarEquipasIds($equipas, [$equipa_casa, $equipa_fora]);

    //verificar se as duas equipes pertence ao compeonato
    if (!(count($idsEncontrados) === count([$equipa_casa, $equipa_fora]))) {
        $responseData = BadRequest("As Equipas esscolidas não fazem parte do campeonato selecionado");
        return;
    }

    // se sim verificar se a data da partida está no intervalo do campeonato.
    $timestampEspecifica = strtotime($data_partida);
    $timestampInicio = strtotime($campeonato["data_inicio"]);
    $timestampFim = strtotime($campeonato["data_fim"]);

    if (!($timestampEspecifica >= $timestampInicio && $timestampEspecifica <= $timestampFim)) {
        $responseData = BadRequest("As Equipas esscolidas não fazem parte do campeonato selecionado");
        return;
    }

    $db = DB::connect();
    $resp = $db->prepare($sql_code);
    $result = $resp->execute();
    
    if ($result) {
        $responseData =  sucess($result, "Partida Atualizado com sucesso");
    }
} else {
    $responseData =  notFound();
}