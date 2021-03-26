<?php 
function display_footer ($translator) {
    $output= ' ';
    if ($_SESSION['lang']=="fr") {
      $translate['copyright'] = '&copy; ' . date("Y") . " Audiosquad - Tous droits réservés";
    } elseif ($_SESSION['lang']=="en") {
      $translate['copyright'] = '&copy; ' . date("Y") . " Audiosquad - All rights reserved";
    }
    $output = '
    <div class="footer">
        <div class="row">
            <div class="col-lg-4">
                <h2>Collection</h2>
                <ul style="list-style:none;margin: 0; padding: 0;">
                    <li class="site-footer__list-item fontsize_1_3em"><a class="text-muted" href="/modules/kits/kits_page.php">Kits</a></li>
                    <li class="site-footer__list-item fontsize_1_3em"><a class="text-muted" href="/modules/kits/loops_page.php">Loops</a></li>
                    <li class="site-footer__list-item fontsize_1_3em"><a class="text-muted" href="/modules/kits/presets_page.php">Presets</a></li>
                </ul>
            </div>
            <div class="col-lg-4">
                <h2>Suivez-nous</h2>
                <ul class="text-left" style="list-style:none;margin: 0; padding: 0;">
                    <li class="site_nav_icon" style="margin: 10px;"><a class="text-muted"><i class="fa fa-facebook" style="font-size: 1.3em;"></i></a></li>
                    <li class="site_nav_icon" style="margin: 10px;"><a class="text-muted"><i class="fa fa-instagram" style="font-size: 1.3em;"></i></a></li>
                </ul>
            </div>
            <div class="col-lg-4">
                <h2>Audiosquad</h2>
                <ul style="list-style:none;margin: 0; padding: 0;">
                    <li class="site-footer__list-item fontsize_1_3em"><a class="text-muted" href="/modules/kits/kits_page.php">audiosquad@hotmail.com</a></li>
                    <li class="site-footer__list-item fontsize_1_3em"><a class="text-muted" href="/modules/kits/loops_page.php">Montreal, Qc</a></li>
                    <li class="site-footer__list-item fontsize_1_3em"><a class="text-muted" href="/modules/kits/presets_page.php">FAQ</a></li>
                    <li class="site-footer__list-item fontsize_1_3em"><a class="text-muted" href="/modules/kits/presets_page.php">FAQ</a></li>
                    <li class="site-footer__list-item fontsize_1_3em"><a class="text-muted" href="/modules/kits/presets_page.php">'.$translator->trans('label.contact_us').'</a></li>
                </ul>
            </div>
        </div>
        <div class="row" style="border-top: 1px solid grey; padding: 10px;">
            <div class="col-lg-6">
                <div class="m-t-sm">'.$translate['copyright'].'</div>
            </div>
            <div class="col-lg-6">
                <div class="icon-container pull-right m-t-sm" style="font-size: 22px;">
                    <i class="fa fa-cc-visa m-r-xs" style="color:grey;"></i>
                    <i class="fa fa-cc-mastercard m-r-xs" style="color:grey;"></i>
                    <i class="fa fa-cc-paypal  m-r-xs" style="color:grey;"></i>
                </div>
            </div>
        </div>
      
    </div>';
  
    return $output;
}
?>