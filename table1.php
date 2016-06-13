<?php
$pdo = new PDO("mysql:host=localhost; dbname=ranking", "root","");
$ranking = $pdo->query ("SELECT * FROM table1 ORDER BY id ASC");
$ranking1= $ranking->fetchObject();
