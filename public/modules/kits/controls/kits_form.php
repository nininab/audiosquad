<?php 
require_once __DIR__.'/../../../../config/config.php';
require_once "kits_functions.php";

if (!empty($_GET['GetProducts']) AND !empty($_GET['id_kit']) AND !empty($_GET['id_type'])) {
    $stmt=$pdo->prepare('SELECT a.*, b.id_kit FROM sub_types a LEFT JOIN kits_hierarchy b ON b.id_type = a.id_type WHERE b.id_kit = ? AND a.id_type = ?');
    $stmt->execute([$_GET['id_kit'], $_GET['id_type']]);
    $kits_hierarchy_sub_types = $stmt->fetchAll();
    $stmt->closeCursor();

    // var_dump($_GET['id_kit']);
    // var_dump($_GET['id_type']);
    // var_dump($kits_hierarchy_sub_types);

    if (!empty($kits_hierarchy_sub_types) AND empty($_GET['id_sub_type'])) {
        echo GetkitsubHierarchy($pdo, $translator, $kits_hierarchy_sub_types);
        echo '/~/';
        echo '<p class="text-center m-t-xl"><em>'.$translator->trans('label.no_data.nofiles').'</em></p>';
        echo '/~/';
        echo 0;
    } else {
        $stmt='SELECT a.id, a.id_kit, a.name, a.path, b.type, c.key_ 
        FROM kits_products a 
        LEFT JOIN types b ON a.type = b.id 
        LEFT JOIN keys_ c ON a.key_ = c.id
        WHERE a.id_kit = ? AND a.type = ?';
        if (!empty($_GET['id_sub_type'])) {
            $stmt.=' AND a.subtype='.$_GET['id_sub_type'];
        }
        $stmt=$pdo->prepare($stmt);
        $stmt->execute([$_GET['id_kit'], $_GET['id_type']]);
        $kits_products = $stmt->fetchAll();
        $stmt->closeCursor();

        echo 0;
        echo '/~/';
        if (!empty($kits_products)) {
            foreach ($kits_products as $kprod=>$prod) {
                echo Get_audios_wav ($pdo, $translator, $prod);
              
            }
        } else {
            echo '<p class="text-center m-t-xl"><em>'.$translator->trans('label.no_data.nofiles').'</em></p>';
        }
        
        echo '/~/';
        echo json_encode($kits_products);
    }

}

?>