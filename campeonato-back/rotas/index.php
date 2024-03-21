<?php
	if ($rota == "acesso") {
		include_once "acesso/index.php";
	} else if ($rota == "jogador") {
		include_once "jogador/index.php";
	}else if ($rota == "campeonato") {
		include_once "campeonato/index.php";
	}else if ($rota == "equipa") {
		include_once "equipa/index.php";
	}else if ($rota == "estadio") {
		include_once "estadio/index.php";
	}else if ($rota == "fotos") {
		include_once "fotos/index.php";
	}else if ($rota == "inscricao") {
		include_once "inscricao/index.php";
	}else if ($rota == "partidas") {
		include_once "partidas/index.php";
	}else if ($rota == "responsavel") {
		include_once "responsavel/index.php";
	}else if ($rota == "resultados") {
		include_once "resultados/index.php";
	}else if ($rota == "tecnico") {
		include_once "tecnico/index.php";
	}else if ($rota == "usuario") {
		include_once "usuario/index.php";
	}else{
		$responseData =  notFound();
	}
?>