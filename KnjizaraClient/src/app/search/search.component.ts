import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  enteredSearchValue: string = '';
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
    //kad god user ukuca u inputu koji assignujemo na searchTextChanger, emituje
    //(input) event se javlja kad user pocne da kuca u inputu
  }


}
