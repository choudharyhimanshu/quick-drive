<?php
	$directory = $_GET['directory'];
	$path = dirname(dirname( __FILE__)) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR. $directory;
	$content = scandir($path);
	$data = [];
	foreach ($content as $file) {
		if($file == '.' || $file == '..'){
			continue;
		}
		$data[] = array(
			'name' => $file,
			'path' => 'uploads/'.$directory.'/'.$file,
			'size' => filesize($path.$file),
			'uploaded_on' => date("F d Y", filectime($path.$file))
		);		
	}
	echo json_encode($data);
?>