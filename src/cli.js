#!/usr/bin/env node
var schedule = require('./schedule'),
  path = require('path');

if (process.argv.length < 3) {
  console.log('Usage: stressful-journey <steps> [custom log serializer(s)] [count=1] [delay=0] [randomisation=0]');
  process.exit(1);
}

var stepsPath = path.relative(__dirname, path.resolve(process.argv[2])),
  steps = require(stepsPath),
  count = Number(process.argv[4]) || 1,
  delay = Number(process.argv[5]) || 0,
  randomisation = Number(process.argv[6]) || 0;

var logSerializers;
if (process.argv.length > 3) {
  var logSerializersPath = path.relative(__dirname, path.resolve(process.argv[3]));
  logSerializers = require(logSerializersPath);
}

function done(error, errorCount) {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.info('Completed (%d errors)', errorCount);
  }
}

schedule({
  steps: steps,
  count: count,
  delay: delay,
  randomisation: randomisation,
}, done, logSerializers);
