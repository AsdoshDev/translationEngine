import { Injectable } from '@angular/core';
import { Observable, Subject,BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})

export class TranslationEngineService {
    constructor() { }

    private subject = new BehaviorSubject<any>(null);
    public getLang = this.subject.asObservable();

    passLang(lang:any){
        return this.subject.next(lang);
    }
}


