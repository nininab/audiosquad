<?php
require_once "$_SERVER[DOCUMENT_ROOT]/../config/settings.php";
require_once "$_SERVER[DOCUMENT_ROOT]/../config/config.php";
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);
set_time_limit(0);


if (!empty(DB_CON_STR['LBP'])) {
    $opt=[
    PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES=>false,
    ];
    $pdo=new PDO(DB_CON_STR['LBP'],DB_PAR['user'],DB_PAR['pass'],$opt);

}

$array = [
    ["1","Percussion 001 A","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion 001 A.wav","","2","5",""],
["1","Percussion 002 A","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion 002 A.wav","","2","5",""],
["1","Percussion 003 D#","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion 003 Dsharp.wav","","2","5",""],
["1","Percussion 004 G","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion 004 G.wav","","2","5",""],
["1","Percussion 005 C","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion 005 C.wav","","2","5",""],
["1","Percussion 006 D","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion 006 D.wav","","2","5",""],
["1","Percussion 007 G#","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion 007 Gsharp.wav","","2","5",""],
["1","Percussion 016","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion 016.wav","","2","5",""],
["1","Percussion Loop 001","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion Loop 001.wav","","2","5",""],
["1","Percussion Loop 002 (triplets)","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion Loop 002 (triplets).wav","","2","5",""],
["1","Percussion Loop 003 (triplets)","/products/kits/packs/Galwaro Sample Pack Vol 1/Drums/Percussions/Percussion Loop 003 (triplets).wav","","2","5",""],







];


foreach ($array as $arr) {
    $arr[3] = (!empty($arr[3])) ? $arr[3]: null;
    
    $arr[5] = (!empty($arr[5])) ? $arr[5]: null;
    $arr[6] = (!empty($arr[6])) ? $arr[6]: null;
    $stmt=$pdo->prepare('INSERT INTO kits_products (id_kit, name, path, genre, type, subtype, key_) VALUES (:id_kit, :name, :path, :genre, :type, :subtype, :key_)');
    $stmt->execute([
        'id_kit' => $arr[0], 
        'name' => $arr[1], 
        'path' => $arr[2], 
        'genre' =>$arr[3], 
        'type' => $arr[4],  
        'subtype' =>$arr[5], 
        'key_' => $arr[6]
    ]);
    $genres = $stmt->fetchAll();
    $stmt->closeCursor();
}

?>