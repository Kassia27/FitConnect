
<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $_POST = json_decode(file_get_contents('php://input'), true);

    // Verificar se as variáveis estão definidas
    if (isset($_POST['email']) && isset($_POST['pass'])) {
        // Receber os dados do formulário
        $email = $_POST['email'];
        $senhaUsuario = $_POST['pass'];

        // Conectar ao banco de dados
        $host = 'localhost';
        $usuario = 'root';
        $senha = '';
        $banco = 'fitconnect';
        $conexao = mysqli_connect($host, $usuario, $senha, $banco);

        // Verificar a conexão
        if (!$conexao) {
            die('Falha na conexão com o banco de dados: ' . mysqli_connect_error());
        }

        // Inserir os dados no banco de dados
        $sql = "SELECT * FROM usuario
                WHERE email = '$email'
                    AND pass = '$senhaUsuario'";

        $result = mysqli_query($conexao, $sql);

        if ($result) {
            if ($result->num_rows == true) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $user_arr[] = $row;
                    
                }
          
                $response = array('message' => $user_arr);
                echo json_encode($response);
            } else {
                $response = array('error' => 'Login e/ou senha incorretos');
                echo json_encode($response);
            }

            mysqli_free_result($result);
            exit();
        } else {
            $response = array('error' => 'Erro ao inserir dados do formulário: ' . mysqli_error($conexao));
            echo json_encode($response);

            exit();
        }

        // Fechar a conexão
        mysqli_close($conexao);
    } else {
        echo 'Dados ausentes no formulário.';
    }
?>
