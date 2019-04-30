import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class TranslationEngineService {
    csvData: any[] = [];
    constructor(private http: HttpClient) { }
}


