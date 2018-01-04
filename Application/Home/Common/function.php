<?php

	function get_middle_name_by_id($middle_id){
		$middle_name = M('middle_level')->where(array('id'=>$middle_id))->getField('middle_name');
		return $middle_name;
	}
