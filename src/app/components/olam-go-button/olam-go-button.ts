import { ThemeService } from 'src/app/services/theme.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'olam-go-button',
  templateUrl: './olam-go-button.html',
  styleUrls: ['./olam-go-button.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class OlamGoButtonComponent implements OnDestroy, OnInit {

  @Input() extraClass: string;
  @Input() onTap: Function;


  constructor(
    public themeService: ThemeService
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {

  }

}
