import { IJob } from "./job";
import {load} from 'cheerio';
import axios from "axios";
import { Sheet } from "./sheet";
import { appendFile, writeFile } from "fs/promises";



export class Parser{
    private _url:string = 'https://jobs.dou.ua/vacancies/?search=node+junior';
    private _jobs:IJob[] = [];
    private sheet = new Sheet();

    public async parseJobsData(){
        this._jobs = [];
        const { data } = await axios.get(this._url);
        const $ = load(data);
    
        $('.title').each((i, el) => {
                let name = $(el).find('.vt').text();
                let link = $(el).find('.vt').attr('href');
                let company =  $(el).find('strong').children('a').text();

                if(link == undefined) link = '';

                const job:IJob = {
                    name,
                    link,
                    company,
                }

                this._jobs.push(job);
        });
    }
    public async saveToSpreatsheet(){
        await this.parseJobsData();
        const spreadSheetData:any[] = [];
        this._jobs.forEach((el) => {
            const row = Object.values(el);
            spreadSheetData.push(row);
        })
        
        await this.sheet.writeRows(spreadSheetData)
    }
    public async saveToFile(){
        await writeFile('output.txt', '');
        await this.parseJobsData();
        this._jobs.forEach(el => {
            appendFile('output.txt', `Job name: ${el.name} \nCompany name: ${el.company}\nLink: ${el.link}\n \n`)
        })
    }

    public get jobs(){
        return this._jobs;
    }

    constructor(){

    }
}