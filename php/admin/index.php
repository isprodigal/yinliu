<?php
header("Content-type:text/html;charset=utf-8"); //字符编码设置
$servername = "65.49.209.84";
$username = "cs_fl00_cn";
$password = "a7250153";
// 创建连接
$conn = new mysqli($servername, $username, $password, 'cs_fl00_cn');
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
$sql = "SELECT * FROM mac_vod where  date(vod_date) = curdate()";
$result = $conn->query($sql);
// print_r($result);
$a = array();
if ($result->num_rows > 0) {
    // 输出数据
    while ($row = $result->fetch_assoc()) {
        // echo "<li><a href=list.php?id=$row[dsj_id]>$row[dsj_text]</a> </li>";
        // echo "<li><a href=$row[dsj_href]>$row[dsj_text]</a> </li>";
        array_push($a, $row);
        // echo "$a";
        // echo "$row[vod_name]";
    }
} else {
    echo "0 结果";
}
echo json_encode($a, JSON_UNESCAPED_UNICODE);
// print_r($a);
$conn->close();
