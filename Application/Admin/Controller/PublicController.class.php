<?php

namespace Admin\Controller;

use Think\Controller;
class PublicController extends Controller{
	
	
	/****
	 * 两个操作，直接进入界面和验证是否登录，登录则跳转去首页
	 */
	function login(){
		if (session('adminid') || session('adminname')){
			$this->redirect("Index/index");
		}else {
			$this->display();
		}
	}
	
	/****
	 * 验证码
	 */
	function code() {
		$config=array(
				'fontSize'  =>  15,              // 验证码字体大小(px)
				'imageH'    =>  42,               // 验证码图片高度
				'imageW'    =>  108,               // 验证码图片宽度
				'length'    =>  4,               // 验证码位数
				'useNoise'  =>  false,            // 是否添加杂点
				/* 'fontttf'   => '4.ttf', */
				'codeSet'   => '0123456789'   //正则
		);
		$virfy=new \Think\Verify($config);
		$virfy->entry();
	}
	
	public function checkLogin(){
	  /**检测验证码是否正确**/
        $code     = I('code');               	//接收验证码
        $verify   = $this->checkCode($code);	//调用checkCode方法
         if(!$verify){
            $res['status']  = 0;
            $res['message'] = '验证码错误!';
            $this->ajaxReturn($res);
        } 
        $admin_name=I('username'," ","trim");
        $admin_pwd=I("password"," ","md5");
        
        $admininfo=$this->checkPassword($admin_name, $admin_pwd);
         if ($admininfo){
         	
        	$data=array(
        		'loginip'=>get_client_ip(),	//返回IP地址
        		'logintime'=>date("Y-m-d H:i:s")// //记录登录日期
        	);
        	$savel=M("admin")->where(array("id"=>$admininfo['id']))->save($data);
        	if ($savel){
        		session('adminid',$admininfo['id']);
        		session('adminname',$admininfo['username']);
	        	/**@param string $name 变量的名称 支持指定类型
	        	 * @param mixed $default 不存在的时候默认值
	        	 * @param mixed $filter 参数过滤方法
	        	 */
	        	$res['status']  = 1;
	        	$res['message'] = '登录成功!';
	        	$this->ajaxReturn($res);
        	}
        }else {
        	$res['status']= 0;
        	$res['message'] ="用户名或密码错误";
        	$this->ajaxReturn($res);
        } 
	}
	
	function test($data){
		
	}
	
	
	function checkCode($code){
		$verify=new \Think\Verify();
		return $verify->check($code);
	}
	
	function checkName($name,$pwd){
		$info=M('admin')->where(array("username"=>$name))->find();
		if ($info){
			if ($info['password']===$pwd){
				return $info;
			}
		}
		return "11";
	}
	
	/***
	 * 检测用户名密码是否匹配
	 * @param $username
	 * @param $password
	 * @return bool
	 */
	public function checkPassword($username,$password){
		$map['username'] = $username;
		$admin = M('admin')->where($map)->find();
		if($admin['password'] === $password){
			return $admin;
		}else{
			return false;
		}
	}
	
	/****
	 * 退出后台
	 */
	function logout(){
		unset($_SESSION['adminid']);
		unset($_SESSION['adminname']);
		$this->redirect("login"); 
	}
	
}