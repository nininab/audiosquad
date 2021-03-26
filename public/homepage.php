<?php
require_once __DIR__.'/../config/config.php';

?>
<!DOCTYPE html>
<html itemscope="" itemtype="http://schema.org/WebPage" lang="<?php echo $_SESSION['lang'];?>-CA">
<head>
    <?php echo GetCSSLinkhead();?>
</head>

<body>
<!-- <div style="width:100%; height:1000px; background-color:#a0c0a0;"> -->
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <?php echo display_header ($pdo, $translator, $navmenu);?>
    <!-- <img src="/img/logo/AS logo/AudioSquad_logo_Whitetoblack.jpg" style="z-index:1000;position: absolute;
    left: 20%;
    right: 20px;
    top: 20%;"/> -->
        <img id="bcd_img" class="background_img" src="/img/logo/AS logo/AudioSquad_logo_Whitetoblackgross.jpg" width="100%" height="500px">
        <div class="row" style="">
            <?php 
            // <img src="'.$cat['cover_img'].'" width="100%" height="auto"/>
            foreach ($categories as $cat) {
                echo '
                <div class="col-lg-4" style="padding: 20px; height: 300px; background-color: #040404;">
                    
                    <div onclick="window.location.replace(\''.$cat['href'].'\')" class="featured-card__header text-center">
                        <h2><b>'.mb_strtoupper($cat['category'], "UTF-8").'</b></h2>
                    </div>
                </div>';
            }
            ?>
        </div>
        <?php echo display_footer ($translator) ;?>
    </div>
   
</div>

<!-- <script src="/../css/plugins/Puremedia10/js/init.js"></script> -->
<script src="/js/plugins/chosen/chosen.jquery.min.js" defer></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" type="text/javascript"></script> 
<script>

</script>

  </body>
</html>

