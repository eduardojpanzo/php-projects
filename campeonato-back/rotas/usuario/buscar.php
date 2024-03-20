<?php

if ($param == "") {
    $data = selectAllRow("SELECT `id_usuario`,  `nome`, `tipo` FROM `usuario`");

    $responseData = sucess($data, 'Executado com sucesso');
} else if ($param != "") {
    //busca pelo paramentro id
    $data = selectOneRow("SELECT  `id_usuario`, `nome`, `tipo` FROM `usuario` WHERE id_usuario = $param");

    if (!$data) {
        $responseData = notFound("Usuário não encontrado");
        return;
    }

    $responseData = sucess($data, 'Criado com sucesso');
}else {
    $responseData =  notFound();
}
