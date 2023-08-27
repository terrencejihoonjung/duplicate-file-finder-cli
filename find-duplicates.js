#!/usr/bin/env node

// Import modules
const program = require("commander");
const glob = require("glob");
const sha1File = require("sha1-file");
const path = require("path");
const fs = require("fs");

// Define program
program
  .version("1.0.0")
  .arguments("<directory>") // acts upon argument input
  .action((directory) => {
    // takes argumnt and performs given action
    findDuplicateFiles(directory);
  })
  .parse(process.argv);
