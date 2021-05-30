// Use the D3 library to read in `samples.json`.


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

// create function to build metadata
function buildMetadata(sample){
    console.log(sample);
    d3.json("./samples.json").then((importedData) => {
        // console.log(importedData);
        // create variables for each aspect of the data array
        var metadatas = importedData.metadata;
        var resultArr = metadatas.filter(sampleObject => sampleObject.id == sample)
        var result = resultArr[0]
        var panel = d3.select('#sample-metadata-panel')
        panel.html('')
        Object.entries(result).forEach(([k,v]) =>{
            panel.append('h6').text(`${k.toUpperCase()}: ${v}`);
        })
    })
}

// create function to build charts
function buildChart(subject,n){
    d3.json("./samples.json").then((importedData) => {
        // console.log(importedData);
        // create variables for each aspect of the data array
        var samples = importedData.samples;
        var sample_array = samples.filter(sampleObject => sampleObject.id==subject)
        var result = sample_array[0]
        var chart_IDs = result.otu_ids
        var labels = result.otu_labels
        var sampleVals= result.sample_values
        var otu_labels = result.otu_labels

        // create bubble charts
        // set up bubble chart layout
        var bubbleChartlayout = {
            'title': 'Bubble Chart',
            'margin': {
                t:0
            },
            'hovermode': 'closest',
            'margin': {t:30}
        };

        // create actual bubbles for bubble chart
        var bubbleChart = {
            'x': chart_IDs,
            'y': sampleVals,
            'text': labels,
            'sizemode': 'area',
            'mode': 'markers',
            'marker':{
                'size': sampleVals,
                'color': chart_IDs,
                'colorscale': 'Earth'
            }
        }

        // create a horizontal bar chart
        var barLayout ={
            'title': 'Top 10 Belly Button Cultures',
        };

        new_id=[]
        Object.entries(chart_IDs).forEach(([k,v])=>{
            new_id.push(('otu-'+ v))
        })

        var barTrace = {
            'x': sampleVals.slice(0,10).reverse(),
            'y': new_id.slice(0,10),

            'type': 'bar',
            'orientation': 'h',
            'text': otu_labels
        }

        // wash = importedData['metadata'][n]["wfreq"];

        // var gaugeTrace = {
        //     domain: {x: [0,1], y: [0,1]},
        //     type: "indicator",
        //     mode: "gauge+number",

        //     gauge: {
        //         axis: {visible:true, range:[null,9], nticks:10},
        //         bar: {color: 'red'},
        //     },

        //     value: wash,
        //     title: {text: "Belly Button Washing frequency %n Scrubs per week"}
        // }

        // var gaugeLayout = {
        //     width: 600,
        //     height: 500,
        //     margin: {t: 0, b: 0},
        // };

        // Add the chart to the page
        Plotly.newPlot('bubble', [bubbleChart], bubbleChartlayout);
        Plotly.newPlot('bar', [barChart], barChartlayout);
        // Plotly.newPlot('gauge', [gaugeChart], gaugeChartlayout);

    })
    // find the datapoint that matches the selected sample

    // var id = samples.id;
    // var ethnicity = samples.ethnicity;
    // var gender = samples.gender;
    // var age = samples.age;
    // var location = samples.location;
    // var bbtype = samples.bbtype;
    // var wfreq = samples.wfreq;

    // var trace1 = {
    //     x: otu_ids
    //     y:otu_ids.values
    // };

}

// create function to update the metadata and charts when updating subject
function optionChanged(option){
    var dropdownMenu = d3.select('#selDataset');
    var new_sample = dropdownMenu.property('value');
    d3.json('./samples.json').then(function(data) {
        var samples = data.samples
        var resultArr = samples.filter(sampleObject=> sampleObject.id == option)

        for (var i=0; i<153; i++){
            if (samples[i].id==option){
                idx = i
            }
        }
        buildMetadata(option)
        buildChart(option,idx)
    });
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
