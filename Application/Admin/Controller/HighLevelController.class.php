<?php

namespace Admin\Controller;

use Think\Controller;

/****
 * 
 * 高级分类
 * @author zhangqie
 *
 */
class HighLevelController extends Controller{
	
	function lists(){
		$keyword=I('keyword','','trim');
		if ($keyword) {
			$whe['high_name']=array('like',"%$keyword%");
			$this->assign('keyword',$keyword);
		}
		
		$model=M("high_level");
		$count=$model->where($whe)->count();
		
		$row=5;
		$page=new \Think\Page($count,$row);
		
		$info=$model->where($whe)->order('sort desc')
		->limit($page->firstRow.','.$page->listRows)->select();
		
		//showdata($info);
		
		$this->assign('page',$page->show());
		$this->assign('datalists',$info);
		$this->display();
	}
	
	/****
	 * 添加和修改
	 */
	function add() {
		$high=M('high_level');
		if(!IS_POST){//编辑显示数据
			$map['id']=$id=I('id',0,'int');
			if ($id){
				$info=$high->where($map)->find();//查询高级分类
				//showdata($info);
				$this->assign('data',$info);
			}
			$this->display();
		}else {
			$data=I('post.');//获取提交数据
			if (!empty($data['id'])){//修改
				$res=$high->save($data);
			}else {//添加
				$res=$high->add($data);
			}
			
			if ($res){
				$this->success("操作成功",U('lists'));
			}else {
				$this->error("添加失败");
			}
		}
	
	}
	
	/****
	 * 单个删除
	 */
	function delete() {
		$map['high_id']=$high_id=I('id',0,'int');
		$high=M('middle_level')->where($map)->select();
		if ($high){
			$message="该分类下有多个子分类,不能删除";
			$this->ajaxReturn($message);
		}else {
			$res=M('high_level')->where("id=$high_id")->delete();
			if ($res){
				$message="删除成功";
			}else {
				$message="删除失败";
			}
			$this->ajaxReturn($message);
		}
	}
	
	
	function delAll(){
		$ids=I('ids',0);
		$where['high_id']=array('in',$ids);
		$middle=M('middle_level')->where($where)->select();
		if ($middle){
			$message="该该分类下有多个子分类,不能删除";
			$this->ajaxReturn($message);
		}else {
			$arrid['id']=array('in',$ids);
			$info=M('high_level')->where($arrid)->delete();
			if ($info){
				$message="删除成功";
			}else {
				$message="删除失败";
			}
			$this->ajaxReturn($message);
		}
		//showdata($_POST);
	}
	
	
	
}