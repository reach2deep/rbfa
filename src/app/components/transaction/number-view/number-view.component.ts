import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-view',
  templateUrl: './number-view.component.html',
  styleUrls: ['./number-view.component.scss']
})

export class NumberViewComponent implements OnInit {

  displayNumber = '';
  @Output() selectedNumber = new EventEmitter<string> ();
  // subDisplay: String = '';
  // activeBuildingNumber  = '';

  ngOnInit(): void {
  }

  clear() {
    this.displayNumber = '';
  }

  buildNumber(num: any): void {
    console.log(num);
    this.displayNumber += num;
  }

  enter() {
    this.selectedNumber.emit(this.displayNumber);
  }
}
