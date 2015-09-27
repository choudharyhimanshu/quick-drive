<?php
if(!empty( $_FILES)){
	$directory = $_POST['directory'];
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = dirname(dirname( __FILE__)) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR. $directory ;
	
	try {
		mkdir($uploadPath,0777,true);
		move_uploaded_file( $tempPath, $uploadPath. DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ] );
		$response = array(
			'status' => 200,
			'message' => 'File successfully uploaded to '.$directory.' directory.'
 		);
	}
	catch (Exception $e){
		$response = array(
			'status' => 404,
			'message' => 'Some error occurred. Please try again'
	 	);
	}
}
else {
    $response = array(
		'status' => 400,
		'message' => 'No files recieved.'
 	);
}
echo json_encode($response);
?>