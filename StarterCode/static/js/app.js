// Use the D3 library to read in `samples.json`.
d3.json("../samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;