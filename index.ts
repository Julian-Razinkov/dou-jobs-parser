import { Parser } from "./src/parser";

const main = async () => {
    const parser = new Parser();
    parser.saveToSpreatsheet();
}
main()