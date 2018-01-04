<?php



function get_cover_url($picture){
	if($picture){
		$url = __ROOT__.'/Uploads/'.$picture;
	}else{
		$url = __ROOT__.'/Uploads/photo.jpg';
	}
	return $url;
}