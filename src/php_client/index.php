<?php

	ini_set("display_errors", true);

	//If A Search Type Isset
	if(isset($_GET['type'])){

		$type = $_GET['type'];
		
		if(!empty($type)){
			
			//Init Curl Connection
			$curlConn = curl_init();

			$json = file_get_contents("config.json");

			$config = json_decode($json, 1);
			
			//Set All HTTP Options At Once In Array (Specify: URL, HEADER, RETURNTRANSFER)
			$options = array(
				CURLOPT_URL => $config['local']['routes']['GET_points_of_interest'] . "172.28.0.5?region=Hampshire&type=". $type,
				CURLOPT_RETURNTRANSFER => 1,
			);
		
			//Set Options
			curl_setopt_array($curlConn, $options);
			
			$json = curl_exec($curlConn);

			if ($json === false) {
				throw new Exception(curl_error($curlConn), curl_errno($curlConn));
			}

			//Convert String to Assoc Array
			$data = json_decode($json, 1);

			// Close the connection.
			curl_close($curlConn);
		}else{
			echo '<div class="alert alert-danger alert-dismissable"><strong>No Search Type!</strong> Please Enter A Search type</div>';
		}
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Visit Hampshire</title>
	<!-- BOOTSTRAP STYLES YETI THEME-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/yeti/bootstrap.min.css">
	<!-- FONTAWESOME INCLUDE -->
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

	<link rel="stylesheet" href="css/main.css">
</head>
<body>

	<header>
		<h1>Visit Hampshire</h1>
	</header>
	<main>

		<section class="sidebar">
			<h3>Search Hampshire!</h3>
			<form class="searchForm" action="" method="GET">
				<input type="text" class="form-control searchInp" name="type" placeholder="Type:">
				<button class="btn btn-primary searchBtn">Search</button>
			</form>
			<div class="searchResponse">
			
					<?php
						//If Data is returned from HTTP Request
						if($data){
							
							echo "<ul>";
							
							//For each element in data array
							for($i = 0; $i < count($data); $i++){
								echo "<li><h3>Name: " . $data[$i]["name"] . "</h3>";
								echo "<p>Type: " . $data[$i]["type"] . "</p>";
								echo "<p>Country: " . $data[$i]["country"] . "</p>";
								echo "<p>Region: " . $data[$i]["region"] . "</p>";
								echo "<p>Longitude: " . $data[$i]["lon"] . "</p>";
								echo "<p>Latitude: " . $data[$i]["lat"] . "</p>";
								echo "<p>Link to Map <a target='_blank' href='http://edward2.solent.ac.uk/~jdordoy/assignment/ajaxclient/index.html?id= " . $data[0]['ID'] . "'>View Here @ PointsOfInterest</a></p>"; 
								echo "<a class='btn btn-primary review' href='review.php?id=" . $data[$i]["ID"] ."'>Review</a></li>";
							}

							echo "</ul>";
						}
					?>
					
			</div>
		</section>
		<aside class="content">
			<div class="jumbotron text-center">
				<h1>Welcome to Visit Hampshite!</h1>
				<h2>The Premire Location Service For Hampshire</h2>
			</div>
			<hr>
			<h3>What We Do!</h3>
			<p>Search and shop for your favourite top 40 hits on HitTastic! Whether it's pop rock, rap or pure liquid cheese you're into, you can be sure to find it on HitTastic! With the full range of top 40 hits from the past 50 years on our database, you can guarantee you'll find what you're looking for in stock. Plus, with our Year Search find out exactly what was in the chart in any year in the past 50 years.</p>
			<hr>
			<h3>About Us</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue blandit lectus vitae pellentesque. Nunc congue urna sed diam convallis cursus. Vivamus elementum quam neque, at pretium velit dictum a. Integer accumsan risus nulla, a aliquam nisi tincidunt sed. Phasellus hendrerit ante ac magna laoreet accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent aliquet, ligula sed sagittis sagittis, ex eros aliquam nibh, nec euismod quam ex nec est. Nullam id ante sit amet nisi rutrum bibendum ut eget felis. Ut nec lectus condimentum, pretium elit in, interdum enim. Ut ullamcorper blandit felis, vitae lobortis metus aliquam vel. Vestibulum ut leo nec sem lobortis efficitur et sit amet purus. Duis egestas varius nunc, at aliquam justo varius id. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut sed consectetur est. Nulla sollicitudin justo sit amet vehicula pulvinar.</p>

			<p>Pellentesque sem arcu, congue hendrerit arcu sit amet, ultrices tristique tortor. In accumsan quis massa non tristique. Nullam elementum eget mauris tincidunt blandit. Praesent id molestie tellus, sit amet maximus magna. Praesent nec tempus leo. Donec consectetur ex diam, vel ultricies purus auctor et. Nulla scelerisque erat ut nisl iaculis, et interdum nisl tempor. Fusce blandit est sed massa pharetra, eget sodales dolor viverra. Nulla sed ultricies tellus, eu malesuada dui. Maecenas vitae pretium leo, rutrum lobortis augue. Vestibulum suscipit nunc risus. Aliquam erat volutpat.</p>
			<hr>
		</aside>
	</main>
	<footer>
		<p>&copy; Vist Hampshire 2017</p>
		<p>Powered By <a href="../api/">Points of Interest</a> Designed With <a href="">Bootstrap</a></p>
	</footer>
</body>
</html>