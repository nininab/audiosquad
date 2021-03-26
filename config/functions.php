<?php
function GetMenus($pdo, $translator) {
    $stmt=$pdo->prepare('SELECT * FROM metismenus');
    $stmt->execute();
    $metismenus = $stmt->fetchAll();
    $stmt->closeCursor();
    
    $navmenu = [];
    foreach ($metismenus as $kmenu=>$menu) {
        $stmt=$pdo->prepare('SELECT * FROM bulletsmenus WHERE id_menu = :id_menu');
        $stmt->execute(['id_menu' => $menu['id']]);
        $bulletsmenus = $stmt->fetchAll();
        $stmt->closeCursor();

        $navmenu[$menu['name']]['info'] = $menu;
        $navmenu[$menu['name']]['bulletsmenus'] = $bulletsmenus;

        if (!empty($bulletsmenus)) {
            foreach ($bulletsmenus as $kbulmenu => $bulmenu) {
                $stmt=$pdo->prepare('SELECT a.*, b.category_'.$_SESSION['lang'].' as category_name, b.href FROM bulletsitems a LEFT JOIN categories b ON a.category = b.id WHERE a.id_bullet_menu = :id_bullet_menu');
                $stmt->execute(['id_bullet_menu' => $bulmenu['id']]);
                $bulletsitems = $stmt->fetchAll();
                $stmt->closeCursor();
                $navmenu[$menu['name']]['bulletsmenus'][$kbulmenu]['bulletsitems'] = $bulletsitems;
            }
        }
    }
   
    return $navmenu;
}
function GetCategories($pdo, $translator) {
    $stmt=$pdo->prepare('SELECT id , category_'.$_SESSION['lang'].' as category, cover_img, href FROM categories');
    $stmt->execute();
    $categories = $stmt->fetchAll();
    $stmt->closeCursor();

    return $categories;
}
?>