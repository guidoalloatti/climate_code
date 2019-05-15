var growers = [
	{
		name: "Farmer 1",
		farmsOwned: "2",
		farms: [
			{
				plantingEvents: [
					{
						date: "07/07/2019",
						cropType: "corn"
					},
					{
						date: "12/12/2019",
						cropType: "soybeans"
					}
				]
			},
			{
				plantingEvents: [
					{
						date: "06/06/2017",
						cropType: "corn"
					},
					{
						date: "10/10/2018",
						cropType: "soybeans"
					}
				]
			}
		]
	},
	{
		name: "Farmer 2",
		farmsOwned: "1",
		farms: [
			{
				plantingEvents: [
					{
						date: "08/08/2019",
						cropType: "corn"
					},
					{
						date: "12/12/2018",
						cropType: "soybeans"
					}
				]
			}
		]
	},
	{
		name: "Farmer 3",
		farmsOwned: "3",
		farms: [
			{
				plantingEvents: [
					{
						date: "09/09/2017",
						cropType: "corn"
					},
					{
						date: "12/10/2017",
						cropType: "soybeans"
					}
				]
			},
			{
				plantingEvents: [
					{
						date: "09/06/2019",
						cropType: "corn"
					},
					{
						date: "12/10/2018",
						cropType: "soybeans"
					}
				]
			},
			{
				plantingEvents: [
					{
						date: "06/07/2017",
						cropType: "corn"
					},
					{
						date: "11/10/2019",
						cropType: "soybeans"
					}
				]
			}
		]
	}
]
var growersList = [];
var growersDetails = [];
var testsResults = [];

function getGrowerNamesThisYear(plantation) {
	growersList = [];
	growersDetails = [];
	var thisYear = new Date().getFullYear();
	var i;
	var j;
	var h;

	for (i = 0; i < growers.length; i++) {
	  var grower = growers[i];
	  for (j = 0; j < grower.farms.length; j++) {
	  	var farm = grower.farms[j];
	  	for (h = 0; h < farm.plantingEvents.length; h++ ) {
	  		var planting = farm.plantingEvents[h];
	  		var plantingDate = new Date(planting.date);
	  		var plantingYear = plantingDate.getFullYear();
	  		if(thisYear == plantingYear && plantation == planting.cropType) {
	  			growersDetails.push({ grower_name: grower.name, planted: plantation, date: plantingDate});
	  			growersList.push(grower.name);
	  		}
	  	}
	  	h=0;
	  }
	  j=0;
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
		html = html + "<li>" + parseInt(i+1) + "). " + growersList[i] + "</li>";
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
		html = html + "<li>" + parseInt(i+1) + "). " + growers[i].grower_name + " planted " + growers[i].planted + " on " + growers[i].date.toLocaleDateString() + "</li>";
	}

	html = html + "</ul>";
	document.getElementById("grower_names_by_recent_" + plantation).innerHTML = html;
}