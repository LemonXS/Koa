/*
 Navicat Premium Data Transfer

 Source Server         : MY
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : 127.0.0.1:3306
 Source Schema         : koaproj

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 19/09/2019 10:05:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for system_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `parent_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '节点',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '中文显示名',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父级菜单图表',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `status` int(11) NULL DEFAULT NULL COMMENT '是否启动   1开启   0关闭',
  `type` int(11) NULL DEFAULT 0 COMMENT '类型： 一菜单无子集（0）|一级菜单有子集（1）|二级菜单无子集（2）|二级菜单有子集（3）',
  `order` int(11) NULL DEFAULT NULL COMMENT '菜单顺序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 120 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of system_menu
-- ----------------------------
INSERT INTO `system_menu` VALUES (1, '0', '退税概况', 'icon-tasklist', '/stlb', 1, 1, 0);
INSERT INTO `system_menu` VALUES (2, '0', '退税进度', 'icon-flip', '', 1, 0, 2);
INSERT INTO `system_menu` VALUES (3, '0', '数据联动', 'icon-accessory', NULL, 1, 0, 3);
INSERT INTO `system_menu` VALUES (4, '0', '自动预测', 'icon-magic', '', 1, 0, 4);
INSERT INTO `system_menu` VALUES (5, '0', '数据查询', 'icon-wxbsousuotuiguang', NULL, 1, 0, 5);
INSERT INTO `system_menu` VALUES (6, '0', '智能提醒', 'icon-creative', NULL, 1, 0, 6);
INSERT INTO `system_menu` VALUES (7, '0', '出口地图', 'icon-rankfill', NULL, 1, 0, 7);
INSERT INTO `system_menu` VALUES (8, '0', '分析简报', 'icon-activity1', '/znjb', 1, 0, 8);
INSERT INTO `system_menu` VALUES (9, '0', '系统设置', 'icon-settings', NULL, 1, 0, 9);
INSERT INTO `system_menu` VALUES (10, '0', '功能测试', 'icon-iconfontjingxihuaxue', '', 1, 0, 10);
INSERT INTO `system_menu` VALUES (15, '2', '退税进度统计', NULL, '/tsjdtj', 1, 0, 1);
INSERT INTO `system_menu` VALUES (16, '2', '滞留数量统计', NULL, '/zlsltj', 1, 0, 2);
INSERT INTO `system_menu` VALUES (17, '2', '滞留时长统计', NULL, '/zlsctj', 1, 0, 3);
INSERT INTO `system_menu` VALUES (18, '2', '受理时间分布', NULL, '/slsjfb', 1, 0, 4);
INSERT INTO `system_menu` VALUES (19, '2', '受理回退企业', '', '/htqyhc', 1, 0, 5);
INSERT INTO `system_menu` VALUES (20, '3', '纳税人状态', '', '/nsrzt', 1, 0, 1);
INSERT INTO `system_menu` VALUES (21, '4', '免抵调库数收入预测', '', '/mddksyckxsedgxfx', 1, 0, 1);
INSERT INTO `system_menu` VALUES (22, '5', '疑点查询统计', NULL, '/ydcxtj', 1, 0, 1);
INSERT INTO `system_menu` VALUES (23, '5', '调库退库查询', NULL, '/dktkcx', 1, 0, 2);
INSERT INTO `system_menu` VALUES (24, '5', '流程进度查询', '', '/sljdcx', 1, 0, 3);
INSERT INTO `system_menu` VALUES (25, '5', '专管员查询', NULL, '/zgycx', 1, 0, 4);
INSERT INTO `system_menu` VALUES (26, '6', '智能提醒', NULL, NULL, 1, 0, 1);
INSERT INTO `system_menu` VALUES (27, '7', '地图概览', '', '/c1', 1, 0, 1);
INSERT INTO `system_menu` VALUES (28, '8', '分析简报', NULL, '/znjb', 1, 0, 1);
INSERT INTO `system_menu` VALUES (29, '9', '用户管理', '', '/userpage', 1, 0, 1);
INSERT INTO `system_menu` VALUES (30, '9', '角色管理', '', '/rolepage', 1, 0, 2);
INSERT INTO `system_menu` VALUES (35, '9', '菜单管理', '', '/menupage', 1, 0, 3);
INSERT INTO `system_menu` VALUES (40, '9', '采集管理', '', '/cjgl', 1, 0, 4);
INSERT INTO `system_menu` VALUES (41, '7', '综合地图', '', '/zhdt', 1, 0, 2);
INSERT INTO `system_menu` VALUES (42, '7', '企业地图', '', '/qydt', 1, 0, 3);
INSERT INTO `system_menu` VALUES (43, '3', '银行账号', '', '/yhzh', 1, 0, 2);
INSERT INTO `system_menu` VALUES (45, '0', '数据导入', 'icon-pullup', '', 1, 0, 11);
INSERT INTO `system_menu` VALUES (46, '45', '中国裁判文书网', '', '/zgcpwsw', 1, 0, 1);
INSERT INTO `system_menu` VALUES (48, '3', '多缴税金明细清册', '', '/djsjmxqc', 1, 0, 3);
INSERT INTO `system_menu` VALUES (49, '0', '退税进度历史', 'icon-qrcode1', '', 1, 0, 12);
INSERT INTO `system_menu` VALUES (50, '49', '滞留数量统计历史', '', '/zlsltjls', 1, 0, 1);
INSERT INTO `system_menu` VALUES (51, '49', '受理回退企业历史', '', '/htqyhcls', 1, 0, 2);
INSERT INTO `system_menu` VALUES (52, '49', '退税进度概况', '', '/tsgk', 1, 0, 3);
INSERT INTO `system_menu` VALUES (53, '2', '滞留数量统计(新)', '', '/zlsltj_pie', 1, 0, 6);
INSERT INTO `system_menu` VALUES (54, '49', '滞留时长统计历史', '', '/zlsctjls', 1, 0, 4);
INSERT INTO `system_menu` VALUES (55, '2', '滞留时长统计(新)', '', '/zlsctj_line', 1, 0, 7);
INSERT INTO `system_menu` VALUES (56, '3', '进项发票晚开', '', '/jxfpwk', 1, 0, NULL);
INSERT INTO `system_menu` VALUES (57, '49', '受理时间分布历史', '', '/slsjfbls', 1, 0, 5);
INSERT INTO `system_menu` VALUES (58, '5', '滞留时长查询', '', '/zlsccx', 1, 0, 5);
INSERT INTO `system_menu` VALUES (59, '9', '滞留时长设置', '', '/zlscsz', 1, 0, 5);
INSERT INTO `system_menu` VALUES (60, '5', '滞留明细查询', '', '/zlmxcx', 1, 0, 6);
INSERT INTO `system_menu` VALUES (61, '5', '滞留汇总查询', '', '/zlhzcx', 1, 0, 7);
INSERT INTO `system_menu` VALUES (62, '7', '地图0(备份)', '', '/c0', 1, 0, 4);
INSERT INTO `system_menu` VALUES (63, '7', '地图1（线）', '', '/c1', 1, 0, 5);
INSERT INTO `system_menu` VALUES (64, '7', '地图2（点）', '', '/c2', 1, 0, 6);
INSERT INTO `system_menu` VALUES (65, '7', '地图3（线上一版）', '', '/c3', 1, 0, 7);
INSERT INTO `system_menu` VALUES (66, '7', '地图4（点上一版）', '', '/c4', 1, 0, 8);
INSERT INTO `system_menu` VALUES (67, '7', '地图5(全屏备份)', '', '/c5', 1, 0, 9);
INSERT INTO `system_menu` VALUES (68, '0', '开发者操作', 'icon-friendfamous', '', 1, 0, 13);
INSERT INTO `system_menu` VALUES (69, '68', '自动预测概况图', '', '/znycchart', 1, 0, 1);
INSERT INTO `system_menu` VALUES (70, '68', '分析简报流程概况图', '', '/fxjblcchart', 1, 0, 2);
INSERT INTO `system_menu` VALUES (71, '68', '退税概况视图管理', '', '/chartStorage', 1, 0, 3);
INSERT INTO `system_menu` VALUES (72, '10', '父子表', '', '/FZTable', 1, 0, 1);
INSERT INTO `system_menu` VALUES (73, '10', '树形表', '', '/TreeTable', 1, 0, 2);
INSERT INTO `system_menu` VALUES (74, '10', '页面模板', '', '/PageStyle', 1, 0, 3);
INSERT INTO `system_menu` VALUES (75, '10', '错误弹窗', '', '/Message', 1, 0, 4);
INSERT INTO `system_menu` VALUES (76, '2', '退税进度统计（新）', '', '/tsjdtj_v201906', 1, 0, 8);
INSERT INTO `system_menu` VALUES (77, '10', '颜色配置', '', '/colorpage', 1, 0, 5);
INSERT INTO `system_menu` VALUES (78, '45', 'Lay上传', '', '/uploading', 1, 0, 2);
INSERT INTO `system_menu` VALUES (105, '5', '疑点类型', '', '\\ydzl', 1, 0, 8);
INSERT INTO `system_menu` VALUES (106, '5', '疑点分布', '', '\\ydfb', 1, 0, 9);
INSERT INTO `system_menu` VALUES (107, '5', '疑点数量', '', '\\ydsl', 1, 0, 10);
INSERT INTO `system_menu` VALUES (108, '5', '疑点企业', '', '\\ydqy', 1, 0, 11);
INSERT INTO `system_menu` VALUES (109, '9', '受理回退撤销解锁', '', '/slhtcxjs', 1, 0, 6);
INSERT INTO `system_menu` VALUES (110, '9', '回退参数设置', '', '/htcssz', 1, 0, 7);
INSERT INTO `system_menu` VALUES (111, '0', '疑点信息', '', '', 1, 0, 14);
INSERT INTO `system_menu` VALUES (112, '111', '疑点信息（一版）', '', '/ydxx_v190401', 1, 0, 1);
INSERT INTO `system_menu` VALUES (113, '111', '疑点信息（二版）', '', '/ydxx_v190423', 1, 0, 2);
INSERT INTO `system_menu` VALUES (114, '2', '受理回退企业(河流)', '', '/slhtqy', 1, 0, 9);
INSERT INTO `system_menu` VALUES (115, '4', '退税率变动模拟', '', '/tslbdmn', 1, 0, 2);
INSERT INTO `system_menu` VALUES (116, '0', '菜单演示', '', '', 1, 0, 1);
INSERT INTO `system_menu` VALUES (117, '116', '退税进度统计V201906', '', '/tsjdtj_v201906', 1, 0, 1);
INSERT INTO `system_menu` VALUES (118, '116', '受理回退企业v201908', '', '/slhtqy_v201908', 1, 0, 2);
INSERT INTO `system_menu` VALUES (119, '116', '受理情况统计v201906', '', '/slqktj_v201906', 1, 0, 3);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别 0男 1女 2保密',
  `birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生日',
  `face` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `register_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '注册来源（手机号,QQ....）',
  `createtime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '注册日期',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态  0关闭  1开启（正常）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (13, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', '皮宜豪', '女', '2019-07-26 13:39:35', 'http://127.0.0.1:3000/public/images/face/face06.jpeg', 'local', '2019-07-26 13:39:35', '1');
INSERT INTO `user` VALUES (14, 'ca8f7bf0-af7b-11e9-a4ab-13d9092110f4', '岑国贤', '男', '2019-07-26 16:03:02', 'http://127.0.0.1:3000/public/images/face/face02.jpeg', 'qq', '2019-07-26 16:03:02', '1');
INSERT INTO `user` VALUES (23, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', '喻佳钰', '男', '2019-07-26 16:39:17', 'http://127.0.0.1:3000/public/images/face/face11.png', 'qq', '2019-07-26 16:39:17', '1');
INSERT INTO `user` VALUES (24, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', '朱添昊', '男', '2019-07-29 17:11:57', 'http://127.0.0.1:3000/public/images/face/face02.jpeg', 'local', '2019-07-29 17:11:57', '1');
INSERT INTO `user` VALUES (26, '52fd2180-b266-11e9-a3e2-c5f72dffd416', '黄若萌', '女', '2019-07-30 09:06:56', 'http://127.0.0.1:3000/public/images/face/face04.png', 'local', '2019-07-30 09:06:56', '1');
INSERT INTO `user` VALUES (27, '2ff2da60-b2aa-11e9-91ab-9d6646191c68', '皮昕蕊', '男', '2019-07-30 17:12:43', 'http://127.0.0.1:3000/public/images/face/face05.png', 'local', '2019-07-30 17:12:43', '1');

-- ----------------------------
-- Table structure for user_auths
-- ----------------------------
DROP TABLE IF EXISTS `user_auths`;
CREATE TABLE `user_auths`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `identity_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT ' 登录类型（手机号 邮箱 qq...）',
  `identifier` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标识 openid等唯一标识',
  `credential` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码凭证(三方登录填token,本地就是密码)',
  `createtime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建完成',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'IP地址',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态  0关闭  1开启（正常）',
  `extend1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '扩展字段1',
  `extend2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '扩展字段2',
  `extend3` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '扩展字段3',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_auths
-- ----------------------------
INSERT INTO `user_auths` VALUES (12, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', 'admins', 'e10adc3949ba59abbe56e057f20f883e', '2019-07-26 13:39:35', '127.0.0.1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (13, 'ca8f7bf0-af7b-11e9-a4ab-13d9092110f4', 'qq', '79914A61428954E0CE6CD47989EF36AF', '92683DE071CEF2D7EA7F0CE84B2B762F', '2019-07-26 16:03:02', '::1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (22, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', 'qq', '04AC1015F4BDEF2D2B7C6539A842CA42', '', '2019-07-26 16:39:17', '::1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (23, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', 'username', 'e10adc3949ba59abbe56e057f20f883e', '2019-07-29 17:11:57', '127.0.0.1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (25, '52fd2180-b266-11e9-a3e2-c5f72dffd416', 'local', 'usernames', 'e10adc3949ba59abbe56e057f20f883e', '2019-07-30 09:06:56', '127.0.0.1', '1', NULL, NULL, NULL);
INSERT INTO `user_auths` VALUES (26, '2ff2da60-b2aa-11e9-91ab-9d6646191c68', 'local', 'lisongli', 'e10adc3949ba59abbe56e057f20f883e', '2019-07-30 17:12:43', '127.0.0.1', '1', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user_token
-- ----------------------------
DROP TABLE IF EXISTS `user_token`;
CREATE TABLE `user_token`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `identity_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录类型（手机号 邮箱 qq...）',
  `logintime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录时间',
  `randomkey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录随机字符串',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录ip',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 85 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_token
-- ----------------------------
INSERT INTO `user_token` VALUES (16, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 13:39:35', '9fRncxLhvG1vJ6uU', '127.0.0.1');
INSERT INTO `user_token` VALUES (17, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 15:17:57', 'labc08HsdULyMmA6', '127.0.0.1');
INSERT INTO `user_token` VALUES (18, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 15:19:54', 'Chs03EhkdG7Wcrkr', '127.0.0.1');
INSERT INTO `user_token` VALUES (19, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 15:21:32', 'RlkQoAWOVoBG3FiB', '127.0.0.1');
INSERT INTO `user_token` VALUES (20, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 15:25:00', 'itxOTI1a5TJaft5F', '127.0.0.1');
INSERT INTO `user_token` VALUES (21, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 15:30:18', 'NxfULlojfCoFDN3b', '127.0.0.1');
INSERT INTO `user_token` VALUES (22, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 15:31:46', '5x66QzkGCzDQxkzs', '127.0.0.1');
INSERT INTO `user_token` VALUES (23, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 15:35:13', 'HMMGud09QyZk1DO', '127.0.0.1');
INSERT INTO `user_token` VALUES (24, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 15:36:13', '3uwXMnQN9kfuNfmV', '127.0.0.1');
INSERT INTO `user_token` VALUES (25, 'ca8f7bf0-af7b-11e9-a4ab-13d9092110f4', 'qq', '2019-07-26 16:03:02', '6DGvshoaVXmENrvW', '::1');
INSERT INTO `user_token` VALUES (26, 'ca8f7bf0-af7b-11e9-a4ab-13d9092110f4', 'qq', '2019-07-26 16:07:23', 'xvh6WFBDSRg6Eh30', '::1');
INSERT INTO `user_token` VALUES (29, 'cb9679c0-af7d-11e9-a9a8-37b835249bad', 'qq', '2019-07-26 16:17:23', 'Qfq3nPYqSV0PgzMK', '::1');
INSERT INTO `user_token` VALUES (30, '23be3980-af7e-11e9-8b49-6b601321eeb0', 'qq', '2019-07-26 16:19:51', 'Qblb8GgXN50MSrDd', '::1');
INSERT INTO `user_token` VALUES (31, '9c78e6e0-af7e-11e9-b7ee-8111a8167a3f', 'qq', '2019-07-26 16:23:13', 'kaDxbb93gpTe1AFQ', '::1');
INSERT INTO `user_token` VALUES (32, '8295bef0-af7f-11e9-af2e-1d1301776286', 'qq', '2019-07-26 16:29:39', 'pxG2kkI3zNHyQLK2', '::1');
INSERT INTO `user_token` VALUES (33, '0d069280-af80-11e9-b770-218e98582de4', 'qq', '2019-07-26 16:33:32', 'A7RAzwWoRbuEl3eR', '::1');
INSERT INTO `user_token` VALUES (34, '4a88e130-af80-11e9-bb26-257a54830c58', 'qq', '2019-07-26 16:35:15', 'Q8qzKCSi1cpL7pMq', '::1');
INSERT INTO `user_token` VALUES (35, '9aafd4c0-af80-11e9-b6e3-15dcc514a580', 'qq', '2019-07-26 16:37:29', 'qmvcPAGXXTQuHD6n', '::1');
INSERT INTO `user_token` VALUES (36, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', 'qq', '2019-07-26 16:39:17', 'xzc7gWKRyIeVfDi2', '::1');
INSERT INTO `user_token` VALUES (37, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-26 16:43:37', 'KwFxMxp3HHvcYTAC', '::1');
INSERT INTO `user_token` VALUES (38, 'ca8f7bf0-af7b-11e9-a4ab-13d9092110f4', 'qq', '2019-07-26 16:47:14', 'YN6OqyeqDJOwVm22', '::1');
INSERT INTO `user_token` VALUES (39, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-29 14:19:47', 'FAUqCcT1qCJsfyRs', '127.0.0.1');
INSERT INTO `user_token` VALUES (40, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-29 15:39:28', 'JTAXTef9HNDlozTg', '127.0.0.1');
INSERT INTO `user_token` VALUES (41, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-29 15:40:27', 'zfNa9FjN7AJdVLXC', '127.0.0.1');
INSERT INTO `user_token` VALUES (42, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', 'qq', '2019-07-29 16:24:04', '5uMTzvGsmZicseyW', '::1');
INSERT INTO `user_token` VALUES (43, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', 'qq', '2019-07-29 16:33:33', '5Hni84CFxniXS7Az', '::1');
INSERT INTO `user_token` VALUES (44, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-29 16:36:23', 'WH7ePzhpx3OvzSQr', '::1');
INSERT INTO `user_token` VALUES (45, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-29 16:58:59', 'pem0AbFsg61WctDl', '127.0.0.1');
INSERT INTO `user_token` VALUES (46, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-07-29 17:11:57', 'YLbSKjXDnYwzSVY5', '127.0.0.1');
INSERT INTO `user_token` VALUES (47, '19657a80-b266-11e9-8678-95997058846d', 'local', '2019-07-30 09:05:19', 'lFkmnkGCLNCwjzYE', '127.0.0.1');
INSERT INTO `user_token` VALUES (48, '52fd2180-b266-11e9-a3e2-c5f72dffd416', 'local', '2019-07-30 09:06:56', 'OKnr9DA6NQwJ0Pwu', '127.0.0.1');
INSERT INTO `user_token` VALUES (49, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-07-30 16:55:57', 'HEo2AoeJmpaDa3Ql', '127.0.0.1');
INSERT INTO `user_token` VALUES (50, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-30 17:12:15', 'UOJWqy4U9MAnQL3c', '127.0.0.1');
INSERT INTO `user_token` VALUES (51, '2ff2da60-b2aa-11e9-91ab-9d6646191c68', 'local', '2019-07-30 17:12:43', 'y63eWfscBcRD4Jxe', '127.0.0.1');
INSERT INTO `user_token` VALUES (52, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-07-31 09:13:15', 'M8KKtsGk6GVCxvJG', '127.0.0.1');
INSERT INTO `user_token` VALUES (53, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', 'qq', '2019-07-31 09:13:40', 'TGsstZ3fOBrSNOVO', '::1');
INSERT INTO `user_token` VALUES (54, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-01 09:14:47', 'tnKKVxc1JJJuBovO', '127.0.0.1');
INSERT INTO `user_token` VALUES (55, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-08-01 10:17:41', 'UUsgMvI434BxQSTJ', '127.0.0.1');
INSERT INTO `user_token` VALUES (56, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-08-01 10:21:49', '34idwbbldTDz9iql', '127.0.0.1');
INSERT INTO `user_token` VALUES (57, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-08-02 09:27:52', 'SFtuDWSLtGAWcnir', '127.0.0.1');
INSERT INTO `user_token` VALUES (58, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-08-02 09:28:50', 'PEZ5avUhym7OSme0', '127.0.0.1');
INSERT INTO `user_token` VALUES (59, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-02 14:23:44', '6itKK6Xri2kPB4Nh', '127.0.0.1');
INSERT INTO `user_token` VALUES (60, '52fd2180-b266-11e9-a3e2-c5f72dffd416', 'local', '2019-08-02 14:40:16', 'momHItwJESxoUoBb', '127.0.0.1');
INSERT INTO `user_token` VALUES (61, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-02 14:57:43', 'oFHKNVJVeRYkyl3m', '127.0.0.1');
INSERT INTO `user_token` VALUES (62, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-05 09:02:35', 'h7oqusgQB8JMoLkz', '127.0.0.1');
INSERT INTO `user_token` VALUES (63, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-06 09:33:07', 'uNPRdLLhSmbhYzRm', '127.0.0.1');
INSERT INTO `user_token` VALUES (64, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-21 16:52:27', '9RvIbmn1OjJ3DBz8', '127.0.0.1');
INSERT INTO `user_token` VALUES (65, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-22 10:35:11', 'bu5SIrkc8lYipKCl', '127.0.0.1');
INSERT INTO `user_token` VALUES (66, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-22 14:11:16', 'gJLYPh3LKOQhaAhM', '127.0.0.1');
INSERT INTO `user_token` VALUES (67, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-22 14:37:13', '12W2S12rIZjggrV7', '127.0.0.1');
INSERT INTO `user_token` VALUES (68, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-22 15:09:28', 'WXc3dmzjdU15CDPd', '127.0.0.1');
INSERT INTO `user_token` VALUES (69, 'db0c6c90-af80-11e9-a9d0-7951f12fdb0b', 'qq', '2019-08-22 15:34:15', 'P2grRLSpnfHPh9jg', '::1');
INSERT INTO `user_token` VALUES (70, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-22 16:45:45', 'EnWbbxjlJXOoYYsL', '::1');
INSERT INTO `user_token` VALUES (71, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-26 10:02:53', 's0S3OFmWxzDDd0eJ', '::1');
INSERT INTO `user_token` VALUES (72, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-08-26 14:35:19', '8dCzDmiRzbygC5lW', '::1');
INSERT INTO `user_token` VALUES (73, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-09-02 16:25:42', 'Yrlxj7DFIiglJMvM', '127.0.0.1');
INSERT INTO `user_token` VALUES (74, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-09-02 16:55:19', 'aowzwSGwIKa9W6mS', '127.0.0.1');
INSERT INTO `user_token` VALUES (75, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-09-02 16:56:35', 'Xos2Ut9vgNJ6eQtP', '127.0.0.1');
INSERT INTO `user_token` VALUES (76, 'ea644020-b1e0-11e9-98ac-7ff1aa8e4076', 'local', '2019-09-02 17:14:14', 'BeEjTNOlj69g9orw', '127.0.0.1');
INSERT INTO `user_token` VALUES (77, 'ca8f7bf0-af7b-11e9-a4ab-13d9092110f4', 'qq', '2019-09-05 10:27:29', '0Upe3MVpC6LTZy3F', '::1');
INSERT INTO `user_token` VALUES (78, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-09-05 17:27:43', '31u8MylhlTzEhIFC', '::1');
INSERT INTO `user_token` VALUES (79, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-09-06 10:34:39', 'TQtQFXMg8Ubff2Sd', '127.0.0.1');
INSERT INTO `user_token` VALUES (80, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-09-06 12:16:45', 'tqAycYCn0HjESHr3', '127.0.0.1');
INSERT INTO `user_token` VALUES (81, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-09-12 15:14:06', '84ANXWlT5nSkE8kj', '127.0.0.1');
INSERT INTO `user_token` VALUES (82, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-09-18 16:44:43', 'dE5y3m6dmwW58GjU', '127.0.0.1');
INSERT INTO `user_token` VALUES (83, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-09-18 17:37:54', '1wDdBVpvfokv8mwU', '127.0.0.1');
INSERT INTO `user_token` VALUES (84, 'c06668a0-af67-11e9-a74c-e12bacab5eb7', 'local', '2019-09-19 10:04:16', 'ySMKR0A5wXWJID2O', '127.0.0.1');

-- ----------------------------
-- Table structure for user_track
-- ----------------------------
DROP TABLE IF EXISTS `user_track`;
CREATE TABLE `user_track`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户ip',
  `countries` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所在地国',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所在地省',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所在地市',
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '具体地址',
  `
longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '经度',
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '纬度',
  `createtime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for p_system_menu
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_menu`;
delimiter ;;
CREATE PROCEDURE `p_system_menu`()
BEGIN



select * from (select 
id,parent_id,title,ifnull(icon,'') as icon,ifnull(path,'') as path,`status`,type,`order`
from system_menu where parent_id =0 and `status`=1 order by `order` limit 9999999999999) u union all

-- 查询所有 有效（当前一级菜单未  停用或删除下的子集）的子集项
select * from (select 
b.id,b.parent_id,b.title,ifnull(b.icon,'') as icon,ifnull(b.path,'') as path,b.`status`,b.type,b.`order`
from system_menu a INNER  join system_menu b  where a.id=b.parent_id 
and a.`status`=1 and b.`status`=1 
order by a.`order`,b.`order`  limit 9999999999999) i;




END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_system_navs
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_system_navs`;
delimiter ;;
CREATE PROCEDURE `p_system_navs`()
BEGIN


select * from (select 
id ,parent_id, title,'iconfont' as fontFamily,ifnull(icon,'') as icon, ifnull(path,'')  as href,IF(type=1, true, false) as isCheck,false  as spread 
from system_menu where parent_id =0 and `status`=1 order by `order` limit 9999999999999) u union all

-- 查询所有 有效（当前一级菜单未  停用或删除下的子集）的子集项
select * from (select 
b.id ,b.parent_id, b.title,'iconfont' as fontFamily,ifnull(b.icon,'') as icon, ifnull(b.path,'')  as href,IF(b.type=1, true, false) as isCheck,false  as spread
from system_menu a INNER  join system_menu b  where a.id=b.parent_id 
and a.`status`=1 and b.`status`=1 
order by a.`order`,b.`order`  limit 9999999999999) i;





END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_user_login
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_user_login`;
delimiter ;;
CREATE PROCEDURE `p_user_login`(in _sqlflag VARCHAR(225),
in _identifier VARCHAR(225),
in _credential VARCHAR(225))
BEGIN

if _sqlflag='local' then
-- 检验账号是否第一次登入（第一次登录 则注册，否则验证账号）
select * from `user` as u left join user_auths as ua on u.uid=ua.uid 
where  ua.identity_type='local' and identifier=_identifier and  credential=_credential;

-- 登录 检验是否存在该账号 （前提是账号已经注册过）
select * from `user` as u left join user_auths as ua on u.uid=ua.uid 
where u.status=1 and ua.status=1 and ua.identity_type='local' 
and identifier=_identifier and  credential=_credential;
end if;


if _sqlflag='qq' then
-- 检验账号是否第一次登入（第一次登录 则注册，否则验证账号）
select * from `user` as u left join user_auths as ua on u.uid=ua.uid 
where  ua.identity_type='qq' and identifier=_identifier;

-- 登录 检验是否存在该账号 （前提是账号已经注册过） 
select * from `user` as u left join user_auths as ua on u.uid=ua.uid 
where u.status=1 and ua.status=1 and ua.identity_type='qq' 
and identifier=_identifier;
end if;




if _sqlflag='wechart' then
-- 检验账号是否第一次登入（第一次登录 则注册，否则验证账号）
select * from `user` as u left join user_auths as ua on u.uid=ua.uid 
where  ua.identity_type='wechart' and identifier=_identifier;

-- 登录 检验是否存在该账号 （前提是账号已经注册过） 
select * from `user` as u left join user_auths as ua on u.uid=ua.uid 
where u.status=1 and ua.status=1 and ua.identity_type='wechart' 
and identifier=_identifier;
end if;





END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_user_register_verify
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_user_register_verify`;
delimiter ;;
CREATE PROCEDURE `p_user_register_verify`(in _identity_type VARCHAR(225),
in _identifier VARCHAR(225))
BEGIN

-- 验证该用户是否存在
select  * from user_auths where  identifier=_identifier and identity_type=_identity_type;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_user_token
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_user_token`;
delimiter ;;
CREATE PROCEDURE `p_user_token`(in _uid VARCHAR(225),
in _identity_type VARCHAR(225),
in _randomkey VARCHAR(225),
in _ip VARCHAR(225))
BEGIN

-- 得到登陆用户的最新 token(查询)
select  * from  user_token where uid=_uid and identity_type=_identity_type and randomkey=_randomkey and ip=_ip order by id DESC limit 1;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for p_user_userinfo
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_user_userinfo`;
delimiter ;;
CREATE PROCEDURE `p_user_userinfo`(in _uid VARCHAR(225),
in _identity_type VARCHAR(225))
BEGIN
-- 用户信息
select u.id as id
,u.uid as uid
,u.nick_name as  nick_name
,u.gender as  gender
,u.birthday as birthday
,u.face as face
,ua.identity_type as identity_type
,ua.identifier as identifier
,ua.ip as ip
from  `user` u left join user_auths ua on u.uid=ua.uid where ua.uid=_uid and ua.identity_type=_identity_type;


END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
