#!/usr/bin/env node

// Import modules
const program = require("commander");
const glob = require("glob");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

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
    const hash = calculateHash(filePath); // uses SHA-1 hash function to create file hash

    // checks if duplicate file was already seen or not
    if (fileMap.has(hash)) {
      fileMap.get(hash).push(filePath);
    } else {
      fileMap.set(hash, [filePath]);
    }
  });

  // iterate through map and find arrays with length > 1
  fileMap.forEach((files, hash) => {
    if (files > 1) {
      console.log("Duplicate files (same content):");
      files.forEach((file) => console.log(file));
      console.log("---");
    }
  });
}

function calculateHash(filePath) {
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha1"); // create sha1 hash object
  hash.update(data); // update hash with data
  return hash.digest("hex"); // obtain final hash value by specifying encoding of output (represents hash as hexadecimal string)
}
