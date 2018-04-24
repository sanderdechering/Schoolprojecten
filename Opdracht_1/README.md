# CMTTHE04 Week1 oefening 1

Werken met loops, semantische elementen

### OPDRACHT

Lees het **HTML en CSS voor Games** gedeelte uit de Quickstart

- Verwijder de fish en bubble uit de html file
- Bekijk het bestand `main.js`. Verwijder de `document.getElementBy...` regels - het element staat immers niet meer in de DOM.
- Voeg in `main.js` een vis en een bubble toe aan de DOM. Gebruik hierbij:
```
let element = document.createElement(...)
document.body.appendChild(element)
```

### OPDRACHT

In `main.js` vind je code om de vis en bubble een kleur en plek te geven. 

- Zet de vis op een willekeurige x en y positie over het hele scherm
- Geef de vis een willekeurige kleur tussen 0 en 360
- Zet de bubble op een willekeurige x positie over de breedte van het scherm
- Zorg dat de vis en bubble wel altijd binnen beeld blijven

```
let screenSize = window.innerWidth
let randomNumber = Math.random() * 100
```

### OPDRACHT

- Maak een for loop die 100 visjes en bubbles toevoegt. 
- Ze moeten allemaal een eigen plek en kleur krijgen.

### OPDRACHT

Lees de [documentatie van setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
- Gebruik nu setTimeout om steeds met een tussenpauze nieuwe visjes en bubbles te plaatsen. 
- Lukt het je om te stoppen als er 100 visjes zijn?

```
setTimeout(functie, tijd)
```

### OPDRACHT

- Voeg een click event listener toe aan elk visje. 
- Als geklikt wordt geef je de geklikte vis een nieuwe class die een andere achtergrond heeft 
```
element.addEventListener("click", clickHandler)
element.classList.add("deadfish")
```
