import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from 'fs';
import { parse } from "path";
import { Parser } from "./src/parser";

const url = 'https://jobs.dou.ua/vacancies/?search=node+junior';

const main = async () => {
   const parser = new Parser();
   await parser.parseJobsData();

   const saveJobsToFile = () => {
       parser.jobs.forEach((el) => {
           const name = el.name;
           const company = el.company;
           const link = el.link;
           fs.appendFile('output.txt', `${name} - ${company} \n${link} \n`, ((err) => {

           }))
       })
       console.log('Saved to file!')
   }

   saveJobsToFile()
   //Дальше можно будет сделать сохранение и передачу данных в разные источники (гугл таблицы, телеграм и прочее)
   //Так же стоит разобраться с тем как запускать парсер по времени
}
main()