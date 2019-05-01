
import { Component, OnInit, Input } from '@angular/core';
import { parse } from 'papaparse';
import { LANG_MAPPING } from './../../../assets/lang/lang-code';
@Component({
  selector: 'translation-engine',
  templateUrl: './translation-engine.component.html',
  styleUrls: ['./translation-engine.component.css']
})
export class TranslationEngineComponent implements OnInit {

  constructor() { }

  modifiedResults = [];
  languages = [];
  langSpecificValues = [];
  onFirstLoad = true;
  defaultLang;
  @Input() csvFilePath;

  ngOnInit() {
    this.getDefaultLanguage();
    this.parseCSV();
  }

  getDefaultLanguage() {
    let language = window.navigator['userLanguage'] || window.navigator.language;
    this.defaultLang = LANG_MAPPING[language.split('-')[0]];
    
    /* use any one of below lines to programatically change the language of the site anf refresh the page */
    
    // this.defaultLang = LANG_MAPPING['es'];
    // this.defaultLang = LANG_MAPPING['zh'];
    // this.defaultLang = LANG_MAPPING['pl'];
  }

  parseCSV() {
    parse(this.csvFilePath, {
      download: true,
      complete: (result) => {
        if (result && result.data) {
          this.modifiedResults = this.removeLangArray(result.data);
          this.translateText(this.defaultLang);
          this.onFirstLoad = false;
        }
      }
    });
  }

  removeLangArray(results) {
    this.languages = results[0];
    /* remove language array and return the rest  */
    return results.splice(1);
  }


  translateText(lang) {
    /* find the index of browser language or user selected language from array got from csv file */
    let langIndex = this.languages.indexOf(lang);
    /* find the index of browser language or user selected language from array got from csv file */
    this.langSpecificValues = this.modifiedResults.map(item => (item[langIndex]));
    /* attach an attribute to every node to change the text on dropdown change */
    this.attachAttrsToDomElements();
  }

  attachAttrsToDomElements() {
    let domNodes = document.querySelector('body').getElementsByTagName('*');

    /* set attribute 'data-index' on page load with values in English */

    if (this.onFirstLoad) {
      let defaultLangValues = this.modifiedResults.map(item => (item[0]));
      for (let i = 0; i < domNodes.length; i++) {
        let targetElement = domNodes[i];
        let index = defaultLangValues.indexOf((targetElement.textContent).trim());
        if (index > -1) {
          targetElement.setAttribute('data-index', index.toString());
        }
      }

      /* change to default language with data-index */

      for (let i = 0; i < domNodes.length; i++) {
        let targetElement = domNodes[i];
        let attr = targetElement.getAttribute('data-index');
        if (attr)
          targetElement.textContent = this.langSpecificValues[attr];
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



