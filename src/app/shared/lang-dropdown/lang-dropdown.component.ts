import { TranslationEngineService } from './../translation-engine/translation-engine.service';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.css']
})
export class LangDropdownComponent implements OnInit {

  constructor(private service : TranslationEngineService) { }
  @Input() languages;
  @Output() selectedLang = new EventEmitter();
  ngOnInit() {
  }

  onChange(val){
    this.selectedLang.emit(val);
    this.service.passLang(val);
  }

}
