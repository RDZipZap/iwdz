function Game(playerNames, gameMode)
{
	this.Mode =
	{
		Beginner: "Beginner",
		Advanced: "Advanced",
		Expert: "Expert"
	}
	
	this.Age =
	{
		A  : "antiquity",					// Antiquity - start age
		I  : "first age",					// first age
		II : "second age",					// second age
		III: "third age",					// third age
		IV : "fourth age",					// fourth age - only available in expert game mode
	}
	
	this.Phase =
	{
		UpdateCardRow: "Update card row.",
		CiMiActions: "Civil and military actions.",
		UpdateGameBoard: "Update game board."
	}
	
	this.Cards = [];
	
	var State = 
	{
		Players: [],					// array of all participating players
		StartPlayer: null,				// the player that started the game
		Mode: gameMode,
		Age: this.Age.A,
		Phase: this.Phase.UpdateCardRow,
		ActivePlayer: null,				// current player
		CivilCardStack: null,			// current stack of civil cards on game board
		MilitaryCardStack: null			// current stack of military cards on game board
	}
	
	// initializes the game board for the first time
	var init = function(playerNames)
	{
		// init all participating players
		Players = [];
		for (var i = 0; i < playerNames.length; i++)
		{
			Players.push(new Player(playerNames[i]));
		};
		State.StartPlayer = Players[0];
		State.ActivePlayer = Players[0];
		
		var playerCount = Players.length;
		
		var match = 
		{
			CardType: Card.Type.Civil,
			GameMode: State.Mode,
			PlayerCount: playerCount,
			Age: State.Age
		}
		
		// fill card stacks
		State.CivilCardStack =	new CardStack(match);
		
		match.CardType = Card.Type.Military;
		State.MilitaryCardStack = new CardStack(match);
	}

	log("Start initializing game...");
	init(playerNames);
	log("Finished initializing game.");
}

/* encapsules all stuff regarding a player, e.g. points, card hand, buildings, etc. */
function Player(name)
{
	this.Name = name;
	this.CulturePoints = 0;
	this.CultureInc = 1;
	this.SciencePoints = 2;
	this.ScienceInc = 3;
	this.CardHand = [];
	
	this.Output = $('#templates .player').clone().appendTo('#currentstate');
	
	this.print = function()
	{
		this.Output.find('.name .value').text(this.Name);
		this.Output.find('.culturepoints .value').text(this.CulturePoints);
		this.Output.find('.cultureinc .value').text(this.CultureInc);
		this.Output.find('.sciencepoints .value').text(this.SciencePoints);
		this.Output.find('.scienceinc .value').text(this.ScienceInc);
	}
	
	this.print();
	log("Created player " + name);
}

/* base class for all crads in the game */
function Card(data)
{
	this.Type = 
	{
		Civil: "Civil card",
		Military: "Military card"
	}
	
	this.Category =
	{
		Resource: "Resource card",
		CommonBuilding: "Common building",
		Religion: "Religion",
		Research: "Research"
		// ...
	}
	
	var Data = data;
	
	this.isMatching = function(match)
	{
		var matching = true;
		$.each(match, function(criteria, value)
		{
			if (criteria in Data)
			{
				if (value != Data[criteria])
				{
					matching = false;
				}
			}
			else
			{
				matching = false;
			}
		});
		
		return matching;
	}
}

/* a set of cards which can be shuffled. returns one cards at a time that will be removed from the set. */
function CardStack(match)
{
	var CardMatch = match;
	this.List = [];
	
	var init = function()
	{
		var cards = [];
		var match = CardMatch;
		
		$.each(Game.Cards, function(key, aCard)
		{
			if (aCard.isMatching(match))
			{
				cards.push(aCard);
			}
		});
	}
	
	this.shuffle = function()
	{
		log("Card stack shuffled");
	}
	
	init();
	
	this.shuffle();
}

/* a placeholder for one or many cards matching certain criterias. */
function CardSlot()
{
	
}

/* one or many cards shown to the player. radom access. */
function CardRow()
{
}

/* an actionConfiguration is the static part, or configuration part of actions. Each different configuration is represented by a single ActionConfiguration. */
function ActionConfiguration()
{
	
}


/* an action is a concrete game action. It's configured by an ActionConfiguration and allow execution and
   rewinding of the action */
function Action(actionConfig)
{
	var m_ActionConfig = actionConfig;

	this.execute = function()
	{
	}
	
	this.rewind = function()
	{
	}
	
	this.canExecute() = function()
	{
		return true;
	}
}