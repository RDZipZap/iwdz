<?php

include_once "helper/Map.php";

function printHeader($title)
{
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<title> <?php echo $title; ?> </title>
		<link type="text/css" rel="stylesheet" href="css/iwdz.css" />
		<link type="text/css" rel="stylesheet" href="css/ui-lightness/jquery-ui-1.8.11.custom.css" />
		<script type="text/javascript" src="js/jquery-1.5.1.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.11.custom.min.js"></script>
	</head>
  <body>
  <script>
<?php
}

function printScript($script)
{
	echo '		$(function()';
	echo '		{';
	echo '			$(".menubutton").button();';
	echo '			$("#overview").click(function () { window.location = "index.php"; });';
	echo '			$("#play").click(function () { window.location = "index.php?action=play"; });';
	echo '		' . $script;
	echo '		});';
}

function printMenu()
{
?>
  </script>
  <div class="menu">
   <button id="overview" class="menubutton">Übersicht</button>
   <button id="play" class="menubutton">Test</button>
  </div>
  <div class="main">
<?php
}

function printContent($content)
{
	echo $content;
}

function printFooter()
{
?>
    </div>
    <br class="clear" />
    <div class="footer">
      <hr/>
      Online Version: "Im Wandel der Zeiten"-Brettspiel
    </div>
  </body>
</html>
<?php
}

function selectAction($action)
{
	if (isset($action))
	{
		switch ($action)
		{
			case 'overview':
				include "actions/overview.php"; 
				return new OverviewAction(new Map($_REQUEST));
			case 'edit': 
				include "actions/edit.php";
				return new EditAction(new Map($_REQUEST));
			case 'play': 
				include "actions/play.php";
				return new PlayAction(new Map($_REQUEST));
			case 'save':
				include "actions/save.php";
				return new SaveAction(new Map($_REQUEST), new Map($_FILES)); 
		}
	}
	
	return new OverviewAction(new Map($_REQUEST));
}

// MAIN loop of the site

$Script = "";
$Content = "";
$request = new Map($_REQUEST);
$Action = selectAction($request->getValue("action", "overview"));

while(isset($Action))
{
	$Script .= $Action->generateScript();
	
	$Content .= $Action->generateHTML();
	
	// and now forward to the follow up action (action can be queued)
	$Action = $Action->followupAction();
}

// OUTPUT
printHeader("Im Wandel der Zeiten");
printScript($Script);
printMenu();
printContent($Content);
printFooter();

?>