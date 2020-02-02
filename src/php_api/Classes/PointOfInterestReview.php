<?php

class PointOfInterestReview{

    private $id; // the poi ID
    private $conn; // the PDO connection
    private $row; // the row representing this Poi
    
    public function __construct($conn, $id)
    {
        $this->conn = $conn;

        $statement = $this->conn->prepare("SELECT * FROM poireviews WHERE id = ?");
        $statement->bindParam (1, $id);
        $statement->execute();

        $this->row = $statement->fetch();
    }

    public static function addPointOfInterestReview($conn, $poi_id, $review){
        
        try {
            $statement = $conn->prepare("INSERT INTO poi_reviews VALUES(DEFAULT, :poi_id, :review)");

            $statement->bindParam(':review', $review);
            $statement->bindParam(':poi_id', $poi_id);
            
            if($statement->execute())
                return true;
            else
                return false;

        } catch( PDOException $e ){ echo $e->getMessage(); }

        return false;
    }

    //Getters
    public function getId(){ return $this->row["id"]; }
    public function getPoiId(){ return $this->row["poi_id"]; }
    public function getReview(){ return $this->row["review"]; }
}
