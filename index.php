<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exam project</title>
    <script src="js/createjs-2015.11.26.min.js"></script>
    <script src="js/Ajax.js"></script>
    <script src="js/intro.js"></script>
    <style>
        canvas{
        background-color: blue;
            background-image: url("img/bg.png");
        }
    
    </style>
</head>

<body onload="getStarted()">
    <canvas id="flower" width="600" height="400"></canvas>
    <div class="container">
    	<div class="rank">
    	
    	<?php 
    	include ("table1.php");
    	$stmt=$pdo->query("SELECT * FROM table1 ORDER BY score DESC LIMIT 3");
    	while($rank = $stmt->fetchObject()){
    	?>
    	<div class="list">
    	<h2><?php echo $rank->name;?></h2>
    	<p><?php echo $rank->score;?></p>
    	</div>
    	<?php }?>
    	
    	</div>
    	
    	<form  id="scoreForm" action="saveScore.php" method="post">
    		<div class = "form-group">
    		<label for="exampleInputName">Name</label>
    		<input type="text" class="form-control" name="name" id="name" placeholder="name">  		
    		</div>
    		
    		<button type="submit" class="btn btn-default">Submit</button>
    	</form>
    
    </div>
</body>
</html>