export interface IJob{
    name:string;
    /* Если link будет другого типа - программа крашнеться из-за того, 
    что в массив с работами почему-то парситься одна работа с пустыми полями*/
    link:any;
    company:string;
}