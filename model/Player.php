<?php

class Player
{
	// Kartenreihen
    const Handkarten		= 0;
    const Produktion		= 1;
    const StGebaeude		= 2;
    const Armee				= 3;
    const Wunder			= 4;
    const Anfuehrer			= 5;
    const Regierungsform	= 6;
    const Taktik			= 7;
    const TypeCount			= 8;

	// Names des Spielers
    private $name;
    
    // das ist das Spielbrett. Ein zweidimensionales Array mit Card-Objekten
    private $Board = array();
    
    // hier sind alle spielerbezogenen Werte abgelegt (Guthaben, Einwohner, Armeewert, usw)
    private $values = array();

    function Player($name)
    {
        $this->name = $name;
        
        // Startwerte
        $this->values['gelbervorrat'] = 20;
        $this->values['blauervorrat'] = 20;
        $this->values['arbeitslose'] = 1;
        $this->values['zivilpunkte'] = 1;
        $this->values['maxzivilpunkte'] = 4;
        $this->values['militaerpunkte'] = 0;
        $this->values['maxmilitaerpunkte'] = 2;
        $this->values['wissenschatfszuwachs'] = 1;
        
        // Startkarten
        $this->addCardID(Produktion, 45); // Feldarbeit
        $this->addCardID(Produktion, 46); // Bronze
        $this->addCardID(StGebaeude, 49); // Philosophie
        $this->addCardID(StGebaeude, 50); // Religion
        $this->addCardID(Regierungsform, 48); // Despotismus
        $this->addCardID(Armee, 47); // Krieger
    }
    
    function getGamestate()
    {
    	$gamestate = array();
    	
    	$gamestate = array_merge($gamestate, $this->values);
    	
    	foreach($this->Board as $rowname => $row)
    	{
    		if (count($row))
    		{
    			$gamestate[$rowname] = array();
    		}
    		
    		foreach($row as $card)
    		{
    			// karten hinzufügen
    			$cardinfo = array();
    			$cardinfo['ID'] = $card->getID();
    			$cardinfo['einheiten'] = $card->getUnitCount();
    			$cardinfo['actions'] = $card->getActions();  
    			
    			array_push($gamestate[$rowname], $cardinfo);
    		}
    	}
    	
    	return $gamestate;
    }
    
    function getName()
    {
        return $this->name;
    }
    
    function setName($name)
    {
        $this->name = $name;
    }
    
    function getValue($key)
    {
        if (array_key_exists($key, $this->values))
        {
            return $this->values[$key];
        }
        
        return 99;
    }
    
    function setValues($key, $value)
    {
        $this->values[$key] = $value;
    }
    
    function addCardID($Type, $CardID)
    {
    	if ($Type >= 0 && $Type < TypeCount)
    	{
    		if (!is_array($this->Board[$Type]))
    		{
    			$this->Board[$Type] = array();
    		}
    		array_push($this->Board[$Type], new Card($CardID));
    	}
    }
    
    function setCard($Type, $Index, $Card)
    {
    	if ($Type >= 0 && $Type < TypeCount)
    	{
    		if (!is_array($this->Board[$Type]))
    		{
    			$this->Board[$Type] = array();
    		}
    		$this->Board[$Type][$Index] = $Card;
    	}
    }
    
    function getCard($Type, $Index)
    {
    	if ($Type >= 0 && $Type < TypeCount)
    	{
    		if (!is_array($this->Board[$Type]))
    		{
    			$this->Board[$Type] = array();
    		}
    		return $this->Board[$Type][$Index];
    	}
    	
    	return null;
    }
    
    function removeCardID($CardID)
    {
    	foreach ($this->Board as $rows)
    	{
    		$found = array_search($CardID, $rows);
    		if ($found !== false)
    		{
    			unset($rows[$found]);
    			return;
    		}
    	}
    }
}

?>