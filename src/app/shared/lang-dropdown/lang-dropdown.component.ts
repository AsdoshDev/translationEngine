import { TranslationEngineService } from './../translation-engine/translation-engine.service';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {LANG_MAPPING} from './../../../assets/lang/lang-code';
import detectBrowserLanguage from 'detect-browser-language'

@Component({
  selector: 'lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.css']
})
export class LangDropdownComponent implements OnInit {

  constructor(private service : TranslationEngineService) { }
  defaultLang;
  @Input() languages;
  @Output() selectedLang = new EventEmitter();
  ngOnInit() {
    let language = window.navigator['userLanguage'] || window.navigator.language;
    console.log("BROWSER LANGUAGE");
    console.log(detectBrowserLanguage());
    console.log(language);
    this.defaultLang = LANG_MAPPING[language.split('-')[0]];
    this.service.passLang(this.defaultLang);
  }

  onChange(val){
    this.selectedLang.emit(val);
    this.service.passLang(val);
  }

}
