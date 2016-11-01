<?php

include_once "action.php";
include_once "overview.php";
include_once "model/Database.php";

class SaveAction extends Action
{
	function SaveAction($request, $files)
	{
		// store uploaded files and update database
		$db = Database::getInstance();
		
		$ID = $request->getValue("id", "new");

		if ($ID != "new")
		{
			$card = $db->lookupCard($ID);
		}
		
		if (!isset($card))
		{
			$card = new Card($request->getArray());
			
			$db->addCard($card);
		}
		else
		{
			$card->setValues($request->getArray());
			
			$db->setCard($card);
		}
        
        $imagePath = $card->getImagePath();
		
        if (isset($_FILES['KartenGrafik'])) 
        {
            $error = $_FILES['KartenGrafik']['error'];
            $type = $_FILES['KartenGrafik']['type'];
            $name = $_FILES['KartenGrafik']['name'];
            $tmpname = $_FILES['KartenGrafik']['tmp_name'];
            $size = $_FILES['KartenGrafik']['size'];
            
            if ($error == UPLOAD_ERR_OK) 
            {
				echo "Upload ok -> Speichere $tmpname als $imagePath<br>";

				if (file_exists($imagePath))
				{
					unlink($imagePath);
				}
				
                rename($tmpname, $imagePath);
				
				chmod($imagePath, 0644);
            }
        }
	}

	function followupAction()
	{
		return new OverviewAction($this->request);
	}
}

?>