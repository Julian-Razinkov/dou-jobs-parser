import { google } from 'googleapis'

export class Sheet {
    private auth = new google.auth.GoogleAuth({
        keyFile: 'keys.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    private id = `1lYkQT6K4WC1YwO_yVVSeuL77AOL0P-cOegWRetHj13k`;

    private async getClient() {
        const client = await this.auth.getClient();
        return client;
    }

    private async getSpreadsheets() {
        const spreadsheets = google.sheets({ version: 'v4', auth: await this.getClient() });
        return spreadsheets
    }

    public async readRows() {
        const rows = await (await this.getSpreadsheets()).spreadsheets.values.get({
            auth: await this.getClient(),
            spreadsheetId: this.id,
            range: 'Лист1!A:A'
        })
        return rows;
    }
    public async writeRows(data:any){

        //Clearig the old data before writing the new one
        await (await this.getSpreadsheets()).spreadsheets.values.clear({
            auth: await this.getClient(),
            spreadsheetId: this.id,
            range: 'Лист1!A2:C30',
        })

        await (await this.getSpreadsheets()).spreadsheets.values.append({
            auth: await this.getClient(),
            spreadsheetId: this.id,
            range: 'Лист1!A:A',
            valueInputOption: 'USER_ENTERED',
            requestBody:{
                values: data
            }
        })
    }

    constructor() { }
}