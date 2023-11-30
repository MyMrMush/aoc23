import * as fs from "fs";

const _path = "infiles/"
export default class MyFileReader {

    /**
     * Reads the contents of a text file as a string
     * @param filename the name of the file inside the 'infiles' direcory (e.g. 'test.txt')
     */
    static readFile(filename:string):string;
    /**
     * Reads the contents of a text file and splits it by the provided seperator, returns an array of strings
     * @param filename the name of the file inside the 'infiles' direcory (e.g. 'test.txt')
     * @param seperator the seperator to split the content by (e.g. ';' or '\n')
     */
    static readFile(filename:string, seperator:string):string[];
    /**
     * Reads the contents of a text file and splits it by the provided seperator.
     * It then applies the provided funtion to all elements and returns an array of the return type of said function.
     * @param filename the name of the file inside the 'infiles' direcory (e.g. 'test.txt')
     * @param seperator the seperator to split the content by (e.g. ';' or '\n')
     * @param conversion the function to apply to each element of the split content (e.g. parseInt)
     */
    static readFile<T>(filename:string, seperator:string, conversion:(v: string)=>T):T[];
    static readFile<T>(filename:string, seperator?:string, conversion?:(v:string)=>T):string|string[]|T[]{
        let rawContent = fs.readFileSync(_path+filename, "utf8");
        let splitContent:string[] = [];
        let convertedSplitContent:any[] = [];
        if(seperator){
            rawContent.split(seperator).forEach((element: string) => {
                splitContent.push(element.trim());
            });
            if (conversion) {
                splitContent.forEach(element => {
                    convertedSplitContent.push(conversion(element));
                });
                return convertedSplitContent;
            }
            return splitContent;
        }
        return rawContent;
    }
}