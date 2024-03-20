<?php
$data = json_decode(trim(file_get_contents("php://input")));


if ($param == "") {
    
    $nome = $data->nome;
    $senha = $data->senha;

    //busca do user pelo nome
    $data = selectOneRow("SELECT * FROM `usuario` WHERE nome='$nome'");

    if (!$data) {
        $responseData = notFound("Usuário não encontrado");
        return;
    }

    if (password_verify($senha, $data->senha)) {
        $token = bin2hex(random_bytes(66));
        $user_data = [
            "id"=> $data->id_usuario,
            "nome"=> $data->nome,
            "tipo"=> $data->tipo,
            "token"=>$token,
        ];

        $responseData =  sucess($user_data, "acesso feito com sucesso");
        return;
    }

    $responseData =  Unauthorized("Senha ou nome de Usuário não estão corretos");
} else {
    $responseData =  notFound();
}
