export default class Game {
    id:number;
    sets:Map<string,number>[];

    constructor(id:number, sets:Map<string,number>[]){
        this.id = id;
        this.sets = sets;
    }

    public static fromString(inString:string):Game {
        let gameId = parseInt(inString.split(':')[0].split(' ')[1]);
        let gameSets:Map<string,number>[] = [];
        inString.split(':')[1].split(';').forEach((set:string) => {
            const setArray:string[] = set.split(',');
            let setMap:Map<string,number> = new Map<string,number>();
            setArray.forEach((draw:string) => {
                const drawArray:string[] = draw.trim().split(' ');
                setMap.set(drawArray[1], parseInt(drawArray[0]));
            });
            gameSets.push(setMap);
        });
        return new Game(gameId, gameSets);
    }

    public wasGamePossible(color:string, max:number){
        let isGameValid:boolean = true;
        this.sets.forEach((set:Map<string,number>) => {
            const colorCountPerSet = set.get(color);
            if(colorCountPerSet && colorCountPerSet > max){
                isGameValid = false;
            }
        });
        return isGameValid;
    }

    public getPower():number{
        let minRed:number = 0;
        let minGreen:number = 0;
        let minBlue:number = 0;
        this.sets.forEach((set:Map<string,number>) =>{
            if(set.get('red')){minRed = Math.max(minRed, set.get('red')!);}
            if(set.get('green')){minGreen = Math.max(minGreen, set.get('green')!);}
            if(set.get('blue')){minBlue = Math.max(minBlue, set.get('blue')!);}
        });
        return minRed * minGreen * minBlue;
    }
}