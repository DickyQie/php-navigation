<?php

namespace Admin\Controller;

use Think\Controller;
use Think\Page;
/****
 * 热门管理
 * @author zhangqie
 *
 */
class HotController extends Controller{
	
	function lists(){
		
		$keyword=I('keyword','','trim');
		if ($keyword) {
			$map['title']=array('like',"%$keyword%");
			$this->assign('keyword',$keyword);
		}
		
		$map['type']=I('type',0,'int');
		
		
		$model=new \Model\HotModel();
		$count=$model->getCount($map);
		$row=5;
		$page=new Page($count,$row);
		
		$data=$model->getListData($map,$page);
		
		//showdata($data);
		
		
		$this->assign('hot',$data);
		$this->assign('page',$page->show());
		
		
		$this->display();
		
	}
	
	
	/****
	 * 添加
	 */
	function add(){
		if(!IS_POST){
			$this->display();
		}else {
			$post=I('post.');
			$model=new \Model\HotModel();
			if($model->addHot($post)){
				$this->success("添加成功",U('lists'));
			}else {
				$this->error("添加失败");
			}
		}
	}
	
	/****
	 * 修改
	 */
	function edit(){
		if(!IS_POST){
			$id=I('id',0,'int');
			$hot=M('hot')->where('id='.$id)->find();
			
			$this->assign('data',$hot);
			$this->display();
		}else {
			$post=I('post.');
			//showdata($post);
			$res=M('hot')->save($post);
			if($res){
				$this->success("修改成功",U('lists'));
			}else {
				$this->error("修改失败");
			}
		}
	}
	
	/****
	 * 删除
	 */
	function delete(){
		$id=I('id',0,'int');
		$res=M('hot')->where('id='.$id)->delete();
		if ($res){
			$this->ajaxReturn("删除成功");
		}else {
			$this->ajaxReturn("删除失败");
		}
	}
	
	
	
	/****
	 * 多项删除
	 */
	function delAll(){
		$ids=I('ids',0);
		$map['id']=array('in',$ids);
		$res=M('hot')->where($map)->delete();
		if($res){
			$this->ajaxReturn("删除成功");
		}else{
			$this->ajaxReturn("删除失败");
		}
		
	}
	
	
	
	
	
}