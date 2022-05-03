import { ThemeService } from 'src/app/services/theme.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'fab-button',
  templateUrl: './fab-button.html',
  styleUrls: ['./fab-button.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class FabButton implements OnDestroy, OnInit{

  @Input() slot:string = "buttonRight";
  @Input() extraClass:string;

  constructor(
    public themeService: ThemeService
  ) {
  }

  public ngOnInit():void{
  }

  public ngOnDestroy():void{
    
  }

}
