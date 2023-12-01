#! /usr/bin/env node
import { log } from "console";
import * as readline from "readline";
import { exit } from "process";
import figlet from "figlet";
import DayModuleRepresentation from "./tools/DayModuleRepresentation";
import day1 from "./days/day1/day1";
import day2 from "./days/day2/day2";


const dayModules:DayModuleRepresentation[] = [
    new DayModuleRepresentation(day1, "Trebuchet?!"),
    new DayModuleRepresentation(day2, "")
];
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

log(figlet.textSync(
    "M3 AoC '23"
));

const today = new Date();
if(process.argv[2] === "-t" && today.getDate() <= 24 && today.getMonth() === 11 && dayModules){
    execDayModule(dayModules, today.getDate());
    exit();
}
    
let dayToRun = 0;
reader.question("Which day do you want to run? \n", n => {
    dayToRun = parseInt(n);
    if (isNaN(dayToRun) || dayToRun < 1 || dayToRun > 24 || dayModules[dayToRun-1] === undefined){
        log(n + " is not a valid Advent of Code Day or has not been implemented yet!");
    } else {
        execDayModule(dayModules, dayToRun);
    }
    reader.close();
});


/**
 * A helper function to run a days code
 * @param dayModules Array of DayModuleRepresentations, that contain the main function of that day and its title
 * @param day Number of the day to run (1-24)
 */
function execDayModule(dayModules:DayModuleRepresentation[], day:number) {
    log(figlet.textSync(
        "Day "+ day + ": " + dayModules[day-1].title
    ))
    dayModules[day-1].dayExportable();
}