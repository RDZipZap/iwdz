<?php

class Game
{
    private $players = array();
    
    private $aktuellerSpieler = 0;
    
    private $aktuelleszeitalter;
    
    private $letzterunde = false;
    
    private $openCards = array();
    
    private $zivilkartenstapel = array();
    
    private $militartkartenstapel = array();
    
    private $zukuenftigeereignisse = array();
    
    private $gegenwaertigeereignisse = array();
    
    private $vergangeneereignisse = array();
    
    function Game($playerNames)
    {
        foreach($playerNames as $name)
        {
            array_push($this->players, new Player($name));
        }
        
        $aktuelleszeitalter = 0;
        
        $this->openCards = array_pad($this->openCards, 13, -1);
        
        // Kartenstapel herrichten
        $this->prepareCardStack($this->getAktuellesKartenset());
        
        // ... und austeilen
        $this->fillOpenCards();
    }
    
    function getGamestate($playerID)
    {
    	$gamestate = array();
    	
    	//$gamestate['debug'] = $this->zivilkartenstapel;
    	
    	$gamestate['players'] = array();
    	
    	foreach($this->players as $player)
    	{
    		array_push($gamestate['players'], $player->getGamestate());
    	}
    	
    	$gamestate['opencards'] = $this->openCards;
    	
    	$gamestate['aktuellerspieler'] = $this->aktuellerSpieler;
    	
    	$gamestate['aktuelleszeitalter'] = $this->aktuelleszeitalter;
    	
	    $gamestate['zukuenftigeereignisse'] = $this->zukuenftigeereignisse;
    
		$gamestate['gegenwaertigeereignisse'] = $this->gegenwaertigeereignisse;
    
 	    $gamestate['vergangeneereignisse'] = $this->vergangeneereignisse;
    	
    	return $gamestate;
    }
    
    function getPlayers()
    {
        return $this->players;
    }
    
    function getAktuellesKartenset()
    {
        $db = Database::getInstance();
        
        $allCards = $db->getAllCards();
        
    	$playerCount = count($this->players);
        
        $kartenset = array();
		$kartenset['zivil'] = array();
		$kartenset['militaer'] = array();
        
        foreach ($allCards as $aCard)
        {
        	if (intval($aCard->getValue('Kartenset')) < $playerCount - 1)
        	{
        		if ($this->aktuelleszeitalter == intval($aCard->getValue('Zeitalter')))
        		{
        	  	switch (intval($aCard->getValue('Kartenart')))
        	  	{
                    case 0: // Anfuehrer
			        	array_push($kartenset['zivil'], $aCard);
			        	break;
                    case 1: // Wunder
			        	array_push($kartenset['zivil'], $aCard);
			        	break;
                    case 2: // Aktion
			        	array_push($kartenset['zivil'], $aCard);
			        	break;
                    case 3: // Spezialtechnologie
			        	array_push($kartenset['zivil'], $aCard);
			        	break;
                    case 4: // Staedtisches Gebaeude
			        	array_push($kartenset['zivil'], $aCard);
			        	break;
                    case 5: // Farm
			        	array_push($kartenset['zivil'], $aCard);
			        	break;
                    case 6: // Mine
			        	array_push($kartenset['zivil'], $aCard);
			        	break;
                    case 7: // Einheit
			        	array_push($kartenset['militaer'], $aCard);
			        	break;
                    case 8: // Regierungsform
			        	array_push($kartenset['zivil'], $aCard);
			        	break;
                    case 9: // Politische Aktion
			        	array_push($kartenset['militaer'], $aCard);
			        	break;
                    case 10: // Taktik
			        	array_push($kartenset['militaer'], $aCard);
			        	break;
                    case 11: // Bonus
			        	array_push($kartenset['militaer'], $aCard);
			        	break;
                    case 12: // Pakt
			        	array_push($kartenset['militaer'], $aCard);
			        	break;
			        }
        	  	}
        	}
        }
  
        return $kartenset;
    }
    
    function loadCardStack(&$stapel, $kartenset)
    {
    	$stapel = array();
    	if (is_array($kartenset))
    	{
	    	foreach ($kartenset as $card)
    		{
    			array_push($stapel, $card->getID()); 
    		}
    	}
    }
        
    function mixCardStack(&$stapel)
    {
    	shuffle($stapel);
    }
    
    function prepareCardStack(&$kartenset)
    {
       	// zivilkarten bereitlegen
        $this->loadCardStack($this->zivilkartenstapel, $kartenset['zivil']);
        
        $this->mixCardStack($this->zivilkartenstapel);
        
        // militaerkartenstapel bereitlegen
        $this->loadCardStack($this->militaerkartenstapel, $kartenset['militaer']);
        
        $this->mixCardStack($this->militaerkartenstapel);
    }
        
    function fillOpenCards()
    {
    	// abhaengig von der Spieleranzahl werden die ersten Karten entfernt
    	$count = 5 - count($this->players);
    	for ($i = 0; $i < $count; $i++)
    	{
    		$this->openCards[$i] = -1;
    	}
    
    	// zuerst mal alle gezogenen Karten entfernen. Die Positionen sind mit -1 markiert.
    	for ($i = 0; $i < 13; $i++)
    	{
    		if ($this->openCards[$i] == -1)
    		{
	    		for ($n = $i + 1; $n < 13; $n++)
    			{
    				if ($this->openCards[$n] != -1)
    				{
    					$this->openCards[$i] = $this->openCards[$n];
    					
    					$this->openCards[$n] = -1;
    					
    					break;
    				}
    			}
    		}

    		if ($this->openCards[$i] == -1)
    		{
    			// immer noch nichts eingetragen. Also neu vom Stapel ziehen
    			if (count($this->zivilkartenstapel))
    			{
	    			$this->openCards[$i] = array_pop($this->zivilkartenstapel);
	    			
    				if (count($this->zivilkartenstapel) == 0)
    				{
    					// neues Zeitalter bricht an:
    					$this->aktuelleszeitalter++;
    				
 	   					if ($this->aktuelleszeitalter < 4)
    					{
    						$this->prepareCardStack($this->getAktuellesKartenset());
    					}
    					else
    					{
    						$this->letzterunde = true;
    					}
    				}
    			}
    		}
    	}
    }
}

?>