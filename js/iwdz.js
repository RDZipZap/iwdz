/* State represents the complete game state. */
State =
{
	Players: [],					// array of all participating players
	StartPlayer: null,				// the player that started the game
	Mode: Game.Mode.Beginner,
	Age: Game.Age.A,
	Phase: Game.Phase.UpdateCardRow,
	ActivePlayer: null,				// current player
	ActiveCard: null,				// currently played card
	CivilCardStack: null,			// current stack of civil cards on game board
	MilitaryCardStack: null			// current stack of military cards on game board
}

DisplayList = [];					// contains the list of rendering elements (player, board, cards, ...)
UndoList = [];						// is used to rewind the game state.
RedoList = [];						// is used to redo commands on the game state.
Commands = {};						// all available commands to manipulate the game state.
Defaults = {};

/* activates a card. checks preconditions and executes the activation actions. */
function activateCard(card)
{
	State.ActiveCard = card;
	
	if (true /* todo: check preconditions here - or is it already handled by command system? */)
	{
		executeCommand(card.Activation);
	}
	
	State.ActiveCard = null;
}

/* executes a command. After successful execution, the command will be stored in the undo list. if not successful, the state changes will be reverted */
function executeCommand(command)
{
	var commandSuccessful = true;

	// store data for rewind and execute the command
	var commandEntry = 
	{
		Command: command,
		State: JSON.stringify(State)
	};
	
	if (!$.isArray(command))
	{
		command = [command];
	}
	
	$.each(command, function(index, singleCommand)
	{
		if (commandSuccessful)
		{
			if ('Name' in singleCommand)
			{
				var CommandName = singleCommand.Name;
				if (CommandName in Commands)
				{
					commandSuccessful = Commands[CommandName](singleCommand);
					if (!commandSuccessful)
					{
						log('command ' + CommandName + ' not successful executed');
					}
				}
				else
				{
					log('unknown command name: ' + CommandName);
					commandSuccessful = false;
				}
			}
			else
			{
				log('unnamed command');
				commandSuccessful = false;
			}
		}
	});
		
	if (commandSuccessful)
	{
		log('command successful executed');
		UndoList.push(commandEntry);
	}
	else
	{
		log('state reverted');
		State = JSON.parse(commandEntry.State);
	}
	
	displayAll();
}

/* reverts the effects of the last executed command. The command will be stored in the Redo list */
function rewindLastCommand()
{
	if (UndoList.length > 0)
	{
		var commandEntry = UndoList.pop();
		RedoList.push(commandEntry);
		
		State = JSON.parse(commandEntry.State);
		
		displayAll();
	}
}

function displayAll()
{
	$.each(DisplayList, function(index, Display)
	{
		Display.render();
	});
}

function initGame(playerNames, mode)
{
	log('initialize game...');
	// init all participating players
	Players = [];
	for (var i = 0; i < playerNames.length; i++)
	{
		State.Players.push(
		{
			Name: playerNames[i],
			CulturePoints: 0,
			CultureInc: 0,
			SciencePoints: 0,
			ScienceInc: 0,
			ArmyPoints: 0,
			BluePool: 5,
			Resources: [13, 0, 0, 0],
			ResourcesInc: [0, 0, 0, 0],
			ResourcesBuildings: [0, 0, 0, 0],
			ResourcesFactor: [1, 2, 3, 5],
			Food: [0, 0, 0, 0],
			FoodInc: [0, 0, 0, 0],
			FoodBuildings: [0, 0, 0, 0],
			FoodFactor: [1, 2, 3, 5],
			YellowPool: 18,					// people waiting to become workers
			WorkersAvailable: 7,			// workers waiting for work
			WorkerSupport: [1, 2, 3, 4],	// support is food for workers
			CivilPool: 4,
			CivilActions: 4,
			MilitaryPool: 2,
			MilitaryActions: 2,
			Satisfaction: 0,
			Buildings: {},					// all buildings of this player
			ActivatedCards: [],
			CardHand: []
		});
		DisplayList.push(new Player(i));

		State.StartPlayer = State.Players[0];
		State.ActivePlayer = State.Players[i];
		
		// prepare game board per player
		$.each(filterMatchingCards({StartSet: true}, Cards), function(i, card)
		{
			activateCard(card);
		});
	};
	State.StartPlayer = State.Players[0];
	State.ActivePlayer = State.Players[0];
	State.Mode = mode;
	State.Round = 1;					// round counter. Game starts with round 1.
	State.Phase = UpdateCardRow;
	
	var playerCount = State.Players.length;
	
	var match = 
	{
		CardType: Card.Type.Civil,
		GameMode: State.Mode,
		PlayerCount: playerCount,
		Age: State.Age
	}
	
	// fill card stacks
	State.CivilCardStack = filterMatchingCards(match, Cards);
	$('#logger').append(JSON.stringify(State.CivilCardStack));
	
	match.CardType = Card.Type.Military;
	State.MilitaryCardStack = filterMatchingCards(match, Cards);
	$('#logger').append(JSON.stringify(State.MilitaryCardStack));

	log('initializing finished.');
	displayAll();
}

