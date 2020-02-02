<?php

$json = file_get_contents("config.json");

		$config = json_decode($json, 1);

//If The Form Has Been Submitted At The Bottom Of This Page (Will Never Be On Arrival)
if( isset($_POST['review']) && isset($_GET['id'])  ){
	
	if(!empty($_POST['review'])){
		
		//Poi Creditials!!
		$username = "visithampshire";
		$password = "vh123";

		//Get ID Value From Address Bar & Review Post Value From Form
		$review = htmlentities($_POST['review']);
		$id = htmlentities($_GET['id']);
		
		//CURL HTTP POST Request
		$curlConn = curl_init();
		
		//Post Request Options
		$options = array(
							CURLOPT_URL => $config['local']['routes']['POST_point_of_interest_review'],
							CURLOPT_RETURNTRANSFER => 1,
							CURLOPT_POSTFIELDS => array( 
															'review' => $review,
															'id' 	 => $id
														),
							CURLOPT_USERPWD => "$username:$password"
						);
		
		curl_setopt_array($curlConn, $options);
		
		$res = curl_exec($curlConn);
		
		$httpCode = curl_getinfo($curlConn, CURLINFO_HTTP_CODE);
		
		curl_close($curlConn);
		
		if($httpCode == 200){
			
			echo '<div class="alert alert-success alert-dismissable"><strong>Success!</strong> Review Added.</div>';
			
			//Put Data Back On Page with home link
			$connection = curl_init();
			
			$options = array(
								CURLOPT_URL => $config['local']['routes']['GET_points_of_interest'] . "?id=". $_GET['id'],
								CURLOPT_RETURNTRANSFER => 1,
								CURLOPT_HEADER => 0
							);
			
			//Set Options
			curl_setopt_array($connection, $options);

			$json = curl_exec($connection);

			$data = json_decode($json, 1);

			curl_close($connection);
		
		//No Matching Point Of Interest Found
		}else if($httpCode == 404){
			echo '<div class="alert alert-danger alert-dismissable"><strong>Review Not Added!</strong> Incorrect Point of Interest ID.</div>';
		//Bad Request Data Not Suitable or Sent
		}else if($httpCode == 400){
			echo '<div class="alert alert-danger alert-dismissable"><strong>Review Not Added!</strong> Incorrect Point of Interest Details.</div>';
		//Incorrect Point Of Interest Login Details
		}else if($httpCode == 403){
			echo '<div class="alert alert-danger alert-dismissable"><strong>Review Not Added!</strong> Incorrect Login Details.</div>';
		//Unexpected HTTP Code
		}else{
			
		}
		
		
		
		
	//Review Was Empty :(	
	}else{
		echo '<div class="alert alert-danger alert-dismissable"><strong>Review Not Added!</strong> Please Enter A Review.</div>';
	}

//Else If Just an ID Was Passed To This Page (Page Was Just Loaded For First Time)
}else if(isset($_GET['id'])){
	
	//Get Data Relating To Point Of Interest (should really be a function)
	$connection = curl_init();

	curl_setopt($connection, CURLOPT_URL, $config['local']['routes']['GET_points_of_interest'] . "?id=". $_GET['id']);

	curl_setopt($connection,CURLOPT_RETURNTRANSFER,1);

	curl_setopt($connection,CURLOPT_HEADER, 0);

	$json = curl_exec($connection);

	$data = json_decode($json, 1);

	curl_close($connection);
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
		<h1>Visit Hampshire - Add Review</h1>
	</header>
	<main>
		<aside class="content">

			<?php

			//If Data Has Been Posted (Display Posted Review Details)
			if(isset($_POST['review'])){

				if($data){ ?>
			
					<div class="Poi Details">
						<h2>Point Of Interest Details</h2>
						<p>Name: <?php echo $data[0]['name']; ?></p>
						<p>Type: <?php echo $data[0]['type']; ?></p>
						<p>Country: <?php echo $data[0]['country']; ?></p>
						<p>Region: <?php echo $data[0]['region']; ?></p>
						<p>Description: <?php echo $data[0]['description']; ?></p>
						<p>Link to Map <a target="_blank" href="http://edward2.solent.ac.uk/~jdordoy/assignment/ajaxclient/index.html?id=<?php echo $data[0]['ID']; ?>">View Here @ PointsOfInterest</a></p>
					</div>

					<h2>Review Details</h2>
					<p><?php echo $_POST['review']; ?></p>

					<a href="index.php">Home</a>

		<?php   }else{
					//Write Out Link to Refresh The Current Page
					echo '<a href="review.php?id='.urlencode($_GET['id']).'">Back</a>';
				}
				
			//No Data Posted From Form (Display Review Form)
			}else{

				if($data){ ?>

					<div class="Poi Details">
						<h2>Point Of Interest Details</h2>
						<p>Name: <?php echo $data[0]['name']; ?></p>
						<p>Type: <?php echo $data[0]['type']; ?></p>
						<p>Country: <?php echo $data[0]['country']; ?></p>
						<p>Region: <?php echo $data[0]['region']; ?></p>
						<p>Description: <?php echo $data[0]['description']; ?></p>
						<p>Link to Map <a target="_blank" href="http://edward2.solent.ac.uk/~jdordoy/assignment/ajaxclient/index.html?id=<?php echo $data[0]['ID']; ?>">View Here @ PointsOfInterest</a></p>
					</div>

					<form action="review.php?id=<?php echo(urlencode($_GET['id'])); ?>" method="post">
						<label for="review">Point of Interest Review:</label>
						<textarea class="form-control searchInp" name="review"></textarea>
						<input type="submit" style="float:right; margin-top:10px" class="btn btn-primary searchBtn">
					</form>
	<?php 		} 
			} ?>
	</aside>
	</main>
	<footer>
		<p>&copy; Vist Hampshire 2017</p>
		<p>Powered By <a href="../api/">Points of Interest</a></p>
	</footer>
</body>
</html>