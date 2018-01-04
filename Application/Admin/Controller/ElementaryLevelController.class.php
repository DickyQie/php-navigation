<?php

namespace Admin\Controller;

use Think\Controller;
use Think\Page;

/****
 * 初级分类
 * @author zhangqie
 *
 */
class ElementaryLevelController extends Controller{
	
	function lists(){
		$keyword=I('keyword','','trim');
		if ($keyword) {
			$map['elementary_name']=array('like',"%$keyword%");
			$this->assign('keyword',$keyword);
		}
		$element=M('elementary_level');
		
		$count=$element->where($map)->count();
		$row=15;
		$page=new Page($count,$row);
		$info=$element->where($map)->order('sort desc')->limit($page->firstRow.','.$page->listRows)->select();
		
		$this->assign('datalists',$info);
		$this->assign('page',$page->show());
		$this->assign('title','初级分类管理');
		$this->display();
	}
	
	/***
	 *添加
	 */
	function add() {
		
		if (!IS_POST){
			$high_level=M('high_level');
			$info=$high_level->select();
			$this->assign('high_level',$info);
			$this->display();
		}else {
			$data=I('post.');
			$res=M('elementary_level')->add($data);
			if ($res){
				$this->success('添加成功',U('lists'));
			}else {
				$this->error("添加失败");
			}
		}
	}
	/**
	 * 修改
	 */
	
	function edit() {
		if (!IS_POST){
			$id=I('id',0,'int');
			$element=M('elementary_level');
			$info=$element->find($id);
			
			$high_level=M('high_level')->select();
			
			
			$high_id = M('middle_level')->where(array('id'=>$info['middle_id']))->getField('high_id');
			
			
			$middle=M('middle_level')->where('high_id='.$high_id)->select();
			
			$this->assign('data',$info);
			$this->assign('high_level',$high_level);
			$this->assign('high_id',$high_id);
			$this->assign('middle_level',$middle);
			$this->display();
		}else {
			$data=I('post.');
			$model=M("elementary_level")->where('id='.$data['id'])->save($data);
			if ($model){
				$this->success('修改成功',U('lists'));
			}else{
				$this->error('修改失败');
			}
		}
	}
	
	
	/***
	 * 删除
	 */
	function delete(){
		$id=I('id',0,'int');
		$data=M('datalist')->where('elementary_id='.$id)->select();
		if($data){
			$message="该分类下包含其他数据,不能删除";
			$this->ajaxReturn($message);
		}else{
			$res=M('elementary_level')->where('id='.$id)->delete();
			if ($res){
				$this->ajaxReturn("删除成功");
			}else {
				$this->ajaxReturn("删除失败");
			}
		}
	}
	
	/**
	 *多项删除
	 */
	function delAll() {
		$ids=I('ids',0);
		$map['elementary_id']=array('in',$ids);
		$datalist=M('datalist')->where($map)->select();
		if ($datalist){
			$message="该分类下包含其他数据,不能删除";
			$this->ajaxReturn($message);
		}else {
			$elid['id']=array('in',$ids);
			$res=M('elementary_level')->where($elid)->delete();
			if($res){
				$mes="删除成功";
			}else {
				$mes="删除失败";
			}
			$this->ajaxReturn($mes);
		}
	}
	
	
	
	/****
	 * 联动
	 * 联表查询
	 */
	function get_middle_info() {
		$map['high_id']=I('high_id',0);
		$info=M('middle_level')->where($map)->field('id,middle_name')->select();
		$option='';
		foreach ($info as $v){
			$option.="<option value=".$v['id'].">".$v['middle_name']."</option>";
		}
		echo $option;
	}
	
	
}