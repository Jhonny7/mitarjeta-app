import { ThemeService } from 'src/app/services/theme.service';
import { AlertService } from './../../services/alert.service';
import { PopoverController } from '@ionic/angular';
import { EventService } from './../../services/event.service';
import { Router } from '@angular/router';
import { LocalStorageEncryptService } from './../../services/local-storage-encrypt.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss'],
})
export class OpcionesComponent implements OnInit {

  public themes: any[] = [
    {
      id: 1,
      theme: "blue",
    },
    {
      id: 2,
      theme: "green",
    },
    {
      id: 3,
      theme: "red",
    },
    {
      id: 4,
      theme: "purple",
    },
    {
      id: 5,
      theme: "pink",
    },
    {
      id: 6,
      theme: "black",
    },
  ];

  public languages: any[] = [{
    id: 1,
    language: "es",
    icon: "assets/imgs/languages/espana.png"
  }, {
    id: 2,
    language: "en",
    icon: "assets/imgs/languages/reino-unido.png"
  },{
    id: 3,
    language: "de",
    icon: "assets/imgs/languages/alemania.png"
  },{
    id: 4,
    language: "ja",
    icon: "assets/imgs/languages/japon.png"
  },{
    id: 5,
    language: "zh",
    icon: "assets/imgs/languages/porcelana.png"
  },];

  public optionPanes: any[] = [
    /* {
    title: 'options.favorites',
    icon: "star-outline",
    action: ()=>{
      this.eventService.send("closePopover",{});
      this.router.navigate(["/","favorites"]);
    }
  }, */
  ];

  constructor(
    private translateService: TranslateService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private router: Router,
    private eventService: EventService,
    private popoverController: PopoverController,
    private alertService: AlertService,
    public themeService: ThemeService
  ) { }

  ngOnInit() { }

  changeTheme(theme: any) {
    this.localStorageEncryptService.setToLocalStorage("theme", theme.theme);
    this.localStorageEncryptService.setToLocalStorage("themeClass", theme.theme);
  }

  changeLanguage(language: any) {
    this.localStorageEncryptService.setToLocalStorage("language", language.language);
    this.translateService.setDefaultLang(language.language);
    this.translateService.use(language.language);

    this.eventService.send("translate", null);
  }

  cerrarSesion() {
    this.popoverController.dismiss();
    this.alertService.confirmTrashAlert(() => {
      this.localStorageEncryptService.clearProperty("userSessionConnectandem");
      this.router.navigate(["/", "login"]);
    }, this.translateService.instant("confirm"), this.translateService.instant("close-sesion"), this.translateService.instant("alerts.accept"));
  }

  goToProfile() {
    this.popoverController.dismiss();
    this.router.navigate(["perfil"]);
  }

}
