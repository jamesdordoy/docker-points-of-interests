<?php

/**
  * Data Access Object (Point of Interest)
  *
  * @package    Points of Interest
  * @author     James Dordoy
  * @date       20/12/2016
  **/

class PointOfInterest{

    /**
     * @var PDO MySQL database connection
     */
    private $conn;

    /**
     * @var int ID of 
     */
    private $id;

    /**
     * @var Assoc Array row of retreived point of interest
     */
    private $row;

    /**
     * Constructor
     * @param PDO $conn MySQL PDO connection
     * @param int $id record of required Row
     */
    public function __construct($conn, $id){
        $this->conn = $conn;
        $statement = $this->conn->prepare("SELECT * FROM pointsofinterest WHERE id = :id");
        $statement->execute(array(':id' => $id));
        $this->id = $id;
        $this->row = $statement->fetch();
    }
    
    /**
     * Update The Point of Interest
     * @param String $name name of Point of Interest
     * @param int $id record of required Row
     */
    public function updatePointOfInterest($name, $type, $country, $region, $lat, $lon, $description){

        $statement = $this->conn->prepare("UPDATE pointsofinterest SET name = :name, type = :type WHERE id = :id");

        $statement->bindParam(':name', $name);
        $statement->bindParam(':type', $type);
        $statement->bindParam(':country', $country);
        $statement->bindParam(':region', $region);
        $statement->bindParam(':lat', $lat);
        $statement->bindParam(':lon', $lon);
        $statement->bindParam(':description', $description);
        $statement->bindParam(':id', $this->id);
        if($statement->execute())
            return true;
        else
            return false;
    }

    public function deletePointOfInterest(){
        $statement = $this->conn->prepare("DELETE FROM pointsofinterest WHERE id = :id");
        $statement->bindParam(':id', $this->id);
        if($statement->execute())
            return true;
        else
            return false;
    }

    //Getters
    public function getId(){ return $this->row["id"]; }
    public function getName(){ return $this->row["name"]; }
    public function getType(){ return $this->row["type"]; }
    public function getCountry(){ return $this->row["country"]; }
    public function getRegion(){ return $this->row["region"]; }
    public function getLat(){ return $this->row["lat"]; }
    public function getLon(){ return $this->row["lon"]; }
    public function getDescription(){ return $this->row["description"]; }


    public static function getPointsOfInterest($conn){
        try{

            $statement = $conn->prepare("SELECT * FROM pointsofinterest ORDER BY id ASC");
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);

        }catch( PDOException $e ){ echo $e->getMessage(); }
    }

    public static function getPointsOfInterestByType($conn, $type){
        try{

            $statement = $conn->prepare("SELECT * FROM pointsofinterest WHERE type = :type ORDER BY ID ASC");
            $statement->execute(array( ':type' => $type ));
            return $statement->fetchAll(PDO::FETCH_ASSOC);

        }catch( PDOException $e ){ echo $e->getMessage(); }
    }

    public static function getPointsOfInterestByRegion($conn, $region){
        try{

            $statement = $conn->prepare("SELECT * FROM pointsofinterest WHERE region = :region ORDER BY ID ASC");
            $statement->execute(array( ':region' => $region ));
            return $statement->fetchAll(PDO::FETCH_ASSOC);

        }catch( PDOException $e ){ echo $e->getMessage(); }
    }

    public static function getPointsOfInterestByTypeAndRegion($conn, $type, $region){
        try{

            $statement = $conn->prepare("SELECT * FROM pointsofinterest WHERE type = :type AND region = :region");
            $statement->execute(array( ':type' => $type, ':region' => $region ));
            return $statement->fetchAll(PDO::FETCH_ASSOC);

        }catch( PDOException $e ){ echo $e->getMessage(); }
    }

    public static function addPointOfInterest($conn, $name, $type, $country, $region, $lat, $lon, $description){
        
        try{

            $statement = $conn->prepare("INSERT INTO pointsofinterest VALUES(DEFAULT, :name, :type, :country, :region, :lat, :lon, :description)");

            $statement->bindParam(':name', $name);
            $statement->bindParam(':type', $type);
            $statement->bindParam(':country', $country);
            $statement->bindParam(':region', $region);
            $statement->bindParam(':lat', $lat);
            $statement->bindParam(':lon', $lon);
            $statement->bindParam(':description', $description);

            if($statement->execute())
                return true;
            else
                return false;

        }catch( PDOException $e ){ echo $e->getMessage(); }

        return false;

    }
}
