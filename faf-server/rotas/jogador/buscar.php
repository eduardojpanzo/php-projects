<?php
    $URL_SERVER_FILES .= "jogador/";
if ($param == "") {

    $data = selectAllRow("SELECT j.id_jogador,j.nome AS jogador_nome,j.numero AS jogador_numero, j.posicao AS jogador_posicao,j.data_nascimento AS jogador_data_nascimento, j.sexo AS jogador_sexo,j.nacionalidade AS jogador_nacionalidade, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto, e.id_equipa, e.nome AS equipa_nome FROM jogador j LEFT JOIN fotos f ON j.id_foto = f.id_foto LEFT JOIN contrato c ON j.id_jogador = c.id_jogador LEFT JOIN equipa e ON c.id_equipa = e.id_equipa");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT j.id_jogador,j.nome AS jogador_nome,j.numero AS jogador_numero, j.posicao AS jogador_posicao,j.data_nascimento AS jogador_data_nascimento, j.sexo AS jogador_sexo,j.nacionalidade AS jogador_nacionalidade, CONCAT('$URL_SERVER_FILES', f.nome_arquivo) AS url_foto, e.id_equipa, e.nome AS equipa_nome FROM jogador j LEFT JOIN fotos f ON j.id_foto = f.id_foto LEFT JOIN contrato c ON j.id_jogador = c.id_jogador LEFT JOIN equipa e ON c.id_equipa = e.id_equipa WHERE j.id_jogador = $param");

    if (!$data) {
        $responseData = notFound("Jogador não encontrado");
        return;
    }

    $responseData = sucess($data, 'Executado com sucesso');
}else {
    $responseData =  notFound();
}
