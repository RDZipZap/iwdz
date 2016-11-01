<?php

include_once "action.php";
include_once "model/Database.php";
include_once "model/Game.php";
include_once "model/Player.php";

class PlayAction extends Action
{
    function PlayAction($request)
    {
    }
    
    // prints the current stats of the game
    function printStats()
    {
        $db = Database::getInstance();
        
        $players = $db->getGame()->getPlayers();
        
        foreach ($players as $player)
        {
            $output .= "<div class='infobar'><span class='playername'>" . $player->getName() . "</span> ";
            $output .= "<div class='anfuehrer'>Anfuehrer</div> ";
            $output .= "<span class='zivil infobar-entry-width'>" . $player->getValue('Zivil') . "/" . $player->getValue('ZivilMax') . "</span> ";
            $output .= "<span class='militaer infobar-entry-width'>" . $player->getValue('Militaer') . "/" . $player->getValue('MilitaerMax') . "</span> ";
            $output .= "<span class='kultur infobar-entry-width'>" . $player->getValue('Kultur') . "(+" . $player->getValue('Kulturzuwachs') . ")</span> ";
            $output .= "<span class='armee infobar-entry-width'>" . $player->getValue('Armee') . "</span> ";
            $output .= "<span class='wissenschaft infobar-entry-width'>" . $player->getValue('Wissenschaft') . "(+" . $player->getValue('Wissenschaftszuwachs') . ")</span> ";
            $output .= "<span class='arbeiter infobar-entry-width'>" . $player->getValue('Arbeiter') . "</span> ";
            $output .= "<span class='arbeiter infobar-entry-width'>" . $player->getValue('GelberVorrat') . "</span> ";
            $output .= "<span class='arbeiter infobar-entry-width'>" . $player->getValue('Arbeitslose') . "</span> ";
            $output .= "<span class='zufriedenheit infobar-entry-width'>" . $player->getValue('Zufriedenheit') . "</span> ";
            $output .= "<br>";
            $output .= "<span class='rohstoff infobar-entry-width'>" . $player->getValue('Rohstoff') . "(";
            $output .= "<span class='blauervorrat1 infobar-entry-width'>" . $player->getValue('BlauerVorrat1') . "</span>, ";
            $output .= "<span class='blauervorrat2 infobar-entry-width'>" . $player->getValue('BlauerVorrat2') . "</span>, ";
            $output .= "<span class='blauervorrat3 infobar-entry-width'>" . $player->getValue('BlauerVorrat3') . "</span>)</span> ";
            $output .= "<span class='nahrung infobar-entry-width'>" . $player->getValue('Nahrung') . "(";
            $output .= "<span class='blauervorrat1 infobar-entry-width'>" . $player->getValue('BlauerVorrat1') . "</span>, ";
            $output .= "<span class='blauervorrat2 infobar-entry-width'>" . $player->getValue('BlauerVorrat2') . "</span>, ";
            $output .= "<span class='blauervorrat3 infobar-entry-width'>" . $player->getValue('BlauerVorrat3') . "</span>)</span> ";
            $output .= "<span class='blauervorrat infobar-entry-width'>" . $player->getValue('BlauerVorrat') . "</span>";
            $output .= "</div><hr>";
        }
        
        return $output;
    }
	
	function printCardRow()
	{
		$output = "<div class='section-header'>Kartenreihe</div>";
		
		$output .= "<div class='kartenauslage center-cards'>";
		
		for ($i = 0; $i < 13; $i++)
		{
			$output .= "<div class='auslage-slot'><div class='auslage-karte'></div><div class='auslage-preis'>";
			$output .= "<img src='img/Zivil.png'>";
			$output .= $i > 4 ? "<img src='img/Zivil.png'>" : "";
			$output .= $i > 8 ? "<img src='img/Zivil.png'>" : "";
			$output .= "</div></div>";
		}
		
		$output .= "</div>";
	
		return $output;
	}
    
    function printCities()
    {
        $list = "";
        $divs = "";
        
        $db = Database::getInstance();
        
        $players = $db->getGame()->getPlayers();
        
        $count = 1;
        foreach ($players as $player)
        {
            $name = $player->getName();
            $id = "player-$count";
            
            $list .= "<li><a href='#$id'>$name</a></li>";
			$divs .= "<div id='$id'>";
			$divs .= "<div class='section-header'>Handkarten</div>";
			$divs .= "<div class='kartenblock'></div>";
			$divs .= "<div class='section-header'>Produktion</div>";
			$divs .= "<div class='kartenblock'></div>";
			$divs .= "<div class='section-header'>Staedtische Gebaeude</div>";
			$divs .= "<div class='kartenblock'></div>";
			$divs .= "<div class='section-header'>Armee</div>";
			$divs .= "<div class='kartenblock'></div>";
			$divs .= "<div class='section-header'>Wunder</div>";
			$divs .= "<div class='kartenblock'></div>";
			$divs .= "</div>";
			
			$count++;
        }
        return "<div id='players'><ul>$list</ul>$divs</div>";
    }
    
    function generateScript()
    {
    	$script = "$('#players').tabs();";
    	$script .= "$.getJSON('update.php', { action: 'initialupdate' }, onInitialUpdate);";
        return $script;
    }
    
    function generateHTML()
    {
        $output = $this->printStats();
        $output .= $this->printCardRow();
        $output .= $this->printCities();
        return $output;
    }
}
?>