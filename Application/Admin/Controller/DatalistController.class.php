<?php

namespace Admin\Controller;

use Think\Controller;

/*****
 * 数据管理
 * @author zhangqie
 *
 */
class DatalistController extends BaseController{
	
	
	function lists(){
	 	$keyword=I('keyword',"","trim");///过滤开头结尾空格
		if ($keyword){
			 $map['title'] = array('like',"%$keyword%");//模糊查询
			 $this->assign('keyword',$keyword);
		}
		$datamodel=new \Model\DatalistModel();	
		
		
		
		
	 	/* $mnm=M('datalist');
		
		$infodata=$mnm->where($map)->count();  */
		
		$count=$datamodel->getCount($map);//总条数
		$row=6;
		$Page   = new \Think\Page($count,$row);
		
		$show =$Page->show();
		
		
		/* 
		 * 查看数据
		 * showdata($count);
		showdata($datamodel->getData($map, $Page)); */
		
		$this->assign('page',$show);
		$this->assign('datalists',$datamodel->getData($map, $Page));
		
		
		$this->assign('title',"数据管理");
		$this->display();
		
	}
	
	/****
	 * 添加
	 */
	function add(){
		if (!IS_POST){
			$high_level=M('high_level')->select();
			$this->assign('high_level',$high_level);
			$this->display();
		}else {
			$post=I('post.');
			$res=M('datalist')->add($post);
			if ($res){
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
		if (!IS_POST){
			$mat['id']=I('id',0);
			$info=M('datalist')->where($mat)->find();
			//一级分类
			$high_level=M('high_level')->select();
			//二级分类
			$middle=M('middle_level')->where('high_id='.$info['high_id'])->select();
			//三级分类
			$elementary=M('elementary_level')->where('middle_id='.$info['middle_id'])->select();
			
		//	showdata($info);
			$this->assign('data',$info);
			$this->assign('high_level',$high_level);
			$this->assign('middle_level',$middle);
			$this->assign('elementary_level',$elementary);
			$this->display();
			
		}else {
			$post=I('post.');
			$res=M('datalist')->save($post);
			if ($res){
				$this->success('修改成功',U('lists'));
			}else {
				$this->error('修改失败');
			}
			//showdata($post);
		}
	}
	
	
	
	/***
	 * 删除
	 */
	function delete(){
		$id=I('id',0,'int');
		$res=M('datalist')->where('id='.$id)->delete();
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
		$res=M('datalist')->where($map)->delete();
		if ($res){
			$this->ajaxReturn("删除成功");
		}else {
			$this->ajaxReturn("删除失败");
		}
		//showdata($ids);
	}
	
	
	
	
	/****
	 * 三级联动
	 */
	function get_middle_info(){
		$high_id=I('high_id',0,'int');
		$middle=M('middle_level')->where('high_id='.$high_id)->select();
	 	$option="";
		foreach ($middle as $v){
			$option.="<option value=".$v['id'].">".$v['middle_name']."</option>";
		}
		echo $option; 
	}
	
	function get_elementary_info(){
		$middle_id=I('middle_id',0,'int');
		$elementary=M('elementary_level')->where('middle_id='.$middle_id)->select();
		$option="";
		foreach($elementary as $v ){
			$option.="<option value=".$v['id'].">".$v['elementary_name']."</option>";
		}
		echo $option;
	}
	
	
	
	
}