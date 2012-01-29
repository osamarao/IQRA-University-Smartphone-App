<?php
require ("common/Iqra.php");
require ("common/simple_html_dom.php");

header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/json');

$RegId = "";
$Pwd = "";

if (isset($_REQUEST["id"])) {
	$RegId = $_REQUEST["id"];
}

if (isset($_REQUEST["pwd"])) {
	$Pwd = $_REQUEST["pwd"];
}

$out = Login($RegId, $Pwd);
$output = array("login" => $out);
echo json_encode($output);
?>