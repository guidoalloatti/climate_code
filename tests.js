var testsResults = [];

function runTests() {
	testsResults = [];
	eval_test(testShowGrowerNamesByPlantation("corn"), "Testing that the corn growers list matches");
	eval_test(testShowGrowerNamesByPlantation("soybeans"), "Testing that the soybeans growers list matches");
	
	eval_test(testShowGrowerNamesByPlantationByRecent("corn"), "Testing that the corn growers list matches sorted by recent");
	eval_test(testShowGrowerNamesByPlantationByRecent("soybeans"), "Testing that the corn growers list matches sorted by recent");

	printTestResults();
}

function printTestResults() {
	var html = "<ul>";
	for(var i = 0; i < testsResults.length; i++) {
		html = html + "<li>" + testsResults[i].description + " -> " + (testsResults[i].result ? "pass" : "failed");
	}
	html = html + "</ul>"
	document.getElementById("tests").innerHTML = html;
}

function eval_test(result, testCase) {
	testsResults.push({ description: testCase, result: result});
}

function assertArrayEquals(expected, actual) {
	return (JSON.stringify(expected) === JSON.stringify(actual))
}

function testShowGrowerNamesByPlantation(plantation) {
	var expected = { 
		corn: ["Farmer 1", "Farmer 2", "Farmer 3"],
		soybeans: ["Farmer 1", "Farmer 3"] 
	}

	getGrowerNamesThisYear(plantation);
	return assertArrayEquals(expected[plantation], growersList);
}

function testShowGrowerNamesByPlantationByRecent(plantation) {
	var expected = { 
		corn: [{"grower_name":"Farmer 3","planted":"corn","date":"2019-09-06T03:00:00.000Z"},{"grower_name":"Farmer 2","planted":"corn","date":"2019-08-08T03:00:00.000Z"},{"grower_name":"Farmer 1","planted":"corn","date":"2019-07-07T03:00:00.000Z"}],
		soybeans: [{"grower_name":"Farmer 1","planted":"soybeans","date":"2019-12-12T03:00:00.000Z"},{"grower_name":"Farmer 3","planted":"soybeans","date":"2019-11-10T03:00:00.000Z"}]
	}

	getGrowerNamesThisYear(plantation);
	var sortedGrowers = sortGrowersByRecentPlantation();
	return assertArrayEquals(expected[plantation], sortedGrowers);
}