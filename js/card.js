/* base class for all crads in the game */
function Card()
{
}

Card.Type = 
{
	All: "Alle",
	Civil: "Zivilkarte",
	Military: "Militärkarte"
}

Card.Category =
{
	All: "Alle",
	Aggression: 'Aggression',
	Action: 'Aktion', 				// yellow civil cards
	Leader: 'Anführer',				// green leader cards
	Arena: "Arena",
	Artillery: 'Artillerie',
	Bonus: 'Bonus',
	Event: 'Ereignis',
	Farm: "Farm",
	Laboratory: "Labor",
	Airstrike: 'Luftangriff',
	Mine: "Miene",
	Infantry: 'Infantrie',
	Cavallery: 'Kavallerie',
	War: 'Krieg',
	CommonBuilding: "Öffentliches Gebäude",	// brown building cards
	Pact: 'Pakt',
	Government: 'Regierung',		// orange government cards
	Special: 'Spezial',
	Tactic: 'Taktik',
	Temple: "Tempel",
	Territory: 'Territorium',
	Theater: "Theater",
	Wonder: 'Wunder'				// purple wonder cards
}
