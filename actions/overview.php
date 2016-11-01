<?php

include_once "action.php";
include_once "model/Database.php";

class OverviewAction extends Action
{
	function OverviewAction($request)
	{
	}
	
	function generateHTML()
	{
		$db = Database::getInstance();
		
		$cards = $db->getAllCards();
		
		$output = "";
		foreach ($cards as $card)
		{
			$output .= "<div class='previewblock'><a href='index.php?action=edit&id=".
                $card->getID()."'><img class='preview' src='".
                $card->getImagePath()."'></a><div class='previewlabel'>".
                $card->getName()."</div><div class='previewid'>".
                $card->getID()."</div></div>";
		}
		
		$output .= "<div class='previewblock'><a href='index.php?action=edit&id=new'>".
            "<img class='preview' src='img/cards/add.png'></a><br> &lt Neue Karte &gt </div>";
		
		return $output;
	}
}

?>