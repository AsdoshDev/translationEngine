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
  modifiedResults = [];
  langArray = [];
  langSpecificValues = [];
  onFirstLoad = true;
  @Input() csvFilePath;
  @Output() sendLanguages = new EventEmitter();

  ngOnInit() {
    this.parseCSV();
  }

  parseCSV(){
    parse(this.csvFilePath, {
      download: true,
      complete: (result) => {
        this.modifiedResults = this.removeLangArray(result.data);
        this.service.getLang.subscribe(data => {
          this.translateText(data);
          this.onFirstLoad = false;
        });
      }
    });
  }


  removeLangArray(results) {
    this.langArray = results[0];
    /* send the languages array to dropdown component */
    this.sendLanguages.emit(this.langArray);
    /* remove language array and return the rest  */
    return results.splice(1);
  }


  translateText(lang) {
    /* find the index of browser language or user selected language from array got from csv file */
    let langIndex = this.langArray.indexOf(lang);
    /* find the index of browser language or user selected language from array got from csv file */
    this.langSpecificValues = this.modifiedResults.map((item, index) => (item[langIndex]));
    /* attach an attribute to every node to change the text on dropdown change */
    this.attachAttrsToDomElements();
  }

  attachAttrsToDomElements() {
    let domNodes = document.querySelector('body').getElementsByTagName('*');

    /* set attribute 'data-index' on page load */

    if (this.onFirstLoad) {
      for (let i = 0; i < domNodes.length; i++) {
        let targetElement = domNodes[i];
        let index = this.langSpecificValues.indexOf((targetElement.textContent).trim());
        if (index > -1) {
          targetElement.setAttribute('data-index', index.toString());
        }
      }
    }

    /* on dropdown change , replace language specific values */

    else {
      for (let i = 0; i < domNodes.length; i++) {
        let targetElement = domNodes[i];
        let attr = targetElement.getAttribute('data-index');
        if (attr)
          targetElement.textContent = this.langSpecificValues[attr];
      }
    }
  }
}



