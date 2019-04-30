import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class TranslationEngineService {
    constructor() { }

    private subject = new Subject<any>();
    public getLang = this.subject.asObservable();

    passLang(lang:any){
        return this.subject.next(lang);
    }
}


