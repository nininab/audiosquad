<?php 
require_once __DIR__.'/../../../config/config.php';

$stmt=$pdo->prepare('SELECT id, name FROM genres');
$stmt->execute();
$genres = $stmt->fetchAll();
$stmt->closeCursor();

?>
<!DOCTYPE html>
<html itemscope="" itemtype="http://schema.org/WebPage" lang="<?php echo $_SESSION['lang'];?>-CA">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spartakus</title>
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
    <link href="/css/plugins/chosen/bootstrap-chosen.min.css" rel="stylesheet">
    <link href="/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css" rel="stylesheet">
    
</head>

<body>
<!-- <div style="width:100%; height:1000px; background-color:#a0c0a0;"> -->
<div id="wrapper">
    <div id="page-wrapper" class="black-bg">
        <?php echo display_header ($pdo, $translator, $navmenu);?>

        <!-- <img id="bcd_img" class="background_img" src="/img/backgrounds/background_as1.jpg" width="100%" height="500px" style="vertical-align:middle;border-bottom: 1px solid grey;box-shadow: 5px 3px 46px 19px;"> -->
        <div class="row row_product_page">
            <div class="col-lg-10 product_page">
                <div class="cadre">
                    <div class="subcadre">
                        <div class="row">
                            <div class="col-lg-12" style="border-bottom: 1px solid #dedede;">
                                <h1>Presets</h1>
                            </div>
                        </div>
                        <div class="row m-t-xl">
                            <div class="col-lg-3">
                                <label>Genres</label>
                                <select name="selection_style" id="selection_style" class="chosen-select-width">
                                    <option class="">Select an Option</option>
                                    <?php 
                                    foreach ($genres as $gr) {
                                        echo'<option class="'.$gr['id'].'">'.$gr['name'].'</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                    </div>
                </div>
            </div>
        </div>
    <?php echo display_footer ($translator) ;?>
    </div>
</div>
<!-- <script src="/../css/plugins/Puremedia10/js/init.js"></script> -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" type="text/javascript"></script> 
<script src="/js/plugins/chosen/chosen.jquery.min.js"></script>
<script src="/js/functions.js" ></script>

<script>

</script>

  </body>
</html>



