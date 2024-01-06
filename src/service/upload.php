<?php
$msg       = "";
$msg_class = "";
$conn      = mysqli_connect("localhost", "root", "", "img_upload");

if (isset($_POST['save_profile'])) {
    // Para a base de dados
    $bio              = stripslashes($_POST['bio']);
    $profileImageName = time() . '-' . $_FILES["profileImage"]["name"];

    // Upload da imagem
    $target_dir       = "images/";
    $target_file      = $target_dir . basename($profileImageName);
    // VALIDAÇÃO
    // Validação do tamanho da imagem. TAMANHO CALCULADO EM BYTES
    if ($_FILES['profileImage']['size'] > 200000) {
        $msg       = "O tamanho da imagem não deve ser superior a 200Kb";
        $msg_class = "alert-danger";
    }
    // Checando se o arquivo existe
    if (file_exists($target_file)) {
        $msg       = "Arquivo já existe!";
        $msg_class = "alert-danger";
    }
    // Upload da imagem somente quando não apresentar erros
    if (empty($error)) {
        if (move_uploaded_file($_FILES["profileImage"]["tmp_name"], $target_file)) {
            $sql = "INSERT INTO users SET profile_image='$profileImageName', bio='$bio'";
            if (mysqli_query($conn, $sql)) {
                $msg       = "Foi feito o upload da sua imagem com sucesso! Está salvo!";
                $msg_class = "alert-success";
            } else {
                $msg       = "Ocorreu um erro na sua base de dados";
                $msg_class = "alert-danger";
            }
        } else {
            $error = "Ocorreu um erro no upload do arquivo";
            $msg   = "alert-danger";
        }
    }
}
?>