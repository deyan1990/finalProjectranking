<?php
include ("table1.php");
$score = $_POST['score'];
$name = $_POST['name'];
//echo $score.$name;
$db=$pdo->prepare("INSERT INTO table1(name, score, date) VALUES (:name, :score, NOW())");
$db->bindValue(':name',$name);
$db->bindValue(':score', $score);
$db->execute();
header("Location: index.php");
