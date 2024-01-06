<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    
    $_POST = json_decode(file_get_contents('php://input'), true);

    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['birth']) && isset($_POST['pass'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $data_nasc = $_POST['birth'];
        $senhaUsuario = $_POST['pass'];

        $host = 'localhost';
        $usuario ='root';
        $senha = '';
        $banco = 'fitconnect';
        $conexao = mysqli_connect($host,$usuario,$senha,$banco);

        //validação de dados 

        if (!$conexao) {
            die('falha na conexao com o banco de dados:'. mysqli_connect_error());
        }

        $sqlSearch = "SELECT * FROM usuario WHERE email = '$email'";
        $resultSearch = mysqli_query($conexao, $sqlSearch);

        if ($resultSearch  -> num_rows) {
            $response = array('error' => 'O e-mail inserido já está cadastrado.');
            echo json_encode($response);
            mysqli_free_result($resultSearch);
            exit();
        }

        //inserindo dados na base de dados 
        
        $sql = "INSERT INTO usuario (name, email, birth, pass) VALUES ('$name', '$email', '$data_nasc', '$senhaUsuario')";
        if (mysqli_query($conexao, $sql)) {
            $response = array ('message' => 'Cadastrado com sucesso!');
            echo json_encode($response);
        } else {
            $response = array('error' => 'Erro ao inserir dados: '. mysqli_error($conexao));
            echo json_encode($response);
        }
        mysqli_close($conexao);
    } else {
        $response = array('error' => 'Dados ausentes no formulário.');
        echo json_encode($response);
    }
    ?>