/* encapsules all stuff regarding player rendering, e.g. points, card hand, buildings, etc. */
function Player(index)
{
	this.Output = $('#templates .player').clone().appendTo('#currentstate');
	
	this.render = function()
	{
		this.Output.find('.name .value').text(State.Players[index].Name);
		this.Output.find('.culturepoints .value').text(State.Players[index].CulturePoints);
		this.Output.find('.cultureinc .value').text(State.Players[index].CultureInc);
		this.Output.find('.sciencepoints .value').text(State.Players[index].SciencePoints);
		this.Output.find('.scienceinc .value').text(State.Players[index].ScienceInc);
		this.Output.find('.armypoints .value').text(State.Players[index].ArmyPoints);
		this.Output.find('.bluepool .value').text(State.Players[index].BluePool);
		this.Output.find('.resources .value').text(State.Players[index].Resources[0] + ' / ' + State.Players[index].Resources[1] + ' / ' + State.Players[index].Resources[2] + ' / ' + State.Players[index].Resources[3]);
		this.Output.find('.food .value').text(State.Players[index].Food[0] + ' / ' + State.Players[index].Food[1] + ' / ' + State.Players[index].Food[2]+ ' / ' + State.Players[index].Food[3]);
		this.Output.find('.yellowpool .value').text(State.Players[index].YellowPool);
		this.Output.find('.workersavailable .value').text(State.Players[index].WorkersAvailable);
		this.Output.find('.civilactions .value').text(State.Players[index].CivilActions + '/' + State.Players[index].CivilPool);
		this.Output.find('.militaryactions .value').text(State.Players[index].MilitaryActions + '/' + State.Players[index].MilitaryPool);
		this.Output.find('.satisfaction .value').text(State.Players[index].Satisfaction);
		
		var text = '';
		$.each(State.Players[index].Buildings, function(index, count)
		{
			if (text.length > 0)
			{
				text += ', ';
			}
			text += Cards[index].Title + ": " + count + "x";
		});
		this.Output.find('.buildings .value').text(text);
	}

	log("Created player " + name);
}

/* returns a set of matching cards */
function filterMatchingCards(match, cards)
{
	var MatchingCards = [];
	
	// search through all given cards
	$.each(cards, function(key, aCard)
	{
		var matching = true;
		// ...and check all given properties
		$.each(match, function(criteria, value)
		{
			if (criteria in aCard)
			{
				// ...and compare with given value
				if (value != aCard[criteria])
				{
					matching = false;
				}
			}
			else
			{
				// no match if wanted property is missing
				matching = false;
			}
		});

		if (matching)
		{
			MatchingCards.push(aCard);
		}
	});
	
	return MatchingCards;
}

/* one or many cards shown to the player. radom access. */
function printCardRow()
{
}

function shuffle(cards)
{
}

function removeCardsFromRow()
{
}

function fillCardRow()
{
}

function onAgeChanged()
{
}

function beginPhase1()
{
	State.Phase = UpdateCardRow;
	
	/* remove cards 1-3 (depends on player count) */
	removeCardsFromRow();
	
	/* fill card row until max cards */
	fillCardRow();
	
	/* special behavior for game start: */
	if (State.Round == 2)
	{
		/* if this is the second round, remove the A-cards and start right away with age I */
		State.CardStack = shuffle(filterMatchingCards({ Age: Game.Age.I }, Cards));
		
		State.Age = Game.Age.I;
		
		onAgeChanged();
	}
	else if (count(State.CardStack) == 0)
	{
		/* in all other cases step to next age if no more cards left on stack */
		switch (State.Age)
		{
			case Game.Age.I:
			  	State.Age = Game.Age.II;
				break;
			case Game.Age.II:
			  	State.Age = Game.Age.III;
				break;
			case Game.Age.III:
			  	State.Age = Game.Age.IV;
				break;
		}  	
		onAgeChanged();
	}
	
	/* fill card row until max cards */
	fillCardRow();
	
	/* now goto phase 2 */
	beginPhase2();
}


function beginPhase2()
{
	State.Phase = CiMiActions;
	
	/* enable user actions for player */
	State.ActivePlayer = State.StartPlayer;
	
	printActionsForCurrentPlayer();
}	

function printActionsForCurrentPlayer()
{
}

/*	
  � Zivilaktion 1: Bev�lkerung erh�hen
  � Zivilaktion 2: Eine Mine oder Farm bauen
  � Zivilaktion 3: Ein St�dtisches Geb�ude bauen
  � Zivilaktion 4: Ein St�dtisches Geb�ude, eine Farm oder eine Mine zerst�ren
  � Zivilaktion 5: Einen Teil eines Wunders bauen
  � Zivilaktion 6: Einen Anf�hrer ins Spiel bringen
  � Zivilaktion 7: Eine Aktionskarte spielen
  � Zivilaktion 8: Eine Zivilkarte von der Kartenreihe nehmen
  � Zivilaktion 9: Eine neue Technologie entdecken und ins Spiel bringen (*)
  � Zivilaktion 10: Eine Mine, Farm oder ein Geb�ude verbessern (*)
  M�gliche Milit�raktionen:
  � Milit�raktion 1: Eine Milit�rische Einheit aufstellen
  � Milit�raktion 2: Eine Milit�rische Einheit aufl �sen
  � Milit�raktion 3: Eine Milit�rische Einheit verbessern (*)
*/


function beginPhase3()
{
}
