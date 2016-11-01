<?php
include_once "model/Database.php";
include_once "model/Player.php";
include_once "model/Game.php";

$action = $_REQUEST['action'];
$db = Database::getInstance();

switch ($action)
{
	case 'initialupdate':
	{
		$game = $db->getGame();
		echo json_encode($game->getGamestate(0));
		break;
	}
}


?>