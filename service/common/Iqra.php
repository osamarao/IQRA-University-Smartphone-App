<?php
require ("Utility.php");

function getResponse($URI, $Method = false, $Data = NULL) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_URL, $URI);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	if ($Method) {
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $Data);
	}

	$output = curl_exec($ch);
	curl_close($ch);

	return $output;
}

function Login($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_URL, "http://203.101.161.84/sic/siclogin.asp");
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_POSTFIELDS, "regid=" . $RegId . "&pwd=" . $Pwd);
	curl_setopt($ch, CURLOPT_COOKIEJAR, $RegId . ".txt");
	$login_output = curl_exec($ch);
	$login_info = curl_getinfo($ch);
	curl_close($ch);

	if ($login_info["url"] == "http://203.101.161.84/sic/siclogin.asp") {
		return 1;
	} else
		return 0;
}

function getAttendance($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://203.101.161.84/sic/attendance.asp");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $RegId . ".txt");
		$attendance_output = curl_exec($ch);
		$attendance_info = curl_getinfo($ch);
		curl_close($ch);

		return $attendance_output;
	} else {
		return 0;
	}
}
?>