import { Component, Input, OnDestroy, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { PopoverController, Platform, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { LocalStorageEncryptService } from 'src/app/services/local-storage-encrypt.service';
import { ThemeService } from 'src/app/services/theme.service';
import { OpcionesComponent } from '../opciones/opciones.component';
import { GenericService } from './../../services/generic.service';

@Component({
  selector: 'olam-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  //encapsulation: ViewEncapsulation.None
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HeaderComponent implements OnDestroy, OnInit {

  @Input() title:string;
  @Input() backActive: boolean;
  @Input() showPerfilOptions: boolean = true;
  @Input() isModal: boolean = false;
  @Input() extraClass: string;

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  text: string;

  public popoverRef;
  public modalRef;
  private suscriptionPopover: Subscription;

  public user: any = null;

  constructor(
    public themeService: ThemeService,
    private popoverController: PopoverController,
    private eventService: EventService,
    private genericService: GenericService,
    public platform: Platform,
    private localStorageEncryptService: LocalStorageEncryptService,
    private modalCtrl: ModalController
  ) {
    //console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSessionConnectandem");
  }

  public ngOnInit(): void {
    this.suscriptionPopover = this.eventService.get("closePopover").subscribe((data) => {
      this.popoverRef.dismiss();
    });

    this.eventService.get("miEvento").subscribe((data)=>{
     //console.log(data);
      this.verOpciones({});
    });
  }

  public ngOnDestroy(): void {
    if (this.suscriptionPopover) {
      this.suscriptionPopover.unsubscribe();
    }
  }

  async verOpciones(ev: any) {
    this.popoverRef = await this.popoverController.create({
      component: OpcionesComponent,
      cssClass: 'popover-class',
      event: ev,
      //translucent: true
    });
    await this.popoverRef.present();

    const { role } = await this.popoverRef.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);
  }

  back() {
   //console.log("history back");
    
    window.history.back();
  }

  close(){
    this.closeModal.emit();
    this.modalCtrl.dismiss();
  }

  async openConfiguration(){
    this.modalRef = await this.modalCtrl.create({
      component: OpcionesComponent,
      cssClass: 'popover-class',
      animated: true,
    });
    await this.modalRef.present();

    const { role } = await this.modalRef.onDidDismiss();
  }
}
