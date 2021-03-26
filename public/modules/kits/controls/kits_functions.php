<?php
function GetAllKits ($pdo, $translator) {

    $stmt=$pdo->prepare('SELECT * FROM kits');
    $stmt->execute();
    $kits_list = $stmt->fetchAll();
    $stmt->closeCursor();

    echo '
    <div class="row">';
    foreach ($kits_list as $kkit=>$kit) {
        // var_dump($kkit);
        echo '
        <div class="col-lg-3">
            <div class="product-box">
                <div class="product-imitation">
                    [ INFO ]
                </div>
                <div class="product-desc">
                    <span class="product-price">$'.number_format($kit['price']).'</span>
                    <a href="kitsproducts.php?id_kit='.$kit['id'].'" class="product-name"> '.$kit['name'].'</a>
                </div>
            </div>
        </div>';
        if ($kkit == 3) {
            
            echo'
            </div>
            <div class="row m-t-sm">
            ';
        }
    }
    echo '</div>';
    
}
function GetkitHierarchy($pdo, $translator, $id_kit) {
    $stmt=$pdo->prepare('SELECT a.id, a.id_kit, a.id_type, b.type FROM kits_hierarchy a LEFT JOIN types b ON a.id_type=b.id WHERE a.id_kit = ? ORDER BY a.id ASC');
    $stmt->execute([$id_kit]);
    $kits_hierarchy = $stmt->fetchAll();
    $stmt->closeCursor();

    if (!empty($kits_hierarchy)) {
        echo '
        <div style="border-left:dashed 1px lightgrey;margin-left:25px;margin-bottom:5px;">
            <div style="margin:5px 0px;">
                <span style="color:lightgrey;">-- </span>
                <strong><i class="fa fa-file-o"></i>&emsp;Documents</strong>
            </div>';
            foreach ($kits_hierarchy as $kkh=>$kh) {
                echo'
                <div class="panel-heading hierarchy1 transform" id="panelheading'.$kh['id_type'].'" style="margin-left: 15px;margin-top: 5px;">
                    <p class="panel-title"><a onclick="GetProducts('.$kh['id_kit'].', '.$kh['id_type'].')"><strong>'.$kh['type'].'</strong></a></p>
                </div>
                <div id="content_'.$kh['id_kit'].'_'.$kh['id_type'].'"></div>';
            }
            echo'
        </div>';
    }
}
function GetkitsubHierarchy($pdo, $translator, $kits_hierarchy_sub_types) { 
    echo '
    <div style="border-left:dashed 1px lightgrey;margin-left:25px;margin-bottom:5px;">
    ';
        foreach ($kits_hierarchy_sub_types as $kkhst=>$khst) {
            echo'
            <div class="panel-heading hierarchy1 panel_subtype transform" id="panel_subtype'.$khst['id'].'" style="margin-left: 15px;margin-top: 5px;">
                <p class="panel-title"><a onclick="GetProducts('.$khst['id_kit'].', '.$khst['id_type'].', '.$khst['id'].')"><strong>'.$khst['subtype'].'</strong></a></p>
            </div>';
        }
        echo'
    </div>
    ';
}
function Get_audios_wav ($pdo, $translator, $prod) {
    echo'
    <div class="row m-t-xl">
        <div class="col-lg-3">
            <h4>'.$prod['name'].'</h4>
            <div class="btn-group" style="width: 100%;">
                
                <a class="btn btn-white btn-lg" onclick="skipBackward('.$prod['id'].');" style="width:25%"><i class="fa fa-step-backward"></i></a>
                <a class="btn btn-white btn-lg" onclick="playPause('.$prod['id'].');" style="width:50%"><i class="fa fa-play"></i> / <i class="fa fa-pause"></i></a>
                <a class="btn btn-white btn-lg" onclick="skipForward('.$prod['id'].');" style="width:25%"><i class="fa fa-step-forward"></i></a>
            </div>
            <div class="row m-t-xs">
                <div class="col-lg-6 text-center">
                    <a class="btn btn-whitecust btn-xl text-muted"><i class="fa fa-thumbs-o-up"></i> '.$translator->trans('label.like').'</a>
                </div>
                <div class="col-lg-6 text-center">
                    <a class="btn btn-whitecust btn-xl text-muted"><i class="fa fa-comment-o"></i> '.$translator->trans('label.comment').'</a>
                </div>
            </div>
        </div>
        <div class="col-lg-9">
            <div id="waveform'.$prod['id'].'"></div>
        </div>
    </div>
    ';
}
?>