import { log } from "console";
import MyFileReader from "../../tools/MyFileReader";

export default function day1() {
    // part 1
    log('Part 1: without converting spelled out numbers');
    let puzzleInput:number[] = MyFileReader.readFile('day1.txt', '\n', extractValuePart1);
    let sum:number = puzzleInput.reduce((s:number, c:number) => s + c);
    log(sum);

    // part 2
    log('Part 2: with converting spelled out numbers');
    puzzleInput = MyFileReader.readFile('day1.txt', '\n', extractValuePart2);
    sum = puzzleInput.reduce((s:number, c:number) => s + c);
    log(sum);
}

function extractValuePart1(input:string):number{
    let firstDigit:string = "";
    let lastDigit:string = "";
    for(let i = 0; i < input.length; i++){
        if(!isNaN(parseInt(input.charAt(i)))){
            firstDigit = input.charAt(i);
            break;
        }
    }
    for(let i = input.length-1; i >= 0; i--){
        if(!isNaN(parseInt(input.charAt(i)))){
            lastDigit = input.charAt(i);
            break;
        }
    }
    return parseInt(firstDigit+lastDigit);
}

function extractValuePart2(input:string):number{
    let firstDigit:string = "";
    let lastDigit:string = "";
    for(let i = 0; i < input.length; i++){
        if(!isNaN(parseInt(input.charAt(i)))){
            firstDigit = input.charAt(i);
            break;
        } else if (firstSpelledNumber(input, i) > 0){
            firstDigit = firstSpelledNumber(input, i).toString();
            break;
        }
    }
    for(let i = input.length-1; i >= 0; i--){
        if(!isNaN(parseInt(input.charAt(i)))){
            lastDigit = input.charAt(i);
            break;
        }else if (firstSpelledNumber(input, i) > 0){
            lastDigit = firstSpelledNumber(input, i).toString();
            break;
        }
    }
    return parseInt(firstDigit+lastDigit);
}

function firstSpelledNumber(inString:string, startIndex:number):number{
    const numbers: { [key: string]: number } = { 
        one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9
    };
    for (const spelled in numbers) {
        if(inString.startsWith(spelled, startIndex)){
            return numbers[spelled];
        }
    }
    return 0;
}