Cards = 
[
	{
		Type: Card.Type.Civil,
		Category: Card.Category.Farm,
		GameMode: Game.Mode.Beginner,
		Title: 'Feldarbeit',
		Text: '',
		Level: 0,
		PlayerCount: 2,
		Age: Game.Age.A,
		StartSet: true,
		Activation:
		[
			{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'FoodInc'},
			{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'FoodInc'}
		],
		Construction:
		[
			{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'FoodInc'}
		],
		Destruction:
		[
			{Name: 'add', Amount: 1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: -1, Target: 'FoodInc'}
		]
	},
	{
		Type: Card.Type.Civil,
		Category: Card.Category.Mine,
		GameMode: Game.Mode.Beginner,
		Title: 'Bronze',
		Text: '',
		Level: 0,
		PlayerCount: 2,
		Age: Game.Age.A,
		StartSet: true,
		Activation:
		[
			{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'ResourcesInc'},
			{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'ResourcesInc'}
		],
		Construction:
		[
			{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: -1, Target: 'ResourcesInc'}
		],
		Destruction:
		[
			{Name: 'add', Amount: 1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: -1, Target: 'ResourcesInc'}
		]
	},
	{
		Type: Card.Type.Civil,
		Category: Card.Category.Temple,
		GameMode: Game.Mode.Beginner,
		Title: 'Religion',
		Text: '',
		Level: 0,
		PlayerCount: 2,
		Age: Game.Age.A,
		StartSet: true,
		Activation:
		[
		],
		Construction:
		[
			{Name: 'move', Amount: 3, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'Satisfaction'},
			{Name: 'add', Amount: 1, Target: 'CultureInc'}
		],
		Destruction:
		[
			{Name: 'move', Amount: 3, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: 1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: -1, Target: 'Satisfaction'},
			{Name: 'add', Amount: -1, Target: 'CultureInc'}
		]
	},
	{
		Type: Card.Type.Civil,
		Category: Card.Category.Laboratory,
		GameMode: Game.Mode.Beginner,
		Title: 'Philosophie',
		Text: '',
		Level: 0,
		PlayerCount: 2,
		Age: Game.Age.A,
		StartSet: true,
		Activation:
		[
			{Name: 'move', Amount: 3, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'ScienceInc'}
		],
		Construction:
		[
			{Name: 'move', Amount: 3, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'ScienceInc'}
		],
		Destruction:
		[
			{Name: 'move', Amount: 3, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: 1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: -1, Target: 'ScienceInc'}
		]
	},
	{
		Type: Card.Type.Military,
		Category: Card.Category.Infantry,
		GameMode: Game.Mode.Beginner,
		Title: 'Krieger',
		Text: '',
		Level: 0,
		PlayerCount: 2,
		Age: Game.Age.A,
		StartSet: true,
		Activation:
		[
			{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'ArmyPoints'}
		],
		Construction:
		[
			{Name: 'move', Amount: 2, Source: 'Resources', Target: 'BluePool'},
			{Name: 'add', Amount: -1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: 1, Target: 'ArmyPoints'}
		],
		Destruction:
		[
			{Name: 'add', Amount: 1, Target: 'WorkersAvailable'},
			{Name: 'add', Amount: -1, Target: 'ArmyPoints'}
		]
	},
	{
		Type: Card.Type.Civil,
		Category: Card.Category.Laboratory,
		GameMode: Game.Mode.Beginner,
		Title: 'Dummy 1',
		PlayerCount: 2,
		Age: Game.Age.I
	},
	{
		Type: Card.Type.Military,
		Category: Card.Category.Laboratory,
		GameMode: Game.Mode.Beginner,
		Title: 'Dummy 2',
		PlayerCount: 2,
		Age: Game.Age.A
	},
	{
		Type: Card.Type.Civil,
		Category: Card.Category.Laboratory,
		GameMode: Game.Mode.Beginner,
		Title: 'Dummy 3',
		PlayerCount: 2,
		Age: Game.Age.A
	}
];
