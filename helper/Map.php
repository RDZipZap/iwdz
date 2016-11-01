<?php

class Map
{
	var $_myArray = array();
	
	function Map($anArray)
	{
		if (isset($anArray))
		{
			$this->_myArray = $anArray;
		}
	}
	
	function getValue($key, $defaultValue)
	{
		if (array_key_exists($key, $this->_myArray))
		{
			return $this->_myArray[$key];
		}
		
		if (isset($defaultValue))
		{
			return $defaultValue;
		}
		
		return null;
	}
    
    function getArray()
    {
        return $this->_myArray;
    }
}

?>