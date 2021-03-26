<?php
if (!defined('DB_PAR')) {
    define("DB_PAR", ['host' => 'localhost', 'user' => 'root', 'pass' => 'Audiosquad200', 'char' => 'utf8']);
}
if (!defined('DB_GLOB')) {
    define("DB_GLOB", "global_configuration");
}
if (!defined('IS_HTTPS')) {
    define("IS_HTTPS", false);
}
if (!defined('HTTP_MODE')) {
    define("HTTP_MODE", 'http');
}
if (!defined('SER_VER')) {
    define("SER_VER", "1.0.1");
}
$_SERVER['HTTP_HOST'] = (!empty($_SERVER['HTTP_HOST'])) ? $_SERVER['HTTP_HOST'] : 'audiosquad.ca';
switch ($_SERVER['HTTP_HOST']) {
    case 'audiosquad.ca':
        if (!defined('DB_LBP')) {
            define("DB_LBP", "audiosquad");
        }
        if (!defined('SER_HOME')) {
            define("SER_HOME", 'http' . ((IS_HTTPS) ? 's' : '' ) . '://audiosquad.ca');
        }
        break;
    // case 'glp.devspartakus.laurentide.com':
    //     define("DB_LBP", "goldcorp");
    //     define("SER_HOME", 'http' . ((IS_HTTPS) ? 's' : '' ) . '://glp.devspartakus.laurentide.com');
    //     define("LBP", ['href' => 'https://www.goldcorp.com', 'logo' => "goldcorp_logo.svg"]);
    //     define("OILAPI", ['user' => 'laurentidefr', 'password' => 'mylabtospartakus']);
    //     break;
    default:
        define("DB_LBP", "");
        define("SER_HOME", 'http' . ((IS_HTTPS) ? 's' : '' ) . '://local.domain');
        break;
}
define("DB_CON_STR", [
    'GLOB' => "mysql:host=".DB_PAR['host'].";dbname=".DB_GLOB.";charset=".DB_PAR['char'],
    'LBP' => "mysql:host=".DB_PAR['host'].";dbname=".DB_LBP.";charset=".DB_PAR['char']
]);
if (!defined('LBP_logo')) {
    // define("LBP_logo", "/img/newlogos/" . DB_LBP . "-clear.svg");
}
if (!defined('soft_logo')) {
    // define("soft_logo", "/img/spartakus-clear.svg");
}   
?>

