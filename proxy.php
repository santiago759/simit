<?php
if (isset($_GET['placa'])) {
    $placa = htmlspecialchars($_GET['placa']);  // Sanitize user input
    $url = "https://akino.mooo.com/placa.php?placa=" . $placa;
    $response = file_get_contents($url);

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: text/plain");
    echo $response;
} else {
    echo "Placa no proporcionada.";
}
?>
