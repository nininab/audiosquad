<?php 
require_once __DIR__.'/../config/config.php';
if (isset($_SESSION['home'])) {
    header('Location: ' . $_SESSION['home']);
} else {
    header('Location: homepage.php');

    // ===============================================================================
    // PAGE A METTRE LORS DES MISE A JOUR
    // header('Location: /controls/202.php');
    // ===============================================================================
}
?>