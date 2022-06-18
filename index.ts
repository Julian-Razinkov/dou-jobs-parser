import * as fs from 'fs';
import { Parser } from "./src/parser";
import { Sheet } from './src/sheet';

const url = 'https://jobs.dou.ua/vacancies/?search=node+junior';

const main = async () => {
    const parser = new Parser();
    parser.saveToSpreatsheet()
    console.log('hey');

    //Дальше можно будет сделать сохранение и передачу данных в разные источники (гугл таблицы, телеграм и прочее)
    //Так же стоит разобраться с тем как запускать парсер по времени
    //TODO разобраться с ошибками типов в методе saveToSpreadsheet
}
main()