<?php


function fetchowner($username){

include('db_conx.php');

$owner_username = $username;

$sql = "SELECT name from users where username='$username'";
$query=mysqli_query($db_conx,$sql);

$row = mysqli_fetch_row($query);

$owner_name = $row[0];

echo $owner_name;

}


function fetchavatar ($username){
include('db_conx.php');

$owner_username = $username;

$sql = "SELECT avatar from users where username='$username'";
$query=mysqli_query($db_conx,$sql);

$row = mysqli_fetch_row($query);

$owner_avatar = $row[0];

echo $owner_avatar;


}


function fetchusername ($username){
include('db_conx.php');

$owner_username = $username;

$sql = "SELECT username from users where username='$username'";
$query=mysqli_query($db_conx,$sql);

$row = mysqli_fetch_row($query);

$owner_username = $row[0];

echo $owner_username;


}

function fetchname ($username){
include('db_conx.php');

$owner_username = $username;

$sql = "SELECT name from users where username='$username'";
$query=mysqli_query($db_conx,$sql);

$row = mysqli_fetch_row($query);

$owner_name = $row[0];

echo $owner_name;


}


?>