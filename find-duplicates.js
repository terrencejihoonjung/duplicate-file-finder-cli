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
  .argument("<directory>", "directory input") // acts upon argument input
  .option("--ignore", "ignore node modules")
  .action((directory, options) => {
    // takes argumnt and performs given action
    const ignoreNM = options.ignore ? true : false;
    findDuplicateFiles(directory, ignoreNM);
  })
  .parse(process.argv);

function findDuplicateFiles(directory, ignoreNM) {
  const fileMap = new Map(); // map that will contain file hashes

  // match files using the patterns the shell uses (returns array of files)
  glob
    .sync(path.join(directory, "**/*.*"), {
      ignore: ignoreNM ? "node_modules/**" : "",
    })
    .forEach((filePath) => {
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
    if (files.length > 1) {
      console.log("\nDuplicate files (same content):\n");
      files.forEach((file) => console.log(file));
      console.log("\n---");
    }
  });
}

function calculateHash(filePath) {
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha1"); // create sha1 hash object
  hash.update(data); // update hash with data
  return hash.digest("hex"); // obtain final hash value by specifying encoding of output (represents hash as hexadecimal string)
}
