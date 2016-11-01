var localDataSource = null;

function initEditor()
{
	localDataSource = new kendo.data.DataSource({ data: Cards });
	
	$("#listView").kendoListView(
	{
		dataSource: localDataSource,
		selectable: true,
		change: onChange,
		template: kendo.template($("#card-view").html())
    });
	
	$("#details").kendoWindow(
	{
		width: "720px",
		title: "Karteneigenschaften",
		close: onClose,
		open: onLoadDetails,
		visible: false,
		modal: true
	});

	$("#cardtype").kendoDropDownList(
	{
		dataSource: $.map(Card.Type, function (value, key)
		{ 
			if (value != Card.Type.All)
			{
				return value;
			}
			else
			{
				return null;
			}
		}),
		index: 0,
		change: onFilterChanged
	});

	$("#cardcategory").kendoDropDownList(
	{
		dataSource: $.map(Card.Category, function (value, key)
		{ 
			if (value != Card.Category.All)
			{
				return value;
			}
			else
			{
				return null;
			}
		})
	});
		
	$("#cardage").kendoDropDownList(
	{
		dataSource: $.map(Game.Age, function (value, key) 
		{ 
			if (value != Game.Age.All)
			{
				return value;
			}
			else
			{
				return null;
			}
		})
	});
	
	//$("#cardtitle").
	
	$("#cardtext").kendoEditor(
	{
		stylesheets: 
		[
			"css/editor.css",
			"css/textfield.css"
		],
		tools: 
		[
			{
				name: "bluetool",
				tooltip: "Blauen Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<hr class='icon k-bluetool' />" });
				}
			},
			{
				name: "yellowtool",
				tooltip: "Gelben Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-yellowtool' />" });
				}
			},
			{
				name: "redtool",
				tooltip: "Roten Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-redtool' />" });
				}
			},
			{
				name: "whitetool",
				tooltip: "Weissen Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-whitetool' />" });
				}
			},
			{
				name: "armytool",
				tooltip: "Weissen Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-armytool' />" });
				}
			},
			{
				name: "satisfactiontool",
				tooltip: "Zufriedenheit-Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-satisfactiontool' />" });
				}
			},
			{
				name: "culturetool",
				tooltip: "Kultur-Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-culturetool' />" });
				}
			},
			{
				name: "sciencetool",
				tooltip: "Wissenschaft-Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-sciencetool' />" });
				}
			},
			{
				name: "foodtool",
				tooltip: "Nahrung-Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-foodtool' />" });
				}
			},
			{
				name: "resourcetool",
				tooltip: "Rohstoff-Stein einfügen",
				exec: function(e) 
				{
					var editor = $(this).data("kendoEditor");
					editor.exec("inserthtml", { value: "<img class='icon k-resourcetool' />" });
				}
			}
		]
	});
	
	$("#cardlevel").kendoDropDownList({dataSource: [1, 2, 3, 4, 5]});
	
	$("#cardgamemode").kendoDropDownList(
	{
		dataSource: $.map(Game.Mode, function (value, key) { return value; })
	});
	
	$("#cardplayercount").kendoDropDownList({dataSource: [2, 3, 4]});
	
	$("#cardstartset").kendoDropDownList({dataSource: ['Nein', 'Ja']});
	
	$('#savedetails').bind('click', onSaveDetails);

	$('#create').bind('click', onCreateCard);
	
	// create DropDownList from input HTML element
	$("#typefilter").kendoDropDownList({
		dataSource: $.map(Card.Type, function (value, key) { return value; }),
		index: 0,
		change: onFilterChanged
	});
	$("#agefilter").kendoDropDownList({
		dataSource: $.map(Game.Age, function (value, key) { return value; }),
		index: 0,
		change: onFilterChanged
	});
	$("#categoryfilter").kendoDropDownList({
		dataSource: $.map(Card.Category, function (value, key) { return value; }),
		index: 0,
		change: onFilterChanged
	});
	$("#titlefilter").bind('input', onFilterChanged);
}

