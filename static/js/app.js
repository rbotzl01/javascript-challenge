// from data.js
let tableData = data;

// Creating References
var $tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputFieldDate = d3.select("#datetime");
var inputFieldCity = d3.select("#city");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

//Define addData as function to append table rows of sighting data that meet search criteria
let addData = (dataInput) => {
	dataInput.forEach(ufoSightings => {
		let row = $tbody.append("tr");
		columns.forEach(column => row.append("td").text(ufoSightings[column]))
	});
}

//add table to initialize
addData(tableData);

//callback on button click to replace tableData
button.on("click", () => {
    d3.event.preventDefault();
    var inputDate = inputFieldDate.property("value").trim();
	//filter data down based on the data matching the value of inputDate
    let filterDate = tableData.filter(tableData => tableData.datetime === inputDate);
	//clear existing table
    $tbody.html("");
	//format filter date for presentation
    let response = {filterDate}
	//populate table with newly filtered data
    if(response.filterDate.length !== 0) {
        addData(filterDate);
    }
    else {
		//if no records in table, print placeholder
		$tbody.append("tr").append("td").text("No Sightings to Report");
    }
})
