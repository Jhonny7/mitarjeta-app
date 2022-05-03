import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '../../../services/loading-service';
import { GenericService } from '../../../services/generic.service';
import { remastered } from '../../../../environments/environment.prod';
import { LocalStorageEncryptService } from '../../../services/local-storage-encrypt.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment.prod';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { idEmpresa } from '../../../../environments/environment.prod';
import { SqlGenericService } from '../../../services/sqlGenericService';
import { HttpErrorResponse } from '@angular/common/http';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
/* import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual, Zoom, Autoplay, Thumbs, Controller
} from 'swiper/core';
 */

@Component({
  selector: 'app-init',
  templateUrl: 'init.page.html',
  styleUrls: ['init.page.scss']
})
export class InitPage implements OnInit, OnDestroy {

  @Input() data: any;


  public config: SwiperConfigInterface = {
    loop: true,
    initialSlide: 0, //this one accept a number according to docs
    slidesPerView: 1, //number or 'auto'
    slidesPerColumn: 1, //number

    slidesPerGroup: 1,
    spaceBetween: 15,
    preloadImages: false,
    navigation: {
      nextEl: '.btn-right',
      prevEl: '.btn-left',
    },
    autoplay: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 50
      },
      350: {
        slidesPerView: 1.1,
        spaceBetween: 50
      },
      450: {
        slidesPerView: 1.2,
        spaceBetween: 50
      },
      550: {
        slidesPerView: 1.5,
        spaceBetween: 50
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      740: {
        slidesPerView: 2.2,
        spaceBetween: 40
      },
      840: {
        slidesPerView: 2.5,
        spaceBetween: 40
      },
      980: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1020: {
        slidesPerView: 3.2,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 3.4,
        spaceBetween: 40
      },
    }
  };

  public ase: Array<any> = [
    { text: "hola" },
    { text: "hola2" },
    { text: "hola3" }
  ];

  public temas: any[] = [];

  public categorias: any[] = [];

  public btns: any = [{
    text: "home.contratar"
  }, {
    text: "home.buscar"
  }];

  public suscription: Subscription;

  public imgUrl: any = environment.getImagenIndividual;

  public temaGlobal: any = 0;

  public sus: Subscription = null;

  public user: any = null;

  public secciones: any = [
    {
      icon: "groups",
      title: "home.meet",
      path: "reuniones"
    }, {
      icon: "manage_accounts",
      title: "home.profile",
      path: "perfil"
    }, {
      icon: "safety_divider",
      title: "home.schedule",
      path: "meeting"
    }, {
      icon: "mark_unread_chat_alt",
      title: "home.match",
      path: "match"
    },
  ];

  constructor(
    private sqlGenericService: SqlGenericService,
    public themeService: ThemeService,
    private router: Router,
    private eventService: EventService,
    private alertService: AlertService,
    private localStorageEncryptService: LocalStorageEncryptService,
    private menu: MenuController,
    public genericService: GenericService,
    private loadingService: LoaderService,
    private translateService: TranslateService,
    private navCtrl: NavController
  ) {

    this.menu.enable(true);
    //console.log("------------------------tab 1---------------------");
    if (remastered) {
      this.secciones.push({
        path: "examen",
        icon: "assets/imgs/home/examenes.png",
        id: 5,
        notNeedSubject: true
      });
    }
    this.user = this.localStorageEncryptService.getFromLocalStorage("userSessionConnectandem");
  }

  ngOnInit() {
    this.sus = this.eventService.get("menu").subscribe((data) => {
      this.goPage(data);
    });
    //console.log(this.data);
    if (this.data.reload) {
      this.cargarCategorias();
    }
    this.translateService.get('home.meet').subscribe((translated: string) => {

    });

    console.log(this.translateService.instant("home.meet"));
    this.getUserUpdate();
  }

  getUserUpdate() {
    let sql: string = `SELECT * FROM usuario WHERE id = ${this.user.id}`;
    this.sqlGenericService.excecuteQueryStringReference(sql, "updateUserStorage").subscribe((response: any) => {
      this.user = response.parameters[0];
      localStorage.setItem("userSessionConnectandem", JSON.stringify(this.user));
    }, (error: HttpErrorResponse) => {

    });
  }

  ngOnDestroy() {
    this.sus.unsubscribe();
  }

  select() {
    this.localStorageEncryptService.setToLocalStorage("temaGlobal", this.temaGlobal);
  }

  cargarCategorias() {
    let sql: string = `SELECT * FROM catalogo WHERE id_empresa = ${idEmpresa} and id_tipo_catalogo = 26 ORDER BY RAND()`;
    this.sqlGenericService.excecuteQueryString(sql).subscribe((response: any) => {
      //console.log(response);
      this.categorias = response.parameters;
    }, (error: HttpErrorResponse) => {

    });
  }

  onSwiper(swiper) {
    //console.log(swiper);
  }

  onSlideChange() {
    //console.log('slide change');
  }

  go(itm) {
    if (itm.path == "match" && this.user.penalizaciones_json != null && this.user.penalizaciones_json.length > 0) {

    }
    //this.router.navigate([itm.path]);
    //this.navCtrl.navigateForward(itm.path);

    this.alertService.successAlert("jemplo", "Ejemplor", () => {

    })
  }



  goPage(itm) {
    let temaID: any = this.localStorageEncryptService.getFromLocalStorage("temaGlobal");
    if (itm.notNeedSubject) {
      this.router.navigate(["/", itm.path])
    } else {
      //console.log("-----------------------");

      //console.log(this.temaGlobal);

      if (this.temaGlobal) {
        this.localStorageEncryptService.setToLocalStorage("temaGlobal", this.temaGlobal);
        if (itm.isTab) {
          this.eventService.send("tabChange", itm.id);
        } else {
          this.router.navigate(["/", itm.path]);
          //this.router.navigateByUrl(itm.path);
          window.open(`/${itm.path}`, "_self");
        }
      } else {
        this.alertService.warnAlert("Espera!", "Antes de continuar debes seleccionar un tema");
      }
    }
  }

}
