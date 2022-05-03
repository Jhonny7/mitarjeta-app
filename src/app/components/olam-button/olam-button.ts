import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'olam-button',
  templateUrl: './olam-button.html',
  styleUrls: ['./olam-button.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class OlamButtonComponent implements OnDestroy, OnInit {

  @Input() extraClass: string;
  @Input() onTap: Function;


  constructor(
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {

  }

}
