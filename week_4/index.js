
// import chalk from 'chalk';
// console.log(chalk.blue("hello world"));
// console.log(chalk.red.bold("hello world"));
// console.log(chalk.green.underline("hello world"));


// COMMAND LINE INTERFACE
// const fs = require('fs');
// const fs = require('fs');
import fs from 'fs'; // ✅ CORRECT

// const { Command } = require('commander');
import { Command } from 'commander'; // ✅ CORRECT

const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
  .description('Count the number of sentence in a file')
  .argument('<file>', 'file to count the sentence')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();



// node index.mjs count "C:\Users\user\OneDrive\Desktop\cohortt 3.0\week_4\a.txt"  


// https://petal-estimate-4e9.notion.site/Domain-name-IP-f70d6d49ef104d9a9e8277d87f347184?pvs=143