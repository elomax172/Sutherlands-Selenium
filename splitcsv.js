"use strict";

let fs = require('fs');
let csv = require('fast-csv');

if( process.argv.length <= 3){
    console.log("Usage: node test/splitcsv.js csvfilename (assumes .csv extension) numberOfLines");
    process.exit(-1);
}

var baseCsvFilename = process.argv[2];
const numberOfLines = Number(process.argv[3]);
console.log( `Processing ${baseCsvFilename}.csv in ${numberOfLines} line segments`);


function startSegment( currentSegment, baseFileName, segmentLength ){
    let csvStream = csv.createWriteStream({headers:true});
    let segment = ("" + currentSegment).padStart(segmentLength, "0");
    let fileName = `${baseFileName}${segment}.csv`;

    let writableStream = fs.createWriteStream(fileName);

    writableStream.on("finish", function(){
        console.log("Done writing");
    });

    csvStream.pipe(writableStream);

    return csvStream;
}


let lineCount = 0;
let segmentNumber = 0;
let segmentLength = 4;
let segmentStarted = false;
let csvStream = null;

// setup read
var stream = fs.createReadStream(baseCsvFilename + ".csv");

csv
    .fromStream(stream, {headers:true})
    .on("data", function(data){
        console.log("data");
        if( ! segmentStarted ){
            segmentStarted = true;
            csvStream = startSegment(
                segmentNumber++,
                baseCsvFilename,
                segmentLength
            );
        }

        csvStream.write(data);

        if( ++lineCount === numberOfLines ){
            segmentStarted = false;
            csvStream.end();
        }
    })
    .on("end", function(){
        console.log("end");
    });