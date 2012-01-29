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

//file_put_contents(date("Y_m_d__H_i_s") . ".txt", $_SERVER["REQUEST_URI"]);

$out = getAttendance($RegId, $Pwd);
$semester = "Unknow Semester";
$attendance = array();
if ($out) {
	$html = str_get_html($out);
	$tables = $html -> find('table[width=790]');
	for ($t = 0; $t < count($tables); $t++) {
		$table = $tables[$t];
		$rows = $table -> find('tr');
		for ($r = 0; $r < count($rows); $r++) {
			$row = $rows[$r];
			if ($r == 0) {
				// semester info
				$semester = trim($row -> children(0) -> plaintext, "  ");
			} else if ($r > 1) {
				$course = trim($row -> children(0) -> plaintext, "  ");
				$session = trim($row -> children(2) -> plaintext, "  ");
				$presents = trim($row -> children(3) -> plaintext, "  ");
				$absents = trim($row -> children(4) -> plaintext, "  ");
				$attendance[count($attendance)] = array("semester" => $semester, "course" => $course, "sessions" => $session, "presents" => $presents, "absents" => $absents);
			}
		}
	}
}
echo json_format(json_encode($attendance));
?>