function onSaveDetails()
{
	// close window
	$('#details').data('kendoWindow').close();

	// 1. get selected data
	var selected = Cards[($("#listView").data('kendoListView').select().index())];
	
	// 2. write values to selected element
	selected['Type'] = $("#cardtype").data("kendoDropDownList").value();
	selected['Category'] = $("#cardcategory").data("kendoDropDownList").value();
	selected['Age'] = $("#cardage").data("kendoDropDownList").value();
	selected['Title'] = $("#cardtitle").val();
	selected['Text'] = $("#cardtext").data("kendoEditor").value();
	selected['Level'] = $("#cardlevel").data("kendoDropDownList").value();
	selected['GameMode'] = $("#cardgamemode").data("kendoDropDownList").value();
	selected['PlayerCount'] = $("#cardplayercount").data("kendoDropDownList").value();
	selected['StartSet'] = ($("#cardstartset").data("kendoDropDownList").value() == 'Ja') ? true : false;
	
	localDataSource.read();
}

function onLoadDetails()
{
	// 1. get selected data
	var selected = localDataSource.at($("#listView").data('kendoListView').select().index());
	
	// 2. prepare default values
	var type = $("#typefilter").data("kendoDropDownList").value();
	type = (type == Card.Type.All) ? Card.Type.Civil : type;
	var category = $("#categoryfilter").data("kendoDropDownList").value();
	category = (category == Card.Category.All) ? Card.Category.Action : category;
	var age = $("#agefilter").data("kendoDropDownList").value();
	age = (age == Game.Age.All) ? Game.Age.A : age;
	var title = 'Neue Karte';
	var text = '';
	var level = 1;
	var gamemode = Game.Mode.Beginner;
	var startset = false;
	var playercount = 2;
	
	// 3. load values from data (if exist)
	type = ('Type' in selected) ? selected.Type : type;
	category = ('Category' in selected) ? selected.Category : category;
	age = ('Age' in selected) ? selected.Age : age;
	title = ('Title' in selected) ? selected.Title : title;
	text = ('Text' in selected) ? selected.Text : text;
	level = ('Level' in selected) ? selected.Level : level;
	gamemode = ('GameMode' in selected) ? selected.GameMode : gamemode;
	startset = (('StartSet' in selected) ? selected.StartSet : startset) ? 'Ja' : 'Nein';
	playercount = ('PlayerCount' in selected) ? selected.PlayerCount : playercount;
	
	// 4. set data to view
	$("#cardtype").data("kendoDropDownList").value(type);
	$("#cardcategory").data("kendoDropDownList").value(category);
	$("#cardage").data("kendoDropDownList").value(age);
	$("#cardtitle").val(title);
	$("#cardtext").data("kendoEditor").value(text);
	$("#cardlevel").data("kendoDropDownList").value(level);
	$("#cardgamemode").data("kendoDropDownList").value(gamemode);
	$("#cardplayercount").data("kendoDropDownList").value(playercount);
	$("#cardstartset").data("kendoDropDownList").value(startset);
	curActions = selected;
}

function onFilterChanged()
{
	var filter =
	{
		logic: "and",
		filters: []
	}

	var type = $("#typefilter").data("kendoDropDownList").value();
	if (type != Card.Type.All)
	{
		filter.filters.push({ field: "Type", operator: "eq", value: type });
	}
	
	var age = $("#agefilter").data("kendoDropDownList").value();
	if (age != Game.Age.All)
	{
		filter.filters.push({ field: "Age", operator: "eq", value: age });
	}
	
	var category = $("#categoryfilter").data("kendoDropDownList").value();
	if (category != Card.Category.All)
	{
		filter.filters.push({ field: "Category", operator: "eq", value: category });
	}
	
	var title = $('#titlefilter').val();
	if (title.length > 0)
	{
		filter.filters.push({ field: "Title", operator: "contains", value: title });
	}
	
	console.log("filter: " + type + ", " + age + ", " + category + ", '" + title + "'");
	
	localDataSource.filter(filter);
}

function onChange() 
{
	$('#details').data('kendoWindow').center();
	$('#details').data('kendoWindow').open();
	updateDisplay();
}

function onClose() 
{
}

function onCreateCard()
{
	var type = $("#typefilter").data("kendoDropDownList").value();
	var category = $("#categoryfilter").data("kendoDropDownList").value();
	var age = $("#agefilter").data("kendoDropDownList").value();
	var title = $("#titlefilter").val();
	
	type = (type == Card.Type.All) ? Card.Type.Civil : type;
	category = (category == Card.Category.All) ? Card.Category.Action : category;
	age = (age == Game.Age.All) ? Game.Age.A : age;
	title = (title.length > 0) ? "Neue Karte " + title : "Neue Karte";
	
	Cards.push({Type: type, Category: category, Age: age, Title: title});
	
	localDataSource.read();
	
	$("#listView").data('kendoListView').select(Cards.length - 1);
	
	onChange();
}
