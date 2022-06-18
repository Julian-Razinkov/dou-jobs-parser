import { IJob } from "./job";
import {load} from 'cheerio';
import axios from "axios";
import { Sheet } from "./sheet";


export class Parser{
    private _url:string = 'https://jobs.dou.ua/vacancies/?search=node+junior';
    private _jobs:IJob[] = [];
    private sheet = new Sheet();

    public async parseJobsData(){
        this._jobs = [];
        const { data } = await axios.get(this._url);
        const $ = load(data);
    
        $('.title').each((i, el) => {
            const job:IJob = {
                name: $(el).find('.vt').text(),
                link: $(el).find('.vt').attr('href'),
                company: $(el).find('strong').children('a').text(),
            } 
            this.jobs.push(job);
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

    public get jobs(){
        return this._jobs;
    }

    constructor(){

    }
}