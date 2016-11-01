<?php

class Card
{
	private $keyvalues = null;
    
    private $ID = "new";
    
    private $unitcount = 0;

	function Card($init = array())
	{
		if (is_array($init))
		{
			$this->setValues($init);
		}
		else if (is_int($init))
		{
			$this->ID = $init;
		}
	}
	
	function getValue($key, $defaultValue = null)
	{
		if (array_key_exists($key, $this->keyvalues))
		{
			return $this->keyvalues[$key];
		}
		
		if (isset($defaultValue))
		{
			return $defaultValue;
		}
		
		return "";
	}
	
	function setValues($anArray)
	{
		$this->keyvalues = array_filter($anArray, array($this, "filterEmpty"));
		
		unset($this->keyvalues['POPUPCHECK']);
		
		unset($this->keyvalues['action']);
		
		unset($this->keyvalues['submit']);
	}
	
	function setValue($key, $v)
	{
		$this->keyvalues[$key] = $v;
	}
	
	function setID($id)
	{
		$this->ID = $id;
	}
	
	function getID()
	{
		return $this->ID;
	}
	
	function getImagePath()
	{
		return "img/cards/" . $this->ID . ".png";
	}
	
	function getName()
	{
		if (array_key_exists('Kartenname', $this->keyvalues))
		{
			return $this->keyvalues['Kartenname'];
		}
		
		return 'unbenannt';
	}
	
	function getUnitCount()
	{
		return $this->unitcount;
	}
	
	function setUnitCount($count)
	{
		$this->unitcount = $count;
	}
	
	function getActions()
	{
		$actions = array();
		
		array_push($actions, "kartespielen");
		
		return $actions;
	}
	
	function filterEmpty($arg)
	{
		if (isset($arg))
		{
			if (strlen($arg) == 0)
			{
				return false;
			}
			if (is_numeric($arg))
			{
				return intval($arg);
			}
			
			return true;
		}
		
		return false;
	}
}

?>