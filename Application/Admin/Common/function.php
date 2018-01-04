<?php

	/**
	 * 获取上级分类名称
	 * @param elementary_id:初级id
	 * @param middle_id_id:中级id
	 * @return string : 字符串示例：生活服务-->购物-->男装
	 */
	function get_parent_names($id){
		/** 查找datalist表数据 **/
		$data = M('datalist')->where(array('id'=>$id))->find();
		/** 如果不存在中级分类，则只显示高级分类 **/
		if($data['middle_id']){
			/**获取中级和高级分类信息**/
			$parent     = get_parent_by_middle_id($data['middle_id']);
			/** 获取初级分类信息 **/
			$elementary = M('elementary_level')->where(array('id'=>$data['elementary_id']))->getField('elementary_name');
			/** 拼接字符串 **/
			if($elementary){
				$string = $parent.'-->'.$elementary;
			}else{
				$string = $parent;
			}
		}else{
			/** 获取高级分类信息 **/
			$string  = M('high_level')->where(array('id'=>$data['high_id']))->getField('high_name');
		}
		return $string;
	}
	
	/**
	 * 根据中级id获取中级和高级名称
	 */
	function get_parent_by_middle_id($middle_id){
		/** 获取中级分类信息 **/
		$middle = M('middle_level')->where(array('id'=>$middle_id))->field('id,high_id,middle_name')->find();
		/** 获取高级分类信息 **/
		$high   = M('high_level')->where(array('id'=>$middle['high_id']))->getField('high_name');
		$middle_name = $middle['middle_name'];
		/**拼接字符串**/
		if($middle_name){
			$string = $high.'-->'.$middle_name;
		}else{
			$string = $high;
		}
		return $string;
	}


?>