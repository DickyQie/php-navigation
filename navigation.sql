/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : navigation

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-01-04 20:11:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `nav_admin`
-- ----------------------------
DROP TABLE IF EXISTS `nav_admin`;
CREATE TABLE `nav_admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(50) NOT NULL COMMENT '管理员用户名',
  `password` varchar(50) NOT NULL COMMENT '管理员密码',
  `addtime` datetime NOT NULL COMMENT '注册时间',
  `logintime` datetime DEFAULT NULL COMMENT '上次登录时间',
  `loginip` varchar(20) DEFAULT NULL COMMENT '登录IP',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='后台管理员表';

-- ----------------------------
-- Records of nav_admin
-- ----------------------------
INSERT INTO `nav_admin` VALUES ('1', 'zq', '96e79218965eb72c92a549dd5a330112', '2015-01-28 00:00:00', '2018-01-04 20:07:19', '0.0.0.0');
INSERT INTO `nav_admin` VALUES ('2', 'zhangqian', 'e10adc3949ba59abbe56e057f20f883e', '2017-11-17 11:47:24', '2018-01-04 20:07:01', '0.0.0.0');

-- ----------------------------
-- Table structure for `nav_datalist`
-- ----------------------------
DROP TABLE IF EXISTS `nav_datalist`;
CREATE TABLE `nav_datalist` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` char(255) DEFAULT NULL COMMENT '名称',
  `high_id` int(8) DEFAULT '0' COMMENT '高级分类id',
  `middle_id` int(8) DEFAULT '0' COMMENT '中级分类id',
  `elementary_id` int(8) DEFAULT '0' COMMENT '初级分类id',
  `href` varchar(255) DEFAULT NULL COMMENT '链接地址',
  `is_hot` tinyint(1) DEFAULT '0' COMMENT '是否热门：0否；1是',
  `sort` int(8) DEFAULT NULL COMMENT '排序',
  `is_recommend` tinyint(2) DEFAULT '0' COMMENT '是否推荐,0:否；1:是',
  `picture` varchar(255) DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COMMENT='数据表';

-- ----------------------------
-- Records of nav_datalist
-- ----------------------------
INSERT INTO `nav_datalist` VALUES ('8', '绝地逃亡', '15', '17', '21', 'http://study.mingrisoft.com', '1', '1', '1', null);
INSERT INTO `nav_datalist` VALUES ('9', '封神传奇', '15', '17', '21', 'http://study.mingrisoft.com/', '1', '2', '1', null);
INSERT INTO `nav_datalist` VALUES ('90', '芒果TV', '15', '17', '22', 'http://www.mgtv.com/', '0', '2', '1', null);
INSERT INTO `nav_datalist` VALUES ('91', '太平洋电脑网', '16', '0', '0', 'http://www.pconline.com.cn/', '1', '4', '1', null);
INSERT INTO `nav_datalist` VALUES ('92', '英雄联盟', '15', '22', '24', 'http://lol.qq.com/', '1', '2', '1', null);
INSERT INTO `nav_datalist` VALUES ('93', '大鱼吃小鱼', '15', '22', '25', '', '1', '3', '1', null);
INSERT INTO `nav_datalist` VALUES ('94', '范特西篮球2', '15', '22', '25', 'http://ftx.37.com/', '1', '3', '1', null);
INSERT INTO `nav_datalist` VALUES ('96', '跑男', '15', '0', '0', 'http://www.baidu.com', '1', '1', '1', '2016-07-07/577db9068d91d.jpg');
INSERT INTO `nav_datalist` VALUES ('97', '挑战极限联盟', '15', '17', '22', 'http://study.mingrisoft.com/', '0', '5', '0', null);

-- ----------------------------
-- Table structure for `nav_elementary_level`
-- ----------------------------
DROP TABLE IF EXISTS `nav_elementary_level`;
CREATE TABLE `nav_elementary_level` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `elementary_name` char(255) DEFAULT NULL COMMENT '初级分类名称',
  `sort` int(8) DEFAULT '0' COMMENT '排序',
  `middle_id` int(8) DEFAULT '0' COMMENT '中级分类id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='初级分类表';

