<?php

include_once "action.php";
include_once "model/Database.php";
include_once "helper/Map.php";

class EditAction extends Action
{
	private $card = null;
	
	private $id = "new";

	function EditAction($request)
	{
		$this->id = $request->getValue("id", "new");
		
		$db = Database::getInstance();
		
		$this->card = $db->lookupCard($this->id);
		
		if (!isset($this->card))
		{
			$this->card = new Card();
		}
        else
        {
            $this->convertCard();
        }
	}
    
    function convertCard()
    {
    	// nop
	}
	
	function generateDropDown($card, $attribute, $values)
	{
		$selectedValue = $card->getValue($attribute);
		
        $output .= '<select class="aligned" data-label="';
        $output .= $attribute;
        $output .= '" name="';
        $output .= $attribute . '">';

		foreach ($values as $index => $value)
		{
	        $output .= '<option ';
			if ($selectedValue == $index)
			{
				$output .= 'selected="selected" ';
			}
	        $output .= "value='$index'>";
    	    $output .= $value;
        	$output .= '</option>';
        }
        
        $output .= "</select>";
        return $output;
	}
    
	function generateHTML()
	{
		return $this->printForm();
	}

	function printForm()
	{
		$KartenGrafik = $this->card->getImagePath();
		$Zeitalter = $this->card->getValue("Zeitalter", "0");
		$Kartenart = $this->card->getValue("Kartenart", "0");
		$Kartenset = $this->card->getValue("Kartenset", "0");
		$Kartenname = $this->card->getValue("Kartenname");
        $Adressat = $this->card->getValue("Adressat");
        $Wissenschaftskosten = $this->card->getValue("Wissenschaftskosten");
        $Bonusart = $this->card->getValue("Bonusart");
        $Bonusbedingung = $this->card->getValue("Bonusbedingung");
        $Kulturpunkte = $this->card->getValue("Kulturpunkte");
        $Wissenschaftspunkte = $this->card->getValue("Wissenschaftspunkte");
        $Zufriedenheit = $this->card->getValue("Zufriedenheit");
        $Militaerstaerke = $this->card->getValue("Militaerstaerke");
        $Zivilaktionen = $this->card->getValue("Zivilaktionen");
        $Militaeraktionen = $this->card->getValue("Militaeraktionen");
        $Kolonisierungsbonus = $this->card->getValue("Kolonisierungsbonus");
        $Verteidigungsbonus = $this->card->getValue("Verteidigungsbonus");
        $Nahrung = $this->card->getValue("Nahrung");
        $Rohstoffe = $this->card->getValue("Rohstoffe");
        $Gebaeudeanzahl = $this->card->getValue("Gebaeudeanzahl");
        $Bevoelkerung = $this->card->getValue("Bevoelkerung");
        $GelberVorrat = $this->card->getValue("GelberVorrat");
        $Kolonie = $this->card->getValue("Kolonie");
        $Rabattbedingung = $this->card->getValue("Rabattbedingung");
        $Rabattmenge = $this->card->getValue("Rabattmenge");
        $Einheitname = $this->card->getValue("Einheitname");
        $Einheitkosten = $this->card->getValue("Einheitkosten");
        $Einheitkulturpunkte = $this->card->getValue("Einheitkulturpunkte");
        $Einheitwissenschaftspunkte = $this->card->getValue("Einheitwissenschaftspunkte");
        $Einheitnahrung = $this->card->getValue("Einheitnahrung");
        $Einheitrohstoffe = $this->card->getValue("Einheitrohstoffe");
        $Einheitzufriedenheit = $this->card->getValue("Einheitzufriedenheit");
        $Einheitmilitaerstaerke = $this->card->getValue("Einheitmilitaerstaerke");
	
		return '<form action="index.php?action=save&id='.$this->id.'" enctype="multipart/form-data" method="post" id="htmlform" name="htmlform">
      <div class="formbody">
        <ol>
          <li>
            <p>
              <div class="attributelabel">Aktuelle Kartengrafik:</div> <img src="' . $KartenGrafik . '">
            </p>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Karten Grafik</label>
                </div>
                <div class="attributevalue">
                  <input type="file" name="KartenGrafik">
				  <span class="attributedesc">Hier bitte eine *.png Datei auswaehlen, die die aktuelle Karte darstellt</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Zeitalter</label>
                </div>
                <div class="attributevalue">' .
                $this->generateDropDown($this->card, "Zeitalter", array(
                	"Zeitalter A", 
                	"Zeitalter I", 
                	"Zeitalter II", 
                	"Zeitalter III"))
                . '</div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Kartenart</label>
                </div>
                <div class="attributevalue">' .
                $this->generateDropDown($this->card, "Kartenart", array(
                	"Anfuehrer", 
                	"Wunder", 
                	"Aktion",
                	"Spezialtechnologie", 
                	"Staedtisches Gebaeude", 
                	"Farm", 
                	"Mine", 
                	"Einheit",
                	"Regierungsform", 
                	"Politische Aktion", 
                	"Taktik", 
                	"Bonus", 
                	"Pakt"))
                . '<span class="attributedesc">Die Kartenart legt auch fest, ob es sich um eine Zivil- oder Militaerkarte handelt</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Kartenset</label>
                </div>
                <div class="attributevalue">' .
                $this->generateDropDown($this->card, "Kartenset", array(
                	"1-2 Spieler", 
                	"1-3 Spieler", 
                	"1-4 Spieler", 
                	"Startkarte"))
                . '<span class="attributedesc">Legt das Kartenset fest. Startkarten sind fuer jeden Spieler von Begin an eingesetzt.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Kartenname</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Kartenname" name="Kartenname" value="' . $Kartenname . '">
                  <span class="attributedesc">Kurzer Name der Karte (ueberschrift)</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Adressat</label>
                </div>
                <div class="attributevalue">' .
                $this->generateDropDown($this->card, "Adressat", array(
                	"der aktive Spieler", 
                	"jeder", 
                	"der Schwaechere", 
                	"der Staerkere",
                	"der mit den meisten Kulturpunkten",
                	"der Zufriendenste"))
                . '<span class="attributedesc">Legt den Empfaenger fuer einen Bonus/Malus fest.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Wissenschaftskosten</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Wissenschaftskosten" name="Wissenschaftskosten" value="' . $Wissenschaftskosten . '">
				  <span class="attributedesc">Anzahl an Wissenschaftspunkten, die diese Karte/Technologie kostet.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Bonusart</label>
                </div>
                <div class="attributevalue">' .
                $this->generateDropDown($this->card, "Bonusart", array(
                	"jede Runde", 
                	"einmalig"))
                . '<span class="attributedesc">Legt den Empfaenger fuer einen Bonus/Malus fest.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Bonusbedingung</label>
                </div>
                <div class="attributevalue">' .
                $this->generateDropDown($this->card, "Bonusbedingung", array(
                	"keine", 
                	"nach Bau einer Technologie",
                	"nach Erhoehung der Bevoelkerung"))
                . '<span class="attributedesc">Bestimmt, wodurch der Bonus ausgeloest wird.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Kulturpunkte</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Kulturpunkte" name="Kulturpunkte" value="' . $Kulturpunkte . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Wissenschaftspunkte</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Wissenschaftspunkte" name="Wissenschaftspunkte" value="' . $Wissenschaftspunkte . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Zufriedenheit</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Zufriedenheit" name="Zufriedenheit" value="' . $Zufriedenheit . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Militaerstaerke</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Militaerstaerke" name="Militaerstaerke" value="' . $Militaerstaerke . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Zivilaktionen</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Zivilaktionen" name="Zivilaktionen" value="' . $Zivilaktionen . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Militaeraktionen</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Militaeraktionen" name="Militaeraktionen" value="' . $Militaeraktionen . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Kolonisierungsbonus</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Kolonisierungsbonus" name="Kolonisierungsbonus" value="' . $Kolonisierungsbonus . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Verteidigungsbonus</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Verteidigungsbonus" name="Verteidigungsbonus" value="' . $Verteidigungsbonus . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Nahrung</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Nahrung" name="Nahrung" value="' . $Nahrung . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Rohstoffe</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Rohstoffe" name="Rohstoffe" value="' . $Rohstoffe . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Gebaeudeanzahl</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Gebaeudeanzahl" name="Gebaeudeanzahl" value="' . $Gebaeudeanzahl . '">
				  <span class="attributedesc">Gibt die maximale Gebaeudeanzahl pro Technologiekarte an.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Bevoelkerung</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Bevoelkerung" name="Bevoelkerung" value="' . $Bevoelkerung . '">
				  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>GelberVorrat</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="GelberVorrat" name="GelberVorrat" value="' . $GelberVorrat . '">
                  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Kolonie</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Kolonie" name="Kolonie" value="' . $Kolonie . '">
                  <span class="attributedesc">Gilt in Abhaengigkeit von Bonusart und Bonusbedingung.</span>
                </div>
             </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Rabattbedingung</label>
                </div>
                <div class="attributevalue">' .
                $this->generateDropDown($this->card, "Rabattbedingung", array(
                	"auf Bau einer Mine oder Farm", 
                	"auf Bau eines staedtischen Gebaeudes", 
                	"auf Bau eines Wunderteils", 
                	"auf Bau einer Militaereinheit", 
                	"auf Verbesserung einer Farm oder Mine", 
                	"auf Verbesserung eines Gebaeudes (alle)"))
                . '<span class="attributedesc">Bestimmt, auf was sich der Rabatt auswirkt.</span>
                </div>
            </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Rabattmenge</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Rabattmenge" name="Rabattmenge" value="' . $Rabattmenge . '">
                  <span class="attributedesc">Hoehe des Rabattes. Wird bedingt durch die Rabattbedingung.</span>
                </div>
             </div>
          </li>
          <li>
          <hr>
          <h3>Gebaeude- / Einheitenwerte</h3>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Einheitname</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Einheitname" name="Einheitname" value="' . $Einheitname . '">
                  <span class="attributedesc">Name der Einheit oder des Gebaeudes.</span>
                </div>
             </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Einheitkosten</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Einheitkosten" name="Einheitkosten" value="' . $Einheitkosten . '">
                  <span class="attributedesc">Kosten der Einheit oder des Gebaeudes.</span>
                </div>
             </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Einheitkulturpunkte</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Einheitkulturpunkte" name="Einheitkulturpunkte" value="' . $Einheitkulturpunkte . '">
                  <span class="attributedesc">Kulturpunkte, die die Einheit oder das Gebaeude erzeugt.</span>
                </div>
             </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Einheitwissenschaftspunkte</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Einheitwissenschaftspunkte" name="Einheitwissenschaftspunkte" value="' . $Einheitwissenschaftspunkte . '">
                  <span class="attributedesc">Wissenschaftspunkte, die die Einheit oder das Gebaeude erzeugt.</span>
                </div>
             </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Einheitnahrung</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Einheitnahrung" name="Einheitnahrung" value="' . $Einheitnahrung . '">
                  <span class="attributedesc">Nahrung, die die Einheit oder das Gebaeude erzeugt.</span>
                </div>
             </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Einheitrohstoffe</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Einheitrohstoffe" name="Einheitrohstoffe" value="' . $Einheitrohstoffe . '">
                  <span class="attributedesc">Rohstoffe, die die Einheit oder das Gebaeude erzeugt.</span>
                </div>
             </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Einheitzufriedenheit</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Einheitzufriedenheit" name="Einheitzufriedenheit" value="' . $Einheitzufriedenheit . '">
                  <span class="attributedesc">Zufriedenheit, die die Einheit oder das Gebaeude erzeugt.</span>
                </div>
             </div>
          </li>
          <li>
            <div class="attributeblock">
                <div class="attributelabel">
                  <label>Einheitmilitaerstaerke</label>
                </div>
                <div class="attributevalue">
                  <input type="text" data-label="Einheitmilitaerstaerke" name="Einheitmilitaerstaerke" value="' . $Einheitmilitaerstaerke . '">
                  <span class="attributedesc">Militaerstaerke, die die Einheit oder das Gebaeude erzeugt.</span>
                </div>
             </div>
          </li>
          <li>
            <input type="submit" value="Speichern" name="submit">
          </li>
        </ol>
      </div>
	  </form>';
	}
}
?>
	
