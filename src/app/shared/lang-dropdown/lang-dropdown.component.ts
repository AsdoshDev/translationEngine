import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.css']
})
export class LangDropdownComponent implements OnInit {

  constructor() { }
  @Input() languages;
  @Output() selectedLang = new EventEmitter();
  ngOnInit() {
  }

  onChange(val){
    debugger;
    this.selectedLang.emit(val);
  }

}