-- ----------------------------
-- Records of nav_elementary_level
-- ----------------------------
INSERT INTO `nav_elementary_level` VALUES ('15', '六合彩', '1', '16');
INSERT INTO `nav_elementary_level` VALUES ('16', '大乐透', '3', '16');
INSERT INTO `nav_elementary_level` VALUES ('21', '电影', '1', '17');
INSERT INTO `nav_elementary_level` VALUES ('22', '综艺', '2', '17');
INSERT INTO `nav_elementary_level` VALUES ('20', '网络电视', '1', '17');
INSERT INTO `nav_elementary_level` VALUES ('23', '电视剧', '3', '17');
INSERT INTO `nav_elementary_level` VALUES ('24', '网络游戏', '1', '22');
INSERT INTO `nav_elementary_level` VALUES ('25', '单机游戏', '2', '22');
INSERT INTO `nav_elementary_level` VALUES ('26', '古典音乐', '1', '21');
INSERT INTO `nav_elementary_level` VALUES ('27', '腾讯视频', '10', '17');
INSERT INTO `nav_elementary_level` VALUES ('28', '深圳', '46', '29');

-- ----------------------------
-- Table structure for `nav_high_level`
-- ----------------------------
DROP TABLE IF EXISTS `nav_high_level`;
CREATE TABLE `nav_high_level` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `high_name` char(255) DEFAULT NULL COMMENT '高级分类名称',
  `is_display` tinyint(1) DEFAULT '0' COMMENT '是否显示：0否；1是',
  `layout` char(100) DEFAULT 'left' COMMENT '首页显示位置',
  `sort` int(8) DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COMMENT='高级分类表';

-- ----------------------------
-- Records of nav_high_level
-- ----------------------------
INSERT INTO `nav_high_level` VALUES ('16', '实用工具', '1', 'bottom', '6');
INSERT INTO `nav_high_level` VALUES ('18', '其他', '1', 'left', '4');
INSERT INTO `nav_high_level` VALUES ('12', '地方网站', '1', 'left', '3');
INSERT INTO `nav_high_level` VALUES ('13', '生活服务', '1', 'left', '1');
INSERT INTO `nav_high_level` VALUES ('15', '娱乐休闲', '1', 'left', '2');
INSERT INTO `nav_high_level` VALUES ('19', '体育', '1', 'left', '8');
INSERT INTO `nav_high_level` VALUES ('21', '切切歆语', '1', 'bottom', '5');

-- ----------------------------
-- Table structure for `nav_hot`
-- ----------------------------
DROP TABLE IF EXISTS `nav_hot`;
CREATE TABLE `nav_hot` (
  `id` int(4) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(100) NOT NULL,
  `href` text NOT NULL,
  `type` tinyint(1) DEFAULT '0' COMMENT ' 0：热门；1：广告区；2：图片区',
  `sort` int(8) NOT NULL DEFAULT '0' COMMENT '排序',
  `is_recommend` tinyint(1) DEFAULT '0' COMMENT '是否推荐，0；否；1：是',
  `picture` varchar(255) DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=106 DEFAULT CHARSET=utf8 COMMENT='热门数据表';

-- ----------------------------
-- Records of nav_hot
-- ----------------------------
INSERT INTO `nav_hot` VALUES ('1', '百    度', 'http://baidu.com', '1', '1', '1', null);
INSERT INTO `nav_hot` VALUES ('2', '新    浪', 'http://www.sina.com.cn/', '1', '3', '0', null);
INSERT INTO `nav_hot` VALUES ('4', '搜    狐', 'http://www.souhu.com/', '0', '1', '1', '');
INSERT INTO `nav_hot` VALUES ('5', '网易云', 'http://www.163.com/', '0', '1', '0', '');
INSERT INTO `nav_hot` VALUES ('6', '谷    歌', 'http://www.google.com.hk/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('7', '凤凰网', 'http://www.ifeng.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('9', '新华网', 'http://www.xinhuanet.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('10', '人人网', 'http://www.renren.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('11', '开心网', 'http://www.kaixin001.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('12', '湖南卫视', 'http://www.hunantv.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('13', '汽车之家', 'http://www.autohome.com/', '1', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('14', '4399游戏', 'http://www.4399.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('15', '太平洋电脑网', 'http://www.pconline.com.cn/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('16', '东方财富', 'http://www.eastmoney.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('17', '中华英才网', 'http://www.chinahr.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('18', '中彩网', 'http://www.zhcw.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('19', '赛尔号', 'http://www.51seer.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('20', '智联招聘', 'http://www.zhaopin.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('21', '携程旅游网', 'http://www.ctrip.com/', '1', '0', '1', '');
INSERT INTO `nav_hot` VALUES ('22', '大众点评团', 'http://www.dianping.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('23', '赶集网', 'http://www.ganji.com/', '0', '0', '1', '');
INSERT INTO `nav_hot` VALUES ('24', '58同城', 'http://www.58.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('25', '淘宝网', 'http://www.taobao.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('26', '搜房网', 'http://www.soufun.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('27', '瑞丽女性网', 'http://www.rayli.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('28', '工商银行', 'http://www.icbc.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('29', '当当网', 'http://www.dangdang.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('30', '中关村在线', 'http://www.zol.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('31', '安居客房产网', 'http://www.anjuke.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('32', '易车网', 'http://www.bitauto.com/', '0', '0', '0', null);
INSERT INTO `nav_hot` VALUES ('98', '图片4', 'http://www.mingrisoft.com', '2', '4', '0', '2017-01-04/586ca89c2feec.jpg');
INSERT INTO `nav_hot` VALUES ('99', '图片5', 'http://www.mingrisoft.com', '2', '5', '0', '2017-01-04/586ca8a4903dc.jpg');
INSERT INTO `nav_hot` VALUES ('100', '图片6', 'http://www.mingrisoft.com', '2', '6', '0', '2017-01-04/586ca8ad57b91.jpg');
INSERT INTO `nav_hot` VALUES ('102', '图片1', 'http://www.mingrisoft.com ', '2', '1', '1', '2017-01-04/586ca8e091cfc.jpg');
INSERT INTO `nav_hot` VALUES ('96', '图片2', 'http://www.mingrisoft.com', '2', '2', '0', '2017-01-04/586ca883b716d.jpg');
INSERT INTO `nav_hot` VALUES ('97', '图片3', 'http://www.mingrisoft.com', '2', '3', '0', '2017-01-04/586ca88f643e8.jpg');
INSERT INTO `nav_hot` VALUES ('101', '图片7', 'http://www.mingrisoft.com ', '2', '7', '0', '2017-01-04/586ca8b81a598.jpg');

-- ----------------------------
-- Table structure for `nav_middle_level`
-- ----------------------------
DROP TABLE IF EXISTS `nav_middle_level`;
CREATE TABLE `nav_middle_level` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `middle_name` char(255) DEFAULT NULL COMMENT '中级分类名称',
  `is_recommend` tinyint(1) DEFAULT '0' COMMENT '是否推荐：0否；1是',
  `sort` int(8) DEFAULT '0' COMMENT '排序',
  `high_id` int(8) DEFAULT '0' COMMENT '高级分类id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=86 DEFAULT CHARSET=utf8 COMMENT='中级分类表';

-- ----------------------------
-- Records of nav_middle_level
-- ----------------------------
INSERT INTO `nav_middle_level` VALUES ('27', '北京', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('8', '音乐', '0', '2', '13');
INSERT INTO `nav_middle_level` VALUES ('16', '彩票', '0', '31', '13');
INSERT INTO `nav_middle_level` VALUES ('17', '视频', '1', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('18', '查询', '0', '3', '13');
INSERT INTO `nav_middle_level` VALUES ('19', '天气', '0', '4', '13');
INSERT INTO `nav_middle_level` VALUES ('20', '股票', '0', '4', '13');
INSERT INTO `nav_middle_level` VALUES ('21', '音乐', '0', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('22', '游戏', '1', '2', '15');
INSERT INTO `nav_middle_level` VALUES ('28', '上海', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('24', '电影', '0', '4', '15');
INSERT INTO `nav_middle_level` VALUES ('25', '新闻', '0', '5', '15');
INSERT INTO `nav_middle_level` VALUES ('26', '小说', '0', '6', '15');
INSERT INTO `nav_middle_level` VALUES ('29', '广东', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('30', '湖北', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('31', '山东', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('32', '武汉', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('33', '四川', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('34', '湖南', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('35', '江苏', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('36', '河南', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('37', '河北', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('38', '军事', '0', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('39', '图片', '0', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('40', '动漫', '0', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('41', '星座', '0', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('43', 'NBA', '0', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('44', '交友', '0', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('45', '明星', '0', '1', '15');
INSERT INTO `nav_middle_level` VALUES ('46', '软件', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('47', '邮箱', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('48', '宠物', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('49', '杀毒', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('50', '设计', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('51', '电脑', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('52', '摄影', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('53', '学习', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('54', '曲艺', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('55', '英语', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('56', '国外', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('57', '法律', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('58', '微博', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('59', '工艺', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('60', '小游戏', '0', '1', '18');
INSERT INTO `nav_middle_level` VALUES ('62', '吉林', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('63', '黑龙江', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('66', '安徽', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('67', '福建', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('68', '辽宁', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('69', '山西', '0', '1', '12');
INSERT INTO `nav_middle_level` VALUES ('70', '篮球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('71', '足球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('72', '羽毛球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('73', '兵乓球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('74', '棒球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('75', '排球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('76', '网球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('77', '高尔夫', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('78', '手球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('79', '垒球', '0', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('82', '曲棍球', '1', '1', '19');
INSERT INTO `nav_middle_level` VALUES ('81', '冰球', '0', '1', '19');
