<?php
namespace Home\Controller;
use Think\Controller;

use Think\Model;

class IndexController extends Controller {
	
    public function index(){
    	
    	$highinfo=$this->getdata();
    	
    	$model=new \Model\HotModel();
    	
    	/*   showdata($this->getmiddledata());
    	
    	exit();   */
    	
    	
    	$this->assign("gotr1",$model->getdata());
    	$this->assign("gotr2",$model->getdata(1));
    	$this->assign("gotr3",$this->getmiddledata());
    	$this->assign("picinfo",$model->getdata(2));
    	$this->assign("higninfo",$highinfo);
    	$this->assign("bottomdata",$model->getDatalist());
        $this->display();
    }
    
    public function more(){
    	$model=new \Model\HotModel();
    	$map['middle_id'] = I('middle_id',0,'int'); //接受中级分类id
    	$this->assign('moda',$model->getElementary($map['middle_id']));
    	$this->display();
    }
    
    
    function showpublic(){
    	echo __PUBLIC__;
    }
    
    
    function getdata(){
    	
    	$info=D('High_level')->where("layout='left'")->order("sort asc")->select();
    	foreach ($info as $k=>$v){
    		$infodata=D('middle_level')->where("high_id=".$v["id"])->select();
    		$arrdata[$v['high_name']]=$infodata;
    	}
    	return $arrdata;
    	
    }
    
    
    function getmiddledata(){
    	$info=D('Middle_level')->where("is_recommend=1")->select();
    	foreach ($info as $v){
    		$datalist=D("Datalist")->where("middle_id=".$v['id'])->select();
    		//$arrdata[$v['middle_name']]=$datalist;
    		$arrdata[$v['id']] = $datalist;
    	}
    	return $arrdata;
    }
    
    
}