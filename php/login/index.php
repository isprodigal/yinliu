<?php
header("Content-type:text/html;charset=utf-8"); //字符编码设置
// 响应类型
header('Access-Control-Allow-Methods:*');
// 带 cookie 的跨域访问
header('Access-Control-Allow-Credentials: true');
// 响应头设置
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Origin:*');

$servername = "65.49.209.84";
$username = "cs_fl00_cn";
$password = "a7250153";
// 创建连接
$conn = new mysqli($servername, $username, $password, 'cs_fl00_cn');
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} else {
    echo "链接失败";
}
// $sql = "SELECT `user_id`, `user_name`, `user_qunSrc`, `user_imgSrc` FROM `user_base` WHERE user_name='' and user_pwd=''";
// $result = $conn->query($sql);
// $a = array();
// if ($result->num_rows > 0) {
//     // 输出数据
//     while ($row = $result->fetch_assoc()) {
//         // echo "<li><a href=list.php?id=$row[dsj_id]>$row[dsj_text]</a> </li>";
//         // echo "<li><a href=$row[dsj_href]>$row[dsj_text]</a> </li>";
//         array_push($a, $row);
//         // echo "$a";
//         // echo "$row[vod_name]";
//     }
// } else {
//     echo "0 结果";
// }
echo json_encode('连接失败');
// print_r($a);
$conn->close();
