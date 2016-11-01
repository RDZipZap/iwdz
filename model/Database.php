<?php

include_once "Card.php";

class Database
{
    private static $instance = null;
	
	private $allCards = null;
    
    private $game = null;

    // Prevent direct object creation
    private function  __construct() 
	{ 
	}

    // Prevent object cloning
    private function  __clone() 
	{
	}

    public static function getInstance()
	{
        if (!isset(self::$instance)) 
		{
            $c = __CLASS__;
            self::$instance = new $c;
        }

        return self::$instance;
    }
	
    function loadDB($Name)
    {
        if (file_exists("model/data/$Name.db"))
        {
            $db = unserialize(implode("", file("model/data/$Name.db")));

            if (is_array($db) || is_object($db))
            {
                return $db;
            }
        }

        return array();
    }

    function saveDB($Name, $Data)
    {
        $f = fopen("model/data/$Name.db", "w");
        if ($f !== false)
        {
        	if (is_array($Data))
        	{
        		$Data = array_filter($Data);
        	}
            fwrite($f, serialize($Data));
            fclose($f);
        }
    }

	function getAllCards()
	{
		if (!isset($this->allCards))
		{
            $Cards = $this->loadDB("Cards"); 
			
            $this->allCards = $Cards;
        }
	
		return $this->allCards;
	}
	
	function lookupCard($id)
	{
		$allCards = $this->getAllCards();
		
		if (array_key_exists($id, $allCards))
		{
			return $allCards[$id];
		}
		
		return null;
	}
	
	function addCard($newCard)
	{
		$newID = 0;
		
		$allCards = $this->getAllCards();

		$keys = array_keys($allCards);

		sort($keys);

		foreach($keys as $id)
		{
			if ($id == $newID)
			{
				$newID++;
			}
			else
			{
				break;
			}
		}
		
		echo "Neue ID = $newID<br>";
		
		$newCard->setID($newID);
        
        $this->setCard($newCard);
    }
    
    function setCard($card)
    {
        $Cards = $this->getAllCards();
        		
		$Cards[$card->getID()] = $card;
		
		$this->allCards = $Cards;
		
		$this->saveDB("Cards", $Cards);
	}
    
    function getGame()
    {
        if (!isset($this->game))
        {
            $this->game = $this->loadDB("Game");
        }
        
        if (!is_object($this->game))
        {
            $playerNames = array("Kevin", "Seeb");
            
            $this->game = new Game($playerNames);
        }
        
        return $this->game;
    }
    
    function setGame($game)
    {
        $this->game = $game;
        
        $this->saveDB("Game", $this->game);
    }
}


?>