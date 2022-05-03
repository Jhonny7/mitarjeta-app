import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
//declare var moment: any;
@Component({
  selector: 'item-list-avatar',
  templateUrl: './item-list-avatar.html',
  styleUrls: ['./item-list-avatar.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ItemListAvatarComponent implements OnDestroy, OnInit {

  @Input() data: any;

  constructor(
  ) {
  }

  public ngOnInit(): void {
    
    moment.locale("ES");
   //console.log(this.data.fecha_inicio);
    let separate = this.data.fecha_inicio.split(" ")[0];
    let date = new Date(separate);
   //console.log(date);
   //console.log(date.getDate());
    
    this.data.dia = date.getDate() < 10 ? `0${date.getDate() + 1}` : date.getDate() + 1;

    this.data.mes = moment(date).format("MMM").toUpperCase().slice(0, -1);

    let myDate: any = new Date(this.data.fecha_inicio);
    this.data.horaIni = moment(myDate).format("HH:mm");
   //console.log("-------------------------------------------------------");
    myDate = new Date(this.data.fecha_fin);
    this.data.horaFin = moment(myDate).format("HH:mm");

  }

  public ngOnDestroy(): void {

  }

  removeId(name:string){
    return name.split("-tan-dem-")[0];
  }

}
