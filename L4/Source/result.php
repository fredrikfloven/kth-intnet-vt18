<?php
//get values from url
$lan = $_GET['lan'];
$objekttyp = $_GET['objekttyp'];
$rum = $_GET['rum'];

//split up and set Min and Max
$area = $_GET['area'];
$area = explode(",",$area);
$areaMin = $area[0];
$areaMax = $area[1];

$pris = $_GET['pris'];
$pris = explode(",",$pris);
$prisMin = $pris[0];
$prisMax = $pris[1];

$avgift = $_GET['avgift'];
$avgift = explode(",",$avgift);
$avgiftMin = $avgift[0];
$avgiftMax = $avgift[1];

//set cookie
setCookie("lan", $lan);
setCookie("objekttyp",$objekttyp);
setCookie("rum",$rum);
setCookie("pris",$_GET['pris']);
setCookie("area",$_GET['area']);
setCookie("avgift",$_GET['avgift']);


$sort = $_GET['sort'];
$direction = $_GET['direction'];

//if sort isn't set, i.e. we dont have a cookie, set price as sorted
if(!isset($sort)){
    $sort = "pris";
}

if(!isset($direction)){
    $direction = "asc";
}
//baarsoe_user oVkqn3c19Ceo
//baarsoe_admin rpp0l9ep3Gyn
$db = new PDO('mysql:host=mysql-vt2018.csc.kth.se;dbname=baarsoe;charset=utf8mb4','baarsoe_admin','rpp0l9ep3Gyn');

//Get elements that fit criteria
$query = $db->prepare("SELECT * FROM bostader WHERE lan = :lan AND objekttyp = :objekttyp AND rum >= :rum
AND pris >= :prisMin AND pris <= :prisMax AND area >= :areaMin AND area <= :areaMax 
AND avgift >= :avgiftMin AND avgift <= :avgiftMax ORDER BY :sort :direction");
//binds the parameters to the criteria for each field, preventing sql injection
$query->bindParam(":lan",$lan);
$query->bindParam(":objekttyp",$objekttyp);
$query->bindParam(":rum",$rum);
$query->bindParam(":prisMin",$prisMin);
$query->bindParam(":prisMax",$prisMax);
$query->bindParam(":areaMin",$areaMin);
$query->bindParam(":areaMax",$areaMax);
$query->bindParam(":avgiftMin",$avgiftMin);
$query->bindParam(":avgiftMax",$avgiftMax);
$query->bindParam(":sort",$sort);
$query->bindParam(":direction",$direction);

$query->execute();

$result = $query->fetchAll();

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
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    </head>
    <body>
        <!-- Show neat hover effect -->
        <table class="table table-hover">
            <thead>
                <tr>
                    <?php 
                        //method for creating headers
                        function create_header($displayName, $columnName) {
                            //Chenges the direction for the url when a sorted column is clicked
                            $newDirection = "asc";
                            if($GLOBALS['sort'] == $columnName && $GLOBALS['direction'] == "asc"){
                                $newDirection = "desc";
                            }
                            //set variable url to extracted url
                            $url = '"' . 
                                "?lan=" . urlencode($GLOBALS['lan']) . 
                                "&objekttyp=" . urlencode($GLOBALS['objekttyp']) . 
                                "&adress=" . urlencode($GLOBALS['adress']) . 
                                "&area=" . urlencode($GLOBALS['areaMin']) . "%2C" . urlencode($GLOBALS['areaMax']) . 
                                "&rum=" . urlencode($GLOBALS['rum']) . 
                                "&pris=" . urlencode($GLOBALS['prisMin']) . "%2C" . urlencode($GLOBALS['prisMax']) .
                                "&avgift=" . urlencode($GLOBALS['avgiftMin']) . "%2C" . urlencode($GLOBALS['avgiftMax']) .
                                "&sort=" . urlencode($columnName) .
                                "&direction=" . urlencode($newDirection) .
                                '"';
                            //set var icon to an icon element with help from fontawesome
                            $icon = "<i class='fa fa-fw fa-sort'></i>";
                            // shows with an arrow the current order being shown for the currently ordered column
                            if($columnName == $GLOBALS['sort']){
                                if($GLOBALS['direction'] == "asc"){
                                    $icon = "<i class='fa fa-fw fa-sort-up'></i>";
                                }
                                else{
                                    $icon = "<i class='fa fa-fw fa-sort-down'></i>";                                    
                                }
                            }
                            //change cursor icon to pointer
                            echo "<th style='cursor: pointer;' scope='col' onclick='document.location = $url'>" . $displayName . $icon . "</th>";
                        }
                        //create table headers
                        create_header('Län', 'lan');
                        create_header('Objekttyp', 'objekttyp');
                        create_header('Address', 'adress');
                        create_header('Bostadsyta', 'area');
                        create_header('Antal rum', 'rum');
                        create_header('Pris', 'pris');
                        create_header('Månadsavgift', 'avgift');

                    ?>
                </tr>
            </thead>
            <tbody> 
                <?php
                    //create table content
                    foreach($result as $value)
                        echo"<tr>" . "<td>" . $value['lan'] . "</td>" . "<td>" . $value['objekttyp'] . "</td>" . "<td>" . $value['adress'] . "</td>" .
                        "<td>" . $value['area'] . "</td>" . "<td>" . $value['rum'] . "</td>" . "<td>" . $value['pris'] . "</td>" .
                        "<td>" . $value['avgift'] . "</td>" . "</tr>";
                ?>
            </tbody>
        </table>
        <button onclick="location.href = 'http://wproj.csc.kth.se/~baarsoe/search.php';" >Tillbaka</button>
    </body>
</html>