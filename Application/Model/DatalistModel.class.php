<?php

namespace Model;

use Think\Model;
class DatalistModel extends Model{
	
	function getCount($key){
		
		return D('Datalist')->where($key)->count();
	}
	
	function getData($data,$page){
		$info=D('Datalist')->where($data)->order('sort desc')
		->limit($page->firstRow.','.$page->listRows)->select();
		return $info;
	}
	
	
	
	
}
