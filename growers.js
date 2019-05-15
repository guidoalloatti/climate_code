var growersList = [];
var growersDetails = [];

function getGrowerNamesThisYear(plantation) {
	growersList = [];
	growersDetails = [];
	var thisYear = new Date().getFullYear();

	for (var i = 0; i < growers.length; i++) {
	  var grower = growers[i];
	  for (var j = 0; j < grower.farms.length; j++) {
	  	var farm = grower.farms[j];
	  	for (var h = 0; h < farm.plantingEvents.length; h++ ) {
	  		var planting = farm.plantingEvents[h];
	  		var plantingDate = new Date(planting.date);
	  		var plantingYear = plantingDate.getFullYear();
	  		if(thisYear == plantingYear && plantation == planting.cropType) {
	  			growersDetails.push({ grower_name: grower.name, planted: plantation, date: plantingDate});
	  			growersList.push(grower.name);
	  		}
	  	}
	  }
	}
}

function sortGrowersByRecentPlantation() {
	return growersDetails.sort(function(a, b){ return a.date.getTime() - b.date.getTime() }).reverse();
}

function showGrowersJSON() {
	document.getElementById("growers_json").innerHTML = JSON.stringify(growers);
}

function showGrowerNamesByPlantation(plantation) {
	getGrowerNamesThisYear(plantation);
	var i;
	var html = "<ul>";
	for (i = 0; i < growersList.length; i++)	{
		html = html + "<li>" + growersList[i] + "</li>";
	}
	html = html + "</ul>";
	document.getElementById("grower_names_" + plantation).innerHTML = html;
}

function showGrowerNamesByPlantationRecentFirst(plantation) {
	getGrowerNamesThisYear(plantation);
	var growers = sortGrowersByRecentPlantation();
	var i;
	var html = "<ul>";
	for (i = 0; i < growers.length; i++)	{
		html = html + "<li>" + growers[i].grower_name + " planted " + growers[i].planted + " on " + growers[i].date.toLocaleDateString() + "</li>";
	}
	html = html + "</ul>";
	document.getElementById("grower_names_by_recent_" + plantation).innerHTML = html;
}