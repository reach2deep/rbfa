import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-num-pad',
  templateUrl: './num-pad.component.html',
  styleUrls: ['./num-pad.component.scss']
})
export class NumPadComponent implements OnInit {

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
