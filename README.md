# Find File Duplicates

Node.js CLI application that takes a directory and finds duplicate files within that directory and its subdirectories.

## Notes

- Utilizes commander, crytpo, and glob packages to define program, use SHA-1 hash function, and pattern match files respectively
- Uses a map to record any duplicate files that have the same hash
- Searches within input directory and its subdirectories
- provide 1 CLI argument and an optional --ignore flag that causes program to ignore node_modules folder
- logs duplicate files

## npm package download

- [find-duplicate-files](https://www.npmjs.com/package/find-file-duplicates)
- or use command: npm i find-file-duplicates

## Contact

- [LinkedIn](https://www.linkedin.com/in/terrencejung/)
