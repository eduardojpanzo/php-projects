<?php
 if ($param != "") {
    //busca pelo paramentro id
    $data = selectAllRow("SELECT c.*, jog.nome AS nome_jogador, equi.nome AS equipa_nome FROM contrato c INNER JOIN jogador jog ON c.id_jogador = jog.id_jogador INNER JOIN equipa equi ON c.id_equipa = equi.id_equipa WHERE c.id_equipa = $param");
    
    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
