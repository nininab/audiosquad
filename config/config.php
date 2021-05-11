<?php
require_once __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/../class/User.php';
require_once __DIR__.'/settings.php';
require_once __DIR__.'/header.php';
require_once __DIR__.'/functions.php';
require_once __DIR__.'/footer.php';

use Symfony\Component\Translation\Translator;
use Symfony\Component\Translation\Loader\YamlFileLoader;

session_start();
if (!isset($_SESSION['lang']) || empty($_SESSION['lang'])) {
    /* Locale from Browser */
    if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        $_SESSION['lang'] = (substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) == 'fr') ? 'fr' : 'en';
    } else {
        $_SESSION['lang'] = 'en';
    }
}

if (!empty(DB_CON_STR['LBP'])) {
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO(DB_CON_STR['LBP'], DB_PAR['user'], DB_PAR['pass'], $opt);
}

if (!empty($_SESSION['lang'])) {
    $translator = new Translator($_SESSION['lang']);
    $translator->setFallbackLocales(array('en'));
    $translator->addLoader('yaml', new YamlFileLoader());
    $translator->addResource('yaml', __DIR__."/../translations/labels.$_SESSION[lang].yaml", $_SESSION['lang']);
    $translator->addResource('yaml', __DIR__."/../translations/classes.gb.yaml", "en");
}





$navmenu = GetMenus($pdo, $translator);
$categories = GetCategories($pdo, $translator);

$user = new User();
$user->dbConnect();
?>