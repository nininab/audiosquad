<?php
function GetCSSLinkhead() {
    return '
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audiosquad</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/style4.css" rel="stylesheet">
    <link href="/css/audiosquad.css" rel="stylesheet">
    <link href="/css/animate.css" rel="stylesheet">
    <link href="/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="/css/plugins/dataTables/datatables.bootstrap.min.css" rel="stylesheet">
    <link href="/css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
    <link href="/css/plugins/jqGrid/ui.jqgrid.css" rel="stylesheet">
    <link href="/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="/css/plugins/chosen/bootstrap-chosen.css" rel="stylesheet">
    <link href="/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" rel="stylesheet">
    <link rel="shortcut icon" href="/AS_logo.png" type="image/ico" />
    ';

}
function display_header ($pdo, $translator, $navmenu) {
    
    $lang = ($_SESSION['lang'] == "en") ? "FR" : "ENG";

    $output = '
    <div class="row border-bottom headernav affix" data-spy="affix" data-offset-top="50">
        <nav class="navbar navbar-static-top">
            <ul class="nav navbar-top-links navbar-left">
                <div class="subnav">
                    <li class="site_nav_li subnavbtn">
                        <img src="/img/logo/AS logo/AS_logo_Whitetoblacktranspcrop.png" width="70"/>
                    </li>
                </div>
               ';
                foreach ($navmenu['accueil']['bulletsmenus'] as $menu) {
                    // var_dump($menu);
                    // var_dump($_SERVER['PHP_SELF']);
                    $output .= '
                    <div class="subnav">
                        <li class="site_nav_li subnavbtn';
                        if ($menu['href'] == $_SERVER['PHP_SELF']) {
                            $output .= ' custactive';
                        }
                        $output .= '"><a class="subnav_a" href="'.$menu['href'].'">'.$menu['name_'.$_SESSION['lang']].'</a>
                        </li>';
                        if (!empty($menu['bulletsitems'])) {
                            $output .= '
                            <div class="subnav-content">';
                                foreach ($menu['bulletsitems'] as $bulletsitems) {
                                    $output .= '<a href="'.$bulletsitems['href'].'">'.mb_strtoupper($bulletsitems['category_name'], "UTF-8").'</a>';
                                }
                                $output .= '
                            </div>';
                        }
                       
                        $output .= '
                    </div>
                    ';
                }
                $output .= '
            </ul>
            <ul class="nav navbar-top-links navbar-right">
                <li class=" site_nav_icon"><a><i class="fa fa-shopping-cart" style="font-size: 1.3em;"></i></a></li>
                <li class=" site_nav_icon"><a><i class="fa fa-facebook" style="font-size: 1.3em;"></i></a></li>
                <li class=" site_nav_icon"><a><i class="fa fa-instagram" style="font-size: 1.3em;"></i></a></li>
                <li class="site_nav_li"><a>'.$lang.'</a></li>
                <li class="site_nav_li"><a><i class="fa fa-connectdevelop"></i> '.$translator->trans('label.login').'</a></li>
            </ul>
        </nav>
    </div>
    ';
    return $output;
}

?>