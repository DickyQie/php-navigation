<?php

namespace Model;

use Think\Model;
class HotModel extends Model{
	
	//--------后台-------
	
	function getCount($map){
		return D('Hot')->where($map)->count();
	}
	
	function getListData($map,$page){
		$data=M('Hot')->where($map)->order("sort asc")
		->limit($page->firstRow.','.$page->listRows)->select();
		return $data;
	}
	
	function addHot($data){
		return M('hot')->add($data);
	}
	
	
	
	//---------------------------前台--------------------
	function getdata($type=0){
		$info=D('Hot')->where("type=$type")->select();
		return $info;
	}
	
	/****
	 * M查询:实例化一个没有模型文件的Model
	 * Model 名称可以不对应
	 * 
	 * D: XXModel  XX要对应
	 * @return Ambigous <mixed, boolean, string, NULL, multitype:, unknown, object>
	 */
	
	function getDatalist(){
		$infom=M("High_level")->where(array("layout"=>"bottom"))->select();
		foreach ($infom as $v){
			$infolist=M("datalist")->where(array('high_id'=>$v['id']))->select();
			$arrdata[$v['high_name']]=$infolist;
		}
		return $arrdata;
		
	}
	
	function getElementary($id) {
		$info=M("elementary_level")->where(array('middle_id'=>$id))->select();
		foreach ($info as $v){
			
			$infodata=M("datalist")->where(array('middle_id'=>$id,'elementary_id'=>$v['id']))->select();
			$count=M('datalist')->where(array('elementary_id'=>$v['id']))->count();
			$key=$v['elementary_name'].'('.$count.')';
			$datalist[$key]=$infodata;
		}
		return $datalist;
	}
	
}