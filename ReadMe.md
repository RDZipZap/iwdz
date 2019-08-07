# Im Wandel der Zeiten:

### Karte:
- Name
- Beschreibung
- Zeitalter (A, I, II, III)
- Für Spieleranzahl
- Aktivierungskosten (damit ich sie auslegen darf)
- Erbauen Farm oder Mine (Rohstoffe, Bewohner)
- Erbauen eines Gebäudes (Rohstoffe, Bewohner)
- Ausheben einer Einheit (Rohstoffe, Bewohner)
- Kosten zur Erbauung eines Wunders (Rohstoffe, gestaffelt in bis zu 5 Schritten)
- Einmalige Boni (Kultur, Forschung, Rostoffe, Nahrung)
- Dauerhafte Boni (Smiley, Kultur, Militär, Forschung)

- Regierungsform
- Anführereigenschaften
- Technologie
- Technologie-Hierarchie (III ersetzt I und II, usw)
- Wunderauswirkungen

- Kampfkraft
- Einheitentyp
- Taktiken
- Auseinandersetzung
- Krieg
- Bonuskarte
- Ereignis
- Kolonisation


### Kartenstapel (CardStack):
- enthält Liste von Karten
- kann mischen
- liefert immer nur oberste Karte

### Kartenreihe (CardArray):
- enthält Liste von Karten
- wahlfreier Zugriff auf Karten 
- Einsatz: Handkarten oder offen liegende Karte auf dem Spielbrett

### Platzhalter:
- hier können Karten bestimmten Typs abgelegt werden
- Einsatz: Hier kann der Spieler seine Handkarten spielen

### Zähler:
- kann erhöht und vermindert werden
- Einsatz: alle Spielwerte können hier mitgeführt werden (Forschung, Forschungsrate, Kulturpunkte, usw.)

### Pool:
- hat eine feste Menge von Einzelteilen, die entnommen werden können. Der Pool kann erschöpfen.

### Diskreter Umsetzer:
- setzt Zahlenbereiche in Werte um, z.B. liefert für 1-8 einer 1, für 9-14 eine 2 und für 15-10000 eine 3.


### Idee für die technische Umsetzung:
Alles wird in Kleinstaufgaben unterteilt. Eine Karte, die dem Spieler bei der Ausführung z.B. 3 Kulturpunkte bringt und 2 Wissenschaftspunkte, wird aus zwei Einzelaufgaben zusammengestellt.

Das Spiel selbst läuft in einem fest konfigurierten Schema ab, wobei nicht alle Stufen aktiv sein müssen. Einzelaufgaben können sich auf bestimmte Spieler beziehen, aber auch für spätere Stufen oder Runden eingereiht werden können. (Queues mit diversen Auslösern, wie z.B. nächste Runde, Ernten, Krieg, ...)

**Spielablauf (3 Phasen, pro Spieler):**
1. Kartenreihe aktualisieren
  Karte 1-3 entfernen (abhängig von Spieleranzahl)
  Kartenreihe auffüllen
  Wenn Runde 2, dann A-Kartenstapel durch I-Kartenstapel ersetzen (nach Startspieler sofort tauschen)
  Wenn Kartenstapel I, II oder III leer, dann Zeitalter beenden. Danach nächsten Zeitalter beginnen und Karten auffüllen, soweit möglich.
2. Verwenden der Zivil- und Militäraktionen
  Mögliche Zivilaktionen:
  – Zivilaktion 1: Bevölkerung erhöhen
  – Zivilaktion 2: Eine Mine oder Farm bauen
  – Zivilaktion 3: Ein Städtisches Gebäude bauen
  – Zivilaktion 4: Ein Städtisches Gebäude, eine Farm oder eine Mine zerstören
  – Zivilaktion 5: Einen Teil eines Wunders bauen
  – Zivilaktion 6: Einen Anführer ins Spiel bringen
  – Zivilaktion 7: Eine Aktionskarte spielen
  – Zivilaktion 8: Eine Zivilkarte von der Kartenreihe nehmen
  – Zivilaktion 9: Eine neue Technologie entdecken und ins Spiel bringen (*)
  – Zivilaktion 10: Eine Mine, Farm oder ein Gebäude verbessern (*)
  Mögliche Militäraktionen:
  – Militäraktion 1: Eine Militärische Einheit aufstellen
  – Militäraktion 2: Eine Militärische Einheit aufl ösen
  – Militäraktion 3: Eine Militärische Einheit verbessern (*)
3. Produktion und Versorgung durchführen
  Zuwachs von Wissenschaftspunkten und Kulturpunkten zählen
  Nahrung produzieren und Verbrauch abgeben
  Rohstoffe produzieren und Korruption abgeben
  Militärkarten für nichtverbrauchte Militäraktionen ziehen.
