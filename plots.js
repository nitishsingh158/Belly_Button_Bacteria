function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    // Trial Stuff

    var sampleIds = data.samples[0].otu_ids;
    var sampleValues = data.samples[0].sample_values;
    var idVals = {};
    sampleIds.map((el,i) => idVals[el]=sampleValues[i]);
    var keys = Object.entries(idVals).sort((a,b)=>b[1]-a[1]).map(el=>el[0]).slice(0,10);
    var vals = Object.entries(idVals).sort((a,b)=>b[1]-a[1]).map(el=>el[1]).slice(0,10);
    console.log(keys,vals);
    
    // Trail Stuff End
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result  = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
    PANEL.append("h6").text("GENDER: " + result.gender);
    PANEL.append("h6").text("AGE: " + result.age);
    PANEL.append("h6").text("LOCATION: " + result.location);
    PANEL.append("h6").text("bbtype: " + result.bbtype);
    PANEL.append("h6").text("WFREQ: " + result.wfreq);

  }
  );
}