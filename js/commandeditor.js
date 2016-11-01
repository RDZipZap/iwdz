var obs = 
{
	data: null,
	commands:
	[
		{ text: 'Addiere', value: 'add' },
		{ text: 'Verschiebe', value: 'move' },
		{ text: 'Überweise', value: 'transfer' }
	],
	fields: 
	[
		{ text: 'Kulturpunkte', value: 'CulturePoints' },
		{ text: 'Kulturzuwachs', value: 'CultureInc' },
		{ text: 'Wissenschaftspunkte', value: 'SciencePoints' },
		{ text: 'Wissenschaftszuwachs', value: 'ScienceInc' },
		{ text: 'Armeepunkte', value: 'ArmyPoints' },
		{ text: 'Blauer Vorrat', value: 'BluePool' },
		{ text: 'Rohstoffe', value: 'Resources' },
		{ text: 'Rohstoffeinkommen', value: 'ResourcesInc' },
		{ text: 'Rohstoffgebäude', value: 'ResourcesBuildings' },
		{ text: 'Rohstoffwert', value: 'ResourcesFactor' },
		{ text: 'Nahrung', value: 'Food' },
		{ text: 'Nahrungseinkommen', value: 'FoodInc' },
		{ text: 'Nahrungsgebäude', value: 'FoodBuildings' },
		{ text: 'Nahrungswert', value: 'FoodFactor' },
		{ text: 'Gelber Vorrat', value: 'YellowPool' },
		{ text: 'freie Arbeiter', value: 'WorkersAvailable' },
		{ text: 'verfügbare Zivilaktionen', value: 'CivilPool' },
		{ text: 'eingesetzte Zivilaktionen', value: 'CivilActions' },
		{ text: 'verfügbare Militäraktionen', value: 'MilitaryPool' },
		{ text: 'eingesetzte Militäraktionen', value: 'MilitaryActions' },
		{ text: 'Zufriedenheit', value: 'Satisfaction' }
	],
	cardstacks:
	[
		{ text: 'text', value: 'value' },
		{ text: 'text', value: 'value' },
		{ text: 'text', value: 'value' }
	]
};

function initCommandEditor()
{
	$("#commandeditor").kendoWindow(
	{
		width: "400px",
		height: "400px",
		title: "Befehlseigenschaften",
		close: onCloseCommandEditor,
		//open: onLoadDetails,
		visible: false,
		modal: true
	});
	
	$('#savecommanddetails').bind('click', onSaveCommand);
	
	$('#selectcommand').kendoDropDownList(
	{
		dataTextField: "text",
        dataValueField: "value",
		dataSource: obs.commands,
		change: onCommandChanged
	});	
}

function onCloseCommandEditor()
{
	kendo.unbind($('#param-container'));
	onUpdateCommand();
}

function showCommandEditor(command)
{
	obs.data = command;

	$("#commandeditor").data('kendoWindow').center();
	$("#commandeditor").data('kendoWindow').open();
	
	$('#selectcommand').data('kendoDropDownList').value(command.Name);
	onCommandChanged();
}

function onCommandChanged()
{
	kendo.unbind($('#param-container'));

	// insert template matching the selected command
	var command = $("#selectcommand").val();
	var template = kendo.template($('#command-params-' + command).html());
	
	// init controls in template
	$('#param-container').html(template({}));
	
	// bind data to container
	kendo.bind($('#param-container'), kendo.observable(obs));
}

function onSaveCommand()
{
	$("#commandeditor").data('kendoWindow').close();
}

function updateView()
{
/*
	var template = kendo.template($("#action-view").html());

	var actionElement = $(template({ actionname: action }));
		
	actionElement.appendTo(parent);

	var commandlistContainer = actionElement.find('.commandlist');
	
	$.each(commandlist, function(index, command)
	{
		appendCommandRenderer(action, command, index, commandlistContainer);
	});
	appendAddCommand(action, commandlistContainer);
*/
}
