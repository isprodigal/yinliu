-- 查询某一个用户下面关联的文章(带详情)
SELECT * from  user_article tmp   
join article a on tmp.article_id=a.article_id
where tmp.user_id='1';
-- 查询某一个用户下面关联的文章(不带详情)
 SELECT * from  user_article tmp  where tmp.user_id='1';
--  查询文章
SELECT `article_id`, `article_time`, `article_title`, `article_value` FROM `article` WHERE article_id='1'
-- 新增文章数据
INSERT INTO article(`article_id`, `article_time`, `article_title`, `article_value`) 
VALUES (1,'2021-01-01',3,4)
-- 更新文章数据
UPDATE `article` SET `article_time`=[value-2],`article_title`=[value-3],
`article_value`=[value-4] WHERE article_id = 'id'
-- 删除文章
DELETE FROM `article` WHERE article_id = 1
-- 新增用户 去查一下用户   用户名称不能重复
-- 新增用户的 查询用户
SELECT `user_id`, `user_name`, `user_qunSrc`, `user_imgSrc` FROM `user_base` WHERE user_name=''
-- 
INSERT INTO `user_base`(`user_id`, `user_name`, `user_pwd`) 
VALUES ([value-1],[value-2],[value-3])
-- 更新用户数据
UPDATE `user_base` SET `user_name`=[value-2],`user_pwd`=[value-3] WHERE user_id = '1'
-- 删除用户
DELETE FROM `user_base` WHERE user_id = 1
-- 查询用户
SELECT `user_id`, `user_name`, `user_qunSrc`, `user_imgSrc` FROM `user_base` WHERE user_name='' and user_pwd=''



-- 查询   tableName表名    查询字段名selectColumns   whereColumns条件
--  /mysql/select
{
"tableName":"user_base",
"selectColumns":["user_name"],
"whereColumns":{"user_id":"1"}
}

--查询带分页  可以加whereColumns条件  pageSize多少条  pageNo第几页
--  /mysql/select
{
    "tableName": "user_base",
    "selectColumns": [
        "user_name"
    ],
    "limitMap": {
        "pageSize": 1,
        "pageNo": 1
    }
}

-- 新增   
--  /mysql/insert
{
    "tableName":"user_base",
    "columns":{
        "user_name":"测试",
        "user_pwd":"1111"
    }
}
-- 更新   whereColumns根据条件更新
--  /mysql/update
{
     
    "tableName":"user_base",
    "updateColumns":{
        "user_name":"测试11",
        "user_pwd":"444"
    },
    "whereColumns":{
        "user_id":"3"
    }
}

-- 删除  whereColumns根据条件删除  whereColumns可以添加多个字段名已确保正确  也可以只传id
--  /mysql/delete
{
    "tableName":"user_base",
    "whereColumns":{
        "user_name":"测试11",
        "user_id":"3"
    }
}

--SELECT * from  user_article tmp  join article a on tmp.article_id=a.article_id 
--where tmp.user_id='1';
--多表连表查询 beforeSql  condition条件
--/mysql/multiTableQuery    查询用户的文章数据
{
    "beforeSql": "SELECT * from article  join user_article on article.article_id =  user_article.article_id",
    "limitMap": {
        "pageSize": "10",
        "pageNo": "1"
    },
    "condition": {
        "user_article.user_id": "1"
    }
}

--多表连表查询    查询文章下面的群链接等信息
"SELECT * from article left join article_group on article.group_id=article_group.group_id where article.article_id="1633680932129""
--随机推荐
--/mysql/randSelect   size数量
{
    "tableName": "boot_user",
    "selectColumns": [
        "*"
    ],
    "whereNoColumns": {
        "article_id": "2101"
    },
    "size":3
}


-- 添加项目  修改配置   需要修改域名aaa.fl00.cn   需要修改端口--server.port=9779   
sudo -u root nohup /usr/bin/java -jar /www/server/tomcat_site/aaa.fl00.cn/db-0.0.1-SNAPSHOT.jar --spring.profiles.active=test --server.port=9779  >> /tmp/KXJBOTKYEE-9779.log 2>&1 &



sudo -u root nohup /usr/bin/java -jar /www/server/wangwcmysqldb/mysqldb.jar --spring.config.location=/www/server/wangwcmysqldb/properties/application-wangweichun.properties --server.port=9779  >> /tmp/KXJBOTKYEE-9779.log 2>&1 &


sudo -u root nohup /usr/bin/java -jar /www/server/wangwcmysqldb/mysqldb.jar --spring.config.location=/www/server/wangwcmysqldb/properties/application-wangweichun.properties --server.port=7666  >> /tmp/KXJBOTKYEE-7666.log 2>&1 &