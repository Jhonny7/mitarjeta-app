import { ThemeService } from 'src/app/services/theme.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'container-app',
  templateUrl: './container-app.html',
  styleUrls: ['./container-app.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ContainerAppComponent implements OnDestroy, OnInit{
 
  
  constructor(
    public themeService: ThemeService
  ) {
   //console.log("ejemplo");
    
  }

  public ngOnInit():void{
  }

  public ngOnDestroy():void{
    
  }

}
