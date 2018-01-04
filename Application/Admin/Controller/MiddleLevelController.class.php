<?php

namespace Admin\Controller;

use Think\Controller;

/****
 * 中级分类
 * @author zhangqie
 *
 */
class MiddleLevelController extends Controller{
	
	
	function lists(){
		
		$keyword=I('keyword','','trim');
		if ($keyword){
			$arr['middle_name']=array('like',"%$keyword%");
			$this->assign('keyword',$keyword);
		}
		
		$middle=M('middle_level');
		
		$count=$middle->where($arr)->count();
		
		$row=8;
		
		$page=new \Think\Page($count,$row);
		
		$info=$middle->where($arr)->order("high_id desc,sort desc")->
		limit($page->firstRow.','.$page->listRows)->select();
		
		
		
		//showdata($count);
		
		$this->assign('datalists',$info);
		$this->assign('title','中级分类管理');
		$this->assign('page',$page->show());
		
		
		$this->display();
	}
	
	/***
	 * 添加
	 */
	function add(){
		if (IS_POST){
			$model=M('middle_level');
			$arr=I('post.');
			$res=$model->add($arr);
			if ($res){
				$message="添加成功";
				$this->success($message,U('lists'));
			}else{
				$message="添加失败";
				$this->error($message);
			}
		}else {
			$high=M('high_level');
			$info=$high->select();
			$this->assign('high_level',$info);
			$this->assign('type',"add");
			$this->display();
		}
	}
	
	
	/****
	 * 修改
	 * 第一：查询  显示修改数据
	 * 第二：修改数据
	 */
	function update(){
		$middle=M('middle_level');
		$map['id']=$id=I('id',0,'int');
		if (IS_POST){
			$post=I('post.');
			$res=$middle->where($map)->save($post);
			if ($res){
				$this->success('修改成功','lists');
			}else {
				$this->error('修改失败');
			}
		}else {
			$high_level=M('high_level');
			$info=$high_level->select();
			$data=$middle->where($map)->find();
			$this->assign('high_level',$info);
			$this->assign('data',$data);
			$this->assign('type',"update");
			$this->display('add');
		}
	}
	
	
	/****
	 * 单个删除
	 */
	function delete(){
		$map['middle_id']=$middle_id=I('id',0,'int');
		$res=M('elementary_level')->where($map)->select();
		if ($res){
			$message="所属分类下有很多子类,不能删除";
			$this->ajaxReturn($message);
		}else {
			$delete=M('middle_level');
			$res=$delete->where('id='.$middle_id)->delete();
			if ($res){
				$message="删除成功";
			}else {
				$message="删除失败";
			}
			$this->ajaxReturn($message);
		}
		
	}
	
	/****
	 * 多个删除
	 */
	function delAll(){
		$ids=I('ids',0);
		$where['middle_id']=array('in',$ids);
		$res=M('elementary_level')->where($where)->select();
	 	if ($res){
			$message="该分类下包含多个文件,不能删除";
			$this->ajaxReturn($message);
		}else {
			$id['id']=array('in',$ids);
			$rmn=M('middle_level')->where($id)->delete();
			if ($rmn){
				$this->ajaxReturn("删除成功");
			}else {
				$this->ajaxReturn("删除失败");
			}
		} 
	}
	
}