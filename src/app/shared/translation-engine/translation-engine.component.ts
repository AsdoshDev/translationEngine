import { TranslationEngineService } from './translation-engine.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { parse } from 'papaparse';

@Component({
  selector: 'translation-engine',
  templateUrl: './translation-engine.component.html',
  styleUrls: ['./translation-engine.component.css']
})
export class TranslationEngineComponent implements OnInit {

  constructor(private service: TranslationEngineService) { }
  csvResults;
  modifiedResults;
  langArray;
  finalValue = {};
  @Output() sendLanguages = new EventEmitter();

  ngOnInit() {
    let modifiedResults;
    let csvFilePath = "./../../../assets/lang/aiesec.csv";
    parse(csvFilePath, {
      download: true,
      complete: (result) => {
        console.log(result.data);
        window['myarray'] = this.csvResults = result.data;
        this.modifiedResults = this.modifyResults(result.data);
        this.service.getLang.subscribe(data => {
          this.translateText(data);
        });
      }
    });
  }

  modifyResults(results) {
    //emit the languages to dropdown
    this.langArray = results[0];
    this.sendLanguages.emit(this.langArray);
    return results.splice(1);
  }



  translateText(lang) {
    let mainIndex = this.langArray.indexOf(lang);
    let obj = {};
    let arrayOfValues = this.modifiedResults.map((item, index) => {
      // let key = 'randomKey'+index;
      return (item[mainIndex]);
    });

    console.log(arrayOfValues);


    
    console.log("CHANGED RESULT");
    
    let arr = [];
    let arrayToObject = (arr, keyField) => {
      window['Object'].assign({}, ...arr.map((item,index) =>{ console.log(({[keyField+'_' +index]: item})); ({[keyField+'_' +index]: item}) } ));
    }
    
    console.log(arrayToObject(arrayOfValues, "langText"));
    console.log("TRANSLATING TEXT to " + lang);
  }
}
