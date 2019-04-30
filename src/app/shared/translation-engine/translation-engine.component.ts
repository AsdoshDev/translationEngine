import { TranslationEngineService } from './translation-engine.service';
import { Component, OnInit, Input , Output,EventEmitter } from '@angular/core';
import { parse } from 'papaparse';



@Component({
  selector: 'translation-engine',
  templateUrl: './translation-engine.component.html',
  styleUrls: ['./translation-engine.component.css']
})
export class TranslationEngineComponent implements OnInit {

  constructor(private service:TranslationEngineService) { }
  csvResults;
  @Output() sendLanguages = new EventEmitter();

  ngOnInit() {
    let csvFilePath = "./../../../assets/lang/aiesec.csv";
    parse(csvFilePath, {
      download: true,
      complete: (result) => {
        let modifiedResults = this.modifyResults(result.data)
      }
    });

    this.service.getLang.subscribe(data =>{
      debugger;
      this.translateText(data);
    });
  }

  modifyResults(results) {
    let langArray = results[0];
    this.sendLanguages.emit(langArray);
  }

  translateText(lang){
    console.log("TRANSLATING TEXT to " + lang);
  }
}
