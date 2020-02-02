<?php

/**
  * PHP Simple GET Service Manager
  *	Preps Provided Parameters & Returns Useable SQL String
 	*
  * @package    Points of Interest
  * @author     James Dordoy
  * @date 			04/01/2016
  **/

class SimpleGetService
{
	/**
   * @var PDO MySQL database connection
   */
	private $conn;

	/**
   * @var String Table Name
   */
	private $tableName;

	/**
   * Constructor
   * @param PDO $conn MySQL PDO connection
   * @param String $tableName SQL Table Name
   */
	public function __construct($conn, $tableName)
	{
		$this->conn = $conn;
		$this->tableName = $tableName;
	}

	/**
   * Exectute Generated SQL Query
   * @return Assoc Array Table Data
   */
	public function getData($sql, $values = [])
	{	
		$statement = $this->conn->prepare($sql);
		$statement->execute($values);

		return $statement->fetchAll(PDO::FETCH_ASSOC);
	}


	/**
   * Prepare Parameters For PDO Prepared Statement
   * @param Array params be Prepared for PDO Prepared Statement
   * @param Array allowed params to generate SQL String
   */
	public function prepareParams($params, $allowedValues)
	{
		if ($params) {
			$values = array();
			$keys = array_keys($params);

			for ($i = 0; $i < count($keys); $i++) {

				foreach ($allowedValues as $allowedVal) {

					if ($allowedVal == $keys[$i]) {
						$values[':' . htmlentities($keys[$i])] = urldecode(htmlentities($params[$keys[$i]]));
					}
				}
			}

			if ($values) {
				return $values;
			} else {
				return [];
			}
		}
	}

	/**
   * Prepare SQL Statement Based Off Prepared Params
   * @param String SQL
   */
	public function prepareSQL($params = null){

		$sql = "SELECT * FROM " . $this->tableName;

		if ($params) {

			$keys = array_keys($params);

			$sql .= " WHERE ";

			for ($i = 0; $i < count($keys); $i++) {
				$sql .= trim($keys[$i], ":") . " = "  . $keys[$i] . ' AND ';
			}

			$sql = trim($sql," AND ");

			$sql .= " ORDER BY id ASC";

			return $sql;

		} else
			return $sql;
	}
}
