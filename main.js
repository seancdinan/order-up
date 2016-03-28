var fridge = document.getElementById('fridge');
fridge.style = 'position: absolute; top: 55px; left: 0.75%; width: 48.7%';
fridge.style.height = 0.487 * window.innerHeight - 25 + 'px';

var freezer = document.getElementById('freezer');
freezer.style = 'position: absolute; bottom: 5px; left: 0.75%; width: 48.7%';
freezer.style.height = 0.487 * window.innerHeight - 25 + 'px';

var cooking = document.getElementById('cooking');
cooking.style = 'position: absolute; top: 55px; right: 0.75%; width: 48.7%';
cooking.style.height = 0.487 * window.innerHeight - 25 + 'px';

var served = document.getElementById('served');
served.style = 'position: absolute; bottom: 5px; right: 0.75%; width: 48.7%';
served.style.height = 0.487 * window.innerHeight - 25	 + 'px';


// Make the dropdowns
var groceries = document.getElementById('groceries');
var guests = document.getElementById('guests');


// Add-ingredient hover event
var fridgeCrossV = document.getElementById('fridgeCrossV');
var fridgeCrossH = document.getElementById('fridgeCrossH');
fridge.addEventListener('mouseover', function(event){
	if (event.target.className == 'stage' || event.target.id == 'fridgeCrossV' || event.target.id == 'fridgeCrossH' || event.target.id == 'fridgeCross'){
		fridgeCrossV.style.backgroundColor = 'hsla(100, 50%, 50%, 1)';
		fridgeCrossH.style.backgroundColor = 'hsla(100, 50%, 50%, 1)';
	}
	if (event.target.className != 'stage' && event.target.id != 'fridgeCrossV' && event.target.id != 'fridgeCrossH' && event.target.id != 'fridgeCross'){
		fridgeCrossV.style.backgroundColor = 'hsla(100, 50%, 50%, 0)';
		fridgeCrossH.style.backgroundColor = 'hsla(100, 50%, 50%, 0)';
	}
})
fridge.addEventListener('mouseout', function(){
	fridgeCrossV.style.backgroundColor = 'hsla(100, 50%, 50%, 0)';
	fridgeCrossH.style.backgroundColor = 'hsla(100, 50%, 50%, 0)';
})

var freezerCrossV = document.getElementById('freezerCrossV');
var freezerCrossH = document.getElementById('freezerCrossH');
freezer.addEventListener('mouseover', function(event){
	if (event.target.className == 'stage' || event.target.id == 'freezerCrossV' || event.target.id == 'freezerCrossH' || event.target.id == 'freezerCross'){
		freezerCrossV.style.backgroundColor = 'hsla(190, 50%, 50%, 1)';
		freezerCrossH.style.backgroundColor = 'hsla(190, 50%, 50%, 1)';
	}
	if (event.target.className != 'stage' && event.target.id != 'freezerCrossV' && event.target.id != 'freezerCrossH' && event.target.id != 'freezerCross'){
		freezerCrossV.style.backgroundColor = 'hsla(190, 50%, 50%, 0)';
		freezerCrossH.style.backgroundColor = 'hsla(190, 50%, 50%, 0)';		
	}
})
freezer.addEventListener('mouseout', function(){
	freezerCrossV.style.backgroundColor = 'hsla(190, 50%, 50%, 0)';
	freezerCrossH.style.backgroundColor = 'hsla(190, 50%, 50%, 0)';
})

// Add-ingredient click event
fridge.addEventListener('click', function(event){
	if (event.target.className == 'stage' || event.target.id == 'fridgeCrossV' || event.target.id == 'fridgeCrossH' || event.target.id == 'fridgeCross'){
		newCard('plate title', 'fridge');
	}
})
freezer.addEventListener('click', function(event){
	if (event.target.className == 'stage' || event.target.id == 'freezerCrossV' || event.target.id == 'freezerCrossH' || event.target.id == 'freezerCross'){
		newCard('plate title', 'freezer');
	}
})
// Create a card object that can be copied.
console.log(userdata);
function newCard(plate, location){
	// placeholders
	var newHeader = 'Fix the Stuff';
	var newContent = 'Its all broked up real bad';

	// add it to the database
	// give each card a unique id with the date/time of creation
	var date = new Date();
	var newId = date.toString().split(' ').join('');
	var newEntry = {id: newId, header: newHeader, body: newContent};
	var index = getPlateIndex(userdata.plates, plate);
	userdata.plates[index][location].push(newEntry);
	console.log(userdata.plates[index][location]);

	// update the current stage
	// THIS SHOULD BE DONE DIFFERENTLY
	// RIGHT NOW ITS A WASTE OF RESOURCES
	// AND THE PLUS SIGN GETS REMOVED ALONG WITH EVERYTHING ELSE
	console.log(fridge.children)
	if (location == 'fridge'){
		while(fridge.firstChild){fridge.removeChild(fridge.firstChild);}
	}
	if (location == 'freezer'){
		while(freezer.firstChild){freezer.removeChild(freezer.firstChild);}
	}
	for (var i in userdata.plates[index][location]){
		var newCard = document.createElement('button');
		newCard.className = 'card';

		var cardHeader = document.createElement('h1');
		cardHeader.innerText = userdata.plates[index][location][i].header;
		var cardBody = document.createElement('p');
		cardBody.innerText = userdata.plates[index][location][i].body;

		newCard.appendChild(cardHeader);
		newCard.appendChild(cardBody);
		// newCard.style = 'height: 200px; width: 200px; background-color: yellow;';
		if (location == 'fridge'){
			fridge.appendChild(newCard);
		}
		if (location == 'freezer'){
			freezer.appendChild(newCard);
		}


	}

}

function getPlateIndex(array, name){
	for (var i in array){
		if (array[i].title == name){
			return i
		}
	}
}