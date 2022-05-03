import { ThemeService } from 'src/app/services/theme.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { GenericService } from './../../services/generic.service';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';

export interface Tabs{
  title: string,
  icon?: string,
  handle?: Function,
  active:boolean,
  component?: any,
  url?:string, //if this property is not null, apply routing in the component
  data?: any,
  reload?:boolean //its for recharge page many time into
};

export interface TabConfig{
  extraClass?:string,

}

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html',
  styleUrls: ['./tabs.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit{

  @Input() tabs:Tabs[];
  @Input() tabConfig:TabConfig;

  @Output() tabSelect:EventEmitter<Tabs> = new EventEmitter<Tabs>();

  public percent:number = 100;

  constructor(
    public genericService: GenericService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private alertService: AlertService,
    public themeService: ThemeService
  ) {
   //console.log("tab 1");
    
  }

  ngOnInit(){
   //console.log(this.tabs);
    
    if(this.tabs){

      this.percent = this.percent / this.tabs.length;
      //console.log(this.percent);
      
      this.tabs.forEach((tab:Tabs) => {
        if(tab.active){
          this.renderComponent(tab);
        }
      });
    }
  }

  renderComponent(tab:Tabs){
    let tt:any = this.localStorageEncryptService.getFromLocalStorage("temaGlobal");
    if(tab.url == "inicio" || tt){
      return this.tabSelect.emit(tab);
    }else{
      this.alertService.warnAlert("Espera!", "Antes de continuar debes seleccionar un tema");
    }
  }
}
