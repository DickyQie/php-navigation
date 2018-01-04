<?php


define("APP_DEBUG", True);

// 定义应用目录
define('APP_PATH','./Application/');


/**
 * 打印数据
 */
function showdata($data){
	dump($data);
}

//定义域名常量，用于图片访问，对应路径
define("SITE_URL", "http://localhost/php/PhpIntermediate/tp2/Uploads/");


include '..\ThinkPHP\ThinkPHP.php';