// Get the url information
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Adding dropdown menu 
d3.json(url).then(function(data) {  
   let dropdown = d3.select("#selDataset");

   let options =  dropdown.selectAll("option")
    .data(data.names)
    .enter()
    .append("option")
    .attr("value", function(d) {return d;})
    .text(function(d) {return d;})
});


// Fetch the JSON data and read samples.json
function optionChanged (user_id){ 
d3.json(url).then(function(data) {  
    samples= data.samples;
    meta = data.metadata;
    console.log(data);
    console.log(samples);
   
// Filtering to get data chosen in dropdown
    single_id = samples.filter(sampleObj => sampleObj.id == user_id);
    single_meta = meta.filter(sampleObj => sampleObj.id == user_id);
    const entries = Object.entries(single_meta[0]);
// Getting metadata information of the user
    let sampleMetadata = d3.select("#sample-metadata");
    sampleMetadata.selectAll("p")
    .enter()
    .data(entries)
    .join("p")
    .text(d => `${d[0]}: ${d[1]}`);
   
   
// Get the values, ids and label for the user_id
    let firstRow = single_id[0];
    let id = firstRow.otu_ids;
    let values = firstRow.sample_values;
    let labels = firstRow.otu_labels;

// bar chart for the One sample of OTU Data 
    let trace1 = {
        x: values.slice(0,10).reverse(),
        y: id.slice(0,10).map(id => `OTU${id}`).reverse(),
        text: labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    };
console.log(values.slice(0,10).reverse())
// bubble chart for the One sample of OTU Data    
    let trace2 = {
        x: id,
        y: values,
        text: labels,
        mode: 'markers',
        marker: {
          color: id,
          colorscale:'Viridis',
          size: values,
          sizeref: 0.1,
          sizemode: 'area'
        }
      };

  

// `data` has already been defined, so we must choose a new name here:
    let traceData = [trace1];
    let traceData2 = [trace2];
   
// Apply a title to the layout
    let layout = {
    title: "Top 10 OTU",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
    }
    };
    let layout2 = {
        title: 'Top 10 OTU in Bubble',
        showlegend: false,
        height: 400,
        width: 900
      };

// Render the plot to the div tag with id from html page
    Plotly.newPlot("bar", traceData, layout);
    Plotly.newPlot("bubble", traceData2, layout2);

});
};
// Display default
optionChanged("940")