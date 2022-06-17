import { IJob } from "./job";
import {load} from 'cheerio';
import axios from "axios";

export class Parser{
    private _url:string = 'https://jobs.dou.ua/vacancies/?search=node+junior';
    private _jobs:IJob[] = [];
    
    public async parseJobsData(){
        const { data } = await axios.get(this._url);
        const $ = load(data);
    
        $('.title').each((i, el) => {
            const job:IJob = {
                name: $(el).children('.vt').text(),
                link: $(el).children('.vt').attr('href'),
                company: $(el).children('strong').children('a').text(),
            } 
            this.jobs.push(job);
        });
    }

    public get jobs(){
        return this._jobs;
    }

    constructor(){

    }
}