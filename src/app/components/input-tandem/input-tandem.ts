import { EventService } from './../../services/event.service';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import moment from 'moment';
@Component({
  selector: 'input-tandem',
  templateUrl: './input-tandem.html',
  styleUrls: ['./input-tandem.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class InputTandemComponent implements OnDestroy, OnInit {

  @Input() extraClass: string;

  @Input() inputType: string = "text";
  @Input() inputPlaceholder: string = "";
  @Input() inputMaxLength: number = 10;
  @Input() values: any[] = [];
  @Input() withAutocomplete: boolean = false;
  @Input() multipler: boolean = false;
  @Input() float: boolean = false;
  @Input() selectWithImg: boolean = false;
  @Input() minDate: string = "";
  @Input() showSelection: boolean = false;
  @Input() minHour: string = "";


  // Output prop name must be Input prop name + 'Change'
  // Use in your component to write an updated value back out to the parent
  @Input() tandemModel: string = "";
  @Output() tandemModelChange = new EventEmitter<string>();
  @Output() multipleSelectionChange = new EventEmitter<any>();
  @Output() lastSelectionChange = new EventEmitter<any>();
  @Output() realValueAutocomplete = new EventEmitter<any>();
  @Output() dateChange = new EventEmitter<any>();
  @Output() checkChange = new EventEmitter<any>();
  @Output() changeNormalSelect = new EventEmitter<any>();

  @Input() seleccion: any[] = [];
  public selected = -1;



  private inputTmp: any = null;
  public isArea: boolean = false;

  formControl = new FormControl();
  autoFilter: Observable<any[]>;
  public sus: Subscription = null;
  //Items: string[] = ['BoJack Horseman', 'Stranger Things', 'Ozark', 'Big Mouth'];

  constructor(
    private eventService: EventService
  ) {


  }

  public ngOnInit(): void {
    //console.log(this.values);
    if (this.withAutocomplete) {
      this.autoFilter = this.formControl.valueChanges.pipe(
        startWith(''),
        map(value => this.mat_filter(value))
      );

      if (this.tandemModel?.length > 0) {
        this.mat_filter(this.tandemModel);
      }
    }

    this.sus = this.eventService.get("updateChecked").subscribe((position) => {
      this.seleccion = this.seleccion.slice(position, this.seleccion.length);
    });

    /* if (this.seleccion && this.seleccion.length > 0) {
      this.seleccion.forEach(e => {
        this.values.forEach(a => {
          if (e.value == a.value) {
            a.checked = true;
          }
        });
      });

     //console.log(this.values);

    } */

    if (this.minDate?.length <= 0) {
      this.minDate = moment(new Date()).format("YYYY-MM-DD");
    }

    if (this.minHour?.length <= 0) {
      this.minHour = moment(new Date()).format("YYYY-MM-DD");
      //console.log(this.minHour);

    }
    //console.log(this.minHour);

  }

  private mat_filter(value: any): any[] {
    try {

      const filterValue = value?.toLowerCase();
      
      let ele: any = this.values.filter(option => option.label.toLowerCase().indexOf(filterValue) === 0);
      try {
        if(ele.value){
          this.tandemModelChange.emit(ele.value);
        }
      } catch (error) {

      }
      if(ele){
        this.realValueAutocomplete.emit(ele);
      }
      return ele;
    } catch (error) {

    }
  }


  public ngOnDestroy(): void {
    if (this.sus) {
      this.sus.unsubscribe();
    }
  }

  /*checkbox change event*/
  onChange(event) {
    this.lastSelectionChange.emit([event, this.seleccion, this.inputTmp]);
  }

}
