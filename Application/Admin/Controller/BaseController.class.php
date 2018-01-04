<?php

namespace Admin\Controller;

use Think\Controller;

class BaseController extends Controller{
	
	/* function __construct(){
		parent::__construct();//先写执行父类构造，避免其中方法丢失
	} */
	
	
	/***
	 * 用这种更方便
	 */
	function _initialize(){
		if (!isset($_SESSION['adminid']) || !isset($_SESSION['adminname'])){
			$this->redirect("Admin/Public/login");
		}
	}
	
	
}