import { log } from "console";
import MyFileReader from "../../tools/MyFileReader";
import Game from "./Game";

export default function day2() {
    let games:Game[] = MyFileReader.readFile('day2.txt', '\n', Game.fromString);
    
    // part 1
    log('Part 1');
    let validGames:Game[] = games.filter((game:Game) => game.wasGamePossible('red',12) && game.wasGamePossible('green', 13) && game.wasGamePossible('blue', 14));
    let sumOfValidGames:number = 0;
    validGames.forEach((game:Game) => sumOfValidGames += game.id);
    log(sumOfValidGames);
    
    // part 2
    log('Part 2');
    let sumOfPowerOfGames:number = 0;
    games.forEach((game:Game) => sumOfPowerOfGames += game.getPower());
    log(sumOfPowerOfGames);
}