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

function findDuplicateFiles(directory) {
  const fileMap = new Map(); // map that will contain file hashes

  // match files using the patterns the shell uses (returns array of files)
  glob.sync(path.join(directory, "**/*.*")).forEach((filePath) => {
    const hash = sha1File.sync(filePath); // uses SHA-1 hash function to create file hash

    // checks if duplicate file was already seen or not
    if (fileMap.has(hash)) {
      fileMap.get(hash).push(filePath);
    } else {
      fileMap.set(hash, [filePath]);
    }
  });
}
