import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'input-float',
  templateUrl: './input-float.html',
  styleUrls: ['./input-float.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class InputFloatComponent implements OnDestroy, OnInit {

  @Input() data: any;
  constructor(
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {

  }

}
