/* adds an amount or value of a member to a member of active player
if no Amount given, 1 is assumed
if no Level given, 0 is assumed
params: Amount, Source, Target, Level */
Defaults.add = { Amount: 1, Source: 'BluePool', Target: 'BluePool', Level: 0 };
Commands.add = function(params)
{
	var amount = 1;
	var level = 0;
	
	if ('Level' in params)
	{
		level = params.Level;
	}
	
	if ('Amount' in params)
	{
		amount = params.Amount;
	}
	else if ('Source' in params)
	{
		amount = State.ActivePlayer[params.Source];
	}
	
	if ('Target' in params)
	{
		var newValue = 0;
		if ($.isArray(State.ActivePlayer[params.Target]))
		{
			State.ActivePlayer[params.Target][level] += amount;
			newValue = State.ActivePlayer[params.Target][level];
		}
		else
		{
			State.ActivePlayer[params.Target] += amount;
			newValue = State.ActivePlayer[params.Target];
		}
		
		if (newValue >= 0)
		{
			log('added ' + amount + ' to ' + params.Target + ' = ' + State.ActivePlayer[params.Target]);
		}
		else
		{
			log('negative result');
			return false;
		}		
	}
	else
	{
		log('Error - no target defined');
		return false;
	}

	return true;
}

/* moves things around. removes an amount from source and puts it to target.
if no amount given, amount of 1 is assumed
if no target given, active card is selected
if no source given, active card is selected
if no level is given, level 0 is assumed
params: Amount, Source, Target, Level */
Defaults.move = { Amount: 1, Source: 'BluePool', Target: 'BluePool', Level: 0 };
Commands.move = function(params)
{
	var amount = 1;
	var logText = '';
	var level = 0;
	
	if ('Amount' in params)
	{
		amount = params.Amount;
	}
	
	if (amount < 1)
	{
		log('Error: amount is ' + amount + '. Not allowed.');
		return false;
	}
	
	if ('Level' in params)
	{
		level = params.Level;
	}
	
	if ('Source' in params)
	{
		var newValue = 0;
		if ($.isArray(State.ActivePlayer[params.Source]))
		{
			State.ActivePlayer[params.Source][level] -= amount;
			newValue = State.ActivePlayer[params.Source][level];
		}
		else
		{
			State.ActivePlayer[params.Source] -= amount;
			newValue = State.ActivePlayer[params.Source];
		}
		
		if (newValue >= 0)
		{
			logText = 'removed ' + amount + ' from ' + params.Source + ' ';
		}
		else
		{
			log('negative result in source');
			return false;
		}		
	}
	else if ('Target' in params)
	{
		if (params.Target == 'WorkersAvailable')
		{
			// destruction of a house
			var index = $.inArray(State.ActiveCard, Cards);
			if (index in State.ActivePlayer.Buildings)
			{
				State.ActivePlayer.Buildings[index] -= amount;
				if (State.ActivePlayer.Buildings[index] == 0)
				{
					delete State.ActivePlayer.Buildings[index];
				}
				else if (State.ActivePlayer.Buildings[index] < 0)
				{
					log('destructed more buildings than existed');
					return false;
				}
			}
			else
			{
				log('no building exists');
				return false;
			}
		}
	}
	else
	{
		log('Error: no source for move command found');
		return false;
	}
	
	if ('Target' in params)
	{
		// add amount to target
		var newValue = 0;
		if ($.isArray(State.ActivePlayer[params.Target]))
		{
			State.ActivePlayer[params.Target][level] += amount;
			newValue = State.ActivePlayer[params.Target][level];
		}
		else
		{
			State.ActivePlayer[params.Target] += amount;
			newValue = State.ActivePlayer[params.Target];
		}
		
		if (newValue >= 0)
		{
			logText = logText + 'added ' + amount + ' to ' + params.Target 
				+ ' = ' + State.ActivePlayer[params.Target];
		}
		else
		{
			log('negative result');
			return false;
		}		
	}
	else if ('Source' in params)
	{
		if (params.Source == 'WorkersAvailable')
		{
			// construction of a house
			var index = $.inArray(State.ActiveCard, Cards);
			if (!(index in State.ActivePlayer.Buildings))
			{
				State.ActivePlayer.Buildings[index] = 0;
			}
			State.ActivePlayer.Buildings[index] += amount;
		}
	}
	else
	{
		log('Error: no target for move command found');
		return false;
	}

	log(logText);
	logText = '';

	return true;
}

/* use this command to transfer an amount of food or resources to or from farms
and mines. The values will be adapted to the current technologies */
Defaults.transfer = { Amount: 1 };
Commands.transfer = function(params)
{
	var amount = 1;
	if ('Amount' in params)
	{
		amount = params.Amount;
	}
	
	if (amount > 0)
	{
		// for every element of amount the lowest level element get
		// moved down to prior level. if level was already 0 it is
		// moved to the blue counter
		while (amount > 0)
		{
			var ok = false;
			for (var i = 0; i < 4; i++)
			{
				if (State.ActivePlayer[params.Source][i] > 0)
				{
					State.ActivePlayer[params.Source][i] -= 1;
					if (i > 0)
					{
						State.ActivePlayer[params.Source][i] += 1;
					}
					else
					{
						blue++;
					}
					ok = true;
					break;
				}
			}
			
			if (ok)
			{
				amount--;
			}
			else
			{
				log('not enough ' + params.Source);
				return false;
			}
		}
	}
	else if (amount < 0)
	{
	}
	
	return true;
}

/* builds a building on the active card */
Commands.build = function(params)
{
	return false;
}
