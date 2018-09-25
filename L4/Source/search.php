<?php
//baarsoe_user oVkqn3c19Ceo
//baarsoe_admin rpp0l9ep3Gyn

//Get database , PHP Data Objects
$db = new PDO('mysql:host=mysql-vt2018.csc.kth.se;dbname=baarsoe;charset=utf8mb4','baarsoe_admin','rpp0l9ep3Gyn');

//Prepare to retrieve lan, objekttyp and rum columns
$queryLan = $db->prepare("SELECT distinct(lan) FROM bostader");
$queryOT = $db->prepare("SELECT distinct(objekttyp) FROM bostader");
$queryRum = $db->prepare("SELECT distinct(rum) FROM bostader");

//Executes prepared statement
$queryLan->execute();
$queryOT->execute();
$queryRum->execute();

//sets variables to fetched content
$resultLan = $queryLan->fetchAll();
$resultOT = $queryOT->fetchAll();
$resultRum = $queryRum->fetchAll();

//gets cookies, if cookie isnt set, set default as value instead
$rum_cookie = $_COOKIE["rum"];
$lan_cookie = $_COOKIE["lan"];
$objekttyp_cookie = $_COOKIE["objekttyp"];
$pris_cookie = $_COOKIE["pris"];
if(!isset($pris_cookie))
    $pris_cookie = "300000,5000000";
$area_cookie = $_COOKIE["area"];
if(!isset($area_cookie))
    $area_cookie = "10,500";
$avgift_cookie = $_COOKIE["avgift"];
if(!isset($avgift_cookie))
    $avgift_cookie = "1000,10000";

?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.7.1/css/bootstrap-slider.css" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.7.1/bootstrap-slider.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    </head>

    <body onload="document.refresh();">

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10"></div>
                <div class="col-md-1"></div>
            </div>

            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <h1>HemNet 2.0</h1>
                    <h2>Hitta din bostad</h2>

                    <!-- send to result with get -->
                    <form class="form-group" action="result.php" method="get">
                        <label for="sel2">Län</label>
                        <select name="lan" class="form-control" id="sel2">
                            <?php
                                //For each element in the column
                                foreach($resultLan as $value){
                                    //if there was a cookie of this sort show the cookied object as selected
                                    if($value['lan'] == $lan_cookie)
                                        echo "<option selected='selected'>" . $value['lan'] . "</option>";
                                        //otherwise just put in list as option
                                    else
                                        echo "<option>" . $value['lan'] . "</option>";
                                }
                            ?>
                        </select>
                    
                        <label for="sel3">Objekttyp</label>
                        <select name="objekttyp" class="form-control" id="sel3">
                            <?php
                                foreach($resultOT as $value){
                                    if($value['objekttyp'] == $objekttyp_cookie)
                                        echo "<option selected='selected'>" . $value['objekttyp'] . "</option>";
                                    else
                                        echo "<option>" . $value['objekttyp'] . "</option>";
                                }
                            ?>
                        </select>
                        
                        <label for="sel1">Minst antal rum</label>
                        <select name="rum" class="form-control" id="sel1">
                            <?php
                                foreach($resultRum as $value){
                                    if($value['rum'] == $rum_cookie)
                                        echo "<option selected='selected'>" . $value['rum'] . "</option>";
                                    else
                                        echo "<option>" . $value['rum'] . "</option>";
                                }
                            ?>
                        </select>
                        
                        <br>
                        <br> 
                        
                        Prisintervall i kr:
                        <b>300 000 &nbsp;</b>
                        <?php
                            //Write the cookied or default value
                            echo '<input name="pris" id="ex2" type="text" class="span2" 
                            value="" data-slider-min="300000" data-slider-max="5000000" 
                            data-slider-step="10000" data-slider-value="[' . $pris_cookie . ']"
                            />';
                        ?>
                        <b>&nbsp; 5 000 000</b>
                        
                        <br>
                        <br>
                        <br>
                        <br> 
                        
                        Area i kvm:
                        <b>kvm 10 &nbsp;</b>
                        <?php
                            //Write the cookied or default value
                            echo '<input name="area" id="ex1" type="text" class="span2" 
                            value="" data-slider-min="10" data-slider-max="500" 
                            data-slider-step="1" data-slider-value="[' . $area_cookie . ']"
                            />';
                        ?>
                        <b>&nbsp; kvm 500</b>
                        
                        <br>
                        <br>
                        <br> 
                        
                        Månadsavgift:
                        <b>1000 &nbsp;</b>
                        <?php
                        //Write the cookied or default value
                            echo '<input name="avgift" id="ex3" type="text" class="span2" 
                            value="" data-slider-min="1000" data-slider-max="10000" 
                            data-slider-step="100" data-slider-value="[' . $avgift_cookie . ']"
                            />';
                        ?>
                        <b>&nbsp; 10000</b>
                        
                        <br>
                        <br>
                        <!-- class is from bootstrap -->
                        <button type="submit" class="btn btn-primary">Sök</button>
                    </form>

                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
        <script>
            var slider = new Slider('#ex1', {
                tooltip: 'always'
            });
            var slider = new Slider('#ex2', {
                tooltip: 'always'
            });
            var slider = new Slider('#ex3', {
                tooltip: 'always'
            });
        </script>
    </body>
</html>