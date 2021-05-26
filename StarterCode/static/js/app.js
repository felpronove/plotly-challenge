// Use the D3 library to read in `samples.json`.


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

// create function to build metadata
function buildMetadata(sample){
    console.log(sample);
    d3.json("./samples.json").then((importedData) => {
        // console.log(importedData);
        // create variables for each aspect of the data array
        var metadata = importedData.metadata;
    });
}

// create function to build charts
function buildChart(subject){
    d3.json("./samples.json").then((importedData) => {
        // console.log(importedData);
        // create variables for each aspect of the data array
        var samples = importedData.samples;
    });
}

// create function to update the metadata and charts when updating subject
function optionChanged(option){
    buildMetadata(option);
    buildChart(option);
}

// create function to initialize the page
function initialization(){
    // read data file and populate dropdown
    // select first sample and run additional functions
    // declare variable = d3.select(#selDataset)
    var sample_values = d3.select("#selDataset");
    d3.json("./samples.json").then((importedData) => {
        // console.log(importedData);
        // create variables for each aspect of the data array
        var names= importedData.names;
        console.log(names);
        names.forEach(element => {
            sample_values.append("option").text(element).property("value",element);
        });
        // find the first sample in the dataset
        var first_sample = names[0];
        buildChart(first_sample);
        buildMetadata(first_sample);
    });
}

initialization();
