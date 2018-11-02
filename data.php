<?php

if(isset($_POST['scene'])){
    $connect = mysqli_connect('localhost','root','AC6f0285f9dc','like_count');
    $query = 'SELECT * FROM like_count WHERE scene_id = "'.$_POST['scene'].'"';
    $result = mysqli_query($connect,$query);
    while($row = mysqli_fetch_array($result))   {
        $data = $row['like_count'];
        }

    echo json_encode($data);
}
if(isset($_POST['like'])){
    $connect = mysqli_connect('localhost','root','AC6f0285f9dc','like_count');
    $q = "UPDATE `like_count` SET `like_count`= `like_count` + 1 WHERE `scene_id` = '".$_POST['like']."'";
    mysqli_query($connect,$q);
    $query = 'SELECT * FROM like_count WHERE scene_id = "'.$_POST['like'].'"';
    $result = mysqli_query($connect,$query);
    while($row = mysqli_fetch_array($result))   {
        $data = $row['like_count'];
        }

    echo json_encode($data);
}


?>