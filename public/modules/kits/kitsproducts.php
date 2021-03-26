<?php 
require_once __DIR__.'/../../../config/config.php';
require_once "controls/kits_functions.php";
if (!empty($_GET['id_kit'])) {
    
    $stmt=$pdo->prepare('SELECT id, name FROM genres');
    $stmt->execute();
    $genres = $stmt->fetchAll();
    $stmt->closeCursor();

    $stmt=$pdo->prepare('SELECT * FROM kits WHERE id=?');
    $stmt->execute([$_GET['id_kit']]);
    $thiskit = $stmt->fetch();
    $stmt->closeCursor();
?>
<!DOCTYPE html>
<html itemscope="" itemtype="http://schema.org/WebPage" lang="<?php echo $_SESSION['lang'];?>-CA">
<head>
    <?php echo GetCSSLinkhead();?>
    
</head>

<body>
<!-- <div style="width:100%; height:1000px; background-color:#a0c0a0;"> -->
<div id="wrapper">
    <div id="page-wrapper" class="black-bg">
        <?php echo display_header ($pdo, $translator, $navmenu);?>

        <div class="row row_product_page">
            <div class="col-lg-10 product_page">
                <div class="subcadre">
                    <div class="row">
                        <div class="col-lg-12">
                            <a class="btn btn-sm btn-white" href="kits_page.php"><i class="fa fa-arrow-left"></i> Back</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12" style="border-bottom: 1px solid #dedede;">
                            <h1><?php echo $thiskit['name'];?></h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <?php echo GetkitHierarchy($pdo, $translator, $_GET['id_kit']);?>
                        </div>
                        <div class="col-lg-9" id="right_panel">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php echo display_footer ($translator) ;?>
<!-- <script src="/../css/plugins/Puremedia10/js/init.js"></script> -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" type="text/javascript"></script> 
<script src="/js/plugins/chosen/chosen.jquery.min.js"></script>
<script src="/js/functions.js" ></script>
<script src="https://unpkg.com/wavesurfer.js"></script>

<script>
    var wavesurfer = [];
    function GetProducts (id_kit, id_type, id_sub_type = '') {
        
        $.ajax({
            method: "GET",
            url: "controls/kits_form.php?GetProducts=true&id_kit=" + id_kit + "&id_type=" + id_type + "&id_sub_type=" + id_sub_type
        }).done(function(msg) {
            if (msg !== "") {
                $(".hierarchy1").removeClass("selected");
                $("#panelheading" + id_type).addClass("selected");
                if (id_sub_type != '') {
                    $(".panel_subtype").removeClass("selected");
                    $("#panel_subtype" + id_sub_type).addClass("selected");
                }
                var split = msg.split("/~/");
                if (split[0] != 0) {
                    $("#content_" + id_kit + "_" + id_type).html(split[0]);
                }
                if (split[1] != 0) {
                    $("#right_panel").html(split[1]);
                }
                if (split[2] != 0) {
                    kits_products = JSON.parse(split[2]);
                    for (i=0; i< kits_products.length; i++) {
                        creation_wave(kits_products[i]['id'], kits_products[i]['path']);
                    }
                }
            }
        });
    }
    function creation_wave (id, path) {
        var ctx = document.createElement('canvas').getContext('2d');
        var linGrad = ctx.createLinearGradient(0, 64, 0, 200);
        linGrad.addColorStop(0.5, 'rgba(230, 216, 243, 1.000)');
        linGrad.addColorStop(0.5, 'rgba(183, 183, 183, 1.000)');

       
        wavesurfer[id] = WaveSurfer.create({
            container: '#waveform'+id,
            waveColor: linGrad,
            progressColor: 'hsla(200, 100%, 30%, 0.5)',
            cursorColor: 'grey',
            // This parameter makes the waveform look like SoundCloud's player
            // barWidth: 3
        });
        wavesurfer[id].load(path);
        // return wavesurfer[id];
    }
    
    
    function playPause (id) {
        wavesurfer[id].playPause();

        wavesurfer[id].on('loading', function (percents) {
            document.getElementById('progress').value = percents;
        });
        wavesurfer[id].on('ready', function (percents) {
            document.getElementById('progress').style.display = 'none';
        });
    }
    function skipBackward(id) {
        wavesurfer[id].skipBackward();
    }
    function skipForward(id) {
        wavesurfer[id].skipForward();
    }
    
  
</script>

  </body>
</html>
<?php 
}
?>



