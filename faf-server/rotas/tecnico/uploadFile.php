<?php

if (isset($_FILES["foto"]) && isset($_POST["id_entidade"])) {
    $uploadDir = "uploads/tecnico/"; // Diretório para salvar as fotos
    $uploadFile = $uploadDir . basename($_FILES["foto"]["name"]);
    $fotoTipo = pathinfo($uploadFile, PATHINFO_EXTENSION);

    // Verifica se o arquivo é uma imagem
    $isImagem = getimagesize($_FILES["foto"]["tmp_name"]);
    if ($isImagem !== false){
        // Verifica se o arquivo já existe
        if (file_exists($uploadFile)) {
            $responseData = notAllowed("Desculpe, a foto já existe");
        } else {
            // Limita o tamanho da foto (opcional)
            if ($_FILES["foto"]["size"] > 5000000) { // 5MB
                $responseData = notAllowed("Desculpe, a foto é muito grande.");
            } else {
                // Insere os dados no banco de dados
                $nomeArquivo = basename($_FILES["foto"]["name"]);
                $tipo = $fotoTipo;
                $tamanhoArquivo = $_FILES["foto"]["size"];
                $entidadeId = $_POST["id_entidade"];

                $sql_code = "INSERT INTO fotos (nome_arquivo, tipo, tamanho_arquivo) VALUES ('$nomeArquivo', '$tipo', '$tamanhoArquivo')";

                try {
                    $db = DB::connect();
                    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    $resp = $db->prepare($sql_code);
                    $result = $resp->execute();

                    $idFoto = $db->lastInsertId(); // Obtém o ID da foto recém-inserida

                    // Atualiza o ID da foto para o entidade correspondente
                    $sqlUpdate = "UPDATE tecnico SET id_foto={$idFoto} WHERE id_tecnico=${entidadeId}";
                    $resp2 = $db->prepare($sqlUpdate);
                    $result2 = $resp2->execute();

                    // Move o arquivo para o diretório de uploads
                    if ($result && $result2 && move_uploaded_file($_FILES["foto"]["tmp_name"], $uploadFile)) {
                        $responseData =  sucess($result);

                    } else {
                        $responseData = BadRequest("Erro ao enviar foto.");
                    }

                } catch (PDOException $e) {
                    $responseData = BadRequest("Erro ao enviar foto: " . $e->getMessage());
                }
            }
        }
    } else {
        $responseData = notAllowed("O arquivo enviado não é uma imagem.");
    }
}