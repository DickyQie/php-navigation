<?php

namespace Admin\Controller;

use Think\Controller;


/****
 * 后台首页
 * @author zhangqie
 *
 */
class IndexController extends BaseController{
	
	function index(){
		$this->redirect("Datalist/lists");
	}
	
	function changePassword() {
		if (IS_POST){
			$old_password = I('old_password','','md5');
			$new_password = I('new_password','','md5');
			$map['id']=$admin_id=session('adminid');
			//查询用户信息并验证
			$admin=M('admin')->where($map)->find();
			if ($old_password===$admin['password']){
				
				//$adminupdate = M('admin')->where(array('id'=>$admin_id))->setField('password',$new_password); //更改密码
				$adminupdate=M('admin')->where('id='+$admin_id)->setField('password',$new_password);
				if ($adminupdate){
					$res['status']=1;
					$res['message']='修改密码成功';
					$this->ajaxReturn($res);
				}else {
					$res['status']=0;
					$res['message']='修改密码失败';
					$this->ajaxReturn($res);
				}
			}else {
				$res['status']=0;
				$res['message']='修改密码失败';
				$this->ajaxReturn($res);
			}
			
		}else {
			$this->display();
		}
	}
	
}
