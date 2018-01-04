<?php
return array(
	//'配置项'=>'配置值'
	
		
		/***
		 *Think Library Behavior  下的ShowPageTraceBehavior
		 *
		 *有调试一样，出现运行信息
		 */
		'SHOW_PAGE_TRACE'=>'true',
			
	
		/***
		 * Think 模板引擎 设置
		 */
		'TMPL_L_DELIM'          =>  '<{',            // 模板引擎普通标签开始标记
		'TMPL_R_DELIM'          =>  '}>',            // 模板引擎普通标签结束标记
		
		/****
		 * 数据库配置
		 */
		'DB_TYPE'               =>  'mysql',     // 数据库类型
		'DB_HOST'               =>  'localhost', // 服务器地址
		'DB_NAME'               =>  'navigation',          // 数据库名
		'DB_USER'               =>  '3306',      // 用户名
		'DB_PWD'                =>  '123456',          // 密码
		'DB_PORT'               =>  '',        // 端口
		'DB_PREFIX'             =>  'nav_',    // 数据库表前缀
		
		'TMPL_CACHE_ON' => false,
		'TMPL_CACHE_ON' => false,
	
);