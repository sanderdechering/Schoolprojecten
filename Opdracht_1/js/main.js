// Pakt de breedte en hoogte van de browser
let screenWidth = window.innerWidth
let screenHeight = window.innerHeight


window.setTimeout( function(){for (fish = 0; fish < 100; fish++){
	let fishElement = document.createElement("fish")

	// Pak breedte en hoogte van de vis. Hoogte is groter dan de vis zelf omdat de vis op en neer beweegt
	let fishWidth = 130
	let fishHeight = 180

	// Fish color
	colorCode = Math.floor(Math.random() * 360) + 1
	fishElement.style.webkitFilter = "hue-rotate(" + colorCode + "deg)"
	fishElement.style.filter = "hue-rotate(" + colorCode + "deg)"

	// X en Y berekening
	// We halen fishWidth en Height van screenWidth en height af om te voorkomen dat de vis uit het scherm spawned
	// ToFixed rond het getal af
	let fishX = (Math.random() * (screenWidth - fishWidth)).toFixed()
	let fishY = (Math.random() * (screenHeight - fishHeight)).toFixed()

	// Fish de X en Y positie geven
	fishElement.style.left = fishX + "px"
	fishElement.style.top = fishY + "px"

	// Fish aan body toevoegen
	document.body.appendChild(fishElement)
}},2000)

for (bubble = 0; bubble < 1; bubble++){
	let bubbleElement = document.createElement("bubble")
	let bubbleWidth = 55
	let bubbleX = (Math.random() * (screenWidth - bubbleWidth)).toFixed()

	bubbleElement.style.left = bubbleX + "px"

	document.body.appendChild(bubbleElement)
}	


// roep een functie aan als alles geladen is
window.addEventListener("load", function () {
    console.log("start het aquarium")
})
