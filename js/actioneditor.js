var curActions = 
{
	Activation:
	[
		{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
		{Name: 'move', Source: 'WorkersAvailable'},
		{Name: 'add', Target: 'FoodInc'},
		{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
		{Name: 'move', Source: 'WorkersAvailable'},
		{Name: 'add', Target: 'FoodInc'}
	],
	Construct:
	[
		{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
		{Name: 'move', Source: 'WorkersAvailable'},
		{Name: 'add', Target: 'FoodInc'}
	],
	Destruct:
	[
		{Name: 'move', Target: 'WorkersAvailable'},
		{Name: 'add', Amount: -1, Target: 'FoodInc'}
	]
}

function enumToDropDownList(e)
{
	var output = [];
	$.each(e, function(key, value)
	{
		output.push({'text': value, 'value':key});
	});
	
	return output;
}

function initActionEditor()
{
	$('#selectaction').kendoDropDownList(
	{ 
		dataTextField: "text",
        dataValueField: "value",
        dataSource: enumToDropDownList(Game.Action)
	});
	
	$('#addaction').bind('click', onAddAction);
}

function onAddAction()
{
	var action = $('#selectaction').val();
	if (!(action in curActions))
	{
		curActions[action] = [];
	}
	updateDisplay();
}

function onAddCommand(action)
{
	if (action in curActions)
	{
		curActions[action].push({Name: 'add', Amount: 1, Target: 'FoodInc'});
	}
	updateDisplay();
}

function onEditCommand(action, index)
{
	if (action in curActions)
	{
		if (curActions[action].length > index)
		{
			showCommandEditor(curActions[action][index]);
		}
	}	
}

function onUpdateCommand()
{
	updateDisplay();
}

function onDeleteCommand(action, index)
{
	if (action in curActions)
	{
		if (curActions[action].length > index)
		{
			curActions[action].splice(index, 1);

			updateDisplay();
		}
	}
}

function onDeleteAction(action)
{
	if (action in curActions)
	{
		delete curActions[action];

		updateDisplay();
	}
}

function updateDisplay()
{
	$('#actions').empty();
	$.each(curActions, function(action, commandlist)
	{
		if ((action in Game.Action) && (action != 'constructor'))
		{
			appendActionRenderer(action, commandlist, $('#actions'));
		}
	});
}

function appendActionRenderer(action, commandlist, parent)
{
	var template = kendo.template($("#action-view").html());

	var actionElement = $(template({ actionname: action }));
		
	actionElement.appendTo(parent);

	var commandlistContainer = actionElement.find('.commandlist');
	
	$.each(commandlist, function(index, command)
	{
		appendCommandRenderer(action, command, index, commandlistContainer);
	});
	appendAddCommand(action, commandlistContainer);
}

function appendCommandRenderer(action, command, index, parent)
{
	var template = kendo.template($("#command-view").html());
	var display = kendo.template($("#display-params-" + command.Name).html());

	var commandElement = $(template(
	{ 
		HumanReadable: display(command),
		actionname: action,
		index: index
	}));
		
	commandElement.appendTo(parent);
}

function appendAddCommand(name, parent)
{
	var template = kendo.template($("#command-add").html());

	var commandElement = $(template(
	{ 
		actionname: name
	}));
		
	commandElement.appendTo(parent);
}

