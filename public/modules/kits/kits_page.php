<?php 
require_once __DIR__.'/../../../config/config.php';
require_once "controls/kits_functions.php";
// use BoyHagemann\Wave\Wave;
$stmt=$pdo->prepare('SELECT id, name FROM genres');
$stmt->execute();
$genres = $stmt->fetchAll();
$stmt->closeCursor();

// $wave = new Wave();
// C:\wamp64\www\audiosquad\public\products\kits\packs\Galwaro Sample Pack Vol 1\Galwaro Sample Pack Vol 1\Bass\Bass 001 C.wav
// $wave->setFilename("$_SERVER[DOCUMENT_ROOT]/products/kits/packs/Galwaro Sample Pack Vol 1/Bass/Bass 001 C.wav");
// var_dump($wave);
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

        <!-- <img id="bcd_img" class="background_img" src="/img/backgrounds/background_as1.jpg" width="100%" height="500px" style="vertical-align:middle;border-bottom: 1px solid grey;box-shadow: 5px 3px 46px 19px;"> -->
        <div class="row row_product_page">
            <div class="col-lg-10 product_page">
                <div class="subcadre">
                    <div class="row">
                        <div class="col-lg-12">
                            <a class="btn btn-sm btn-white" href="/../homepage.php"><i class="fa fa-arrow-left"></i> Back</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12" style="border-bottom: 1px solid #dedede;">
                            <h1>KITS</h1>
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
                    <?php echo GetAllKits ($pdo, $translator);?>
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

    // var ctx = document.createElement('canvas').getContext('2d');
    // var linGrad = ctx.createLinearGradient(0, 64, 0, 200);
    // linGrad.addColorStop(0.5, 'rgba(230, 216, 243, 1.000)');
    // linGrad.addColorStop(0.5, 'rgba(183, 183, 183, 1.000)');
    // var wavesurfer = WaveSurfer.create({
    //     container: '#waveform',
    //     waveColor: linGrad,
    //     progressColor: 'hsla(200, 100%, 30%, 0.5)',
    //     cursorColor: 'grey',
    //     // This parameter makes the waveform look like SoundCloud's player
    //     // barWidth: 3
    // });
    // wavesurfer.load("/products/kits/packs/Galwaro Sample Pack Vol 1/Bass/Bass 001 C.wav");
    
    // function playPause () {
    //     wavesurfer.playPause();

    //     wavesurfer.on('loading', function (percents) {
    //         document.getElementById('progress').value = percents;
    //     });
    //     wavesurfer.on('ready', function (percents) {
    //         document.getElementById('progress').style.display = 'none';
    //     });
    // }
    // function skipBackward() {
    //     wavesurfer.skipBackward();
    // }
    // function skipForward() {
    //     wavesurfer.skipForward();
    // }
    
  
</script>

  </body>
</html>



