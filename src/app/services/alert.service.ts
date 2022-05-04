import { ThemeService } from 'src/app/services/theme.service';
//import { TranslateService } from '@ngx-translate/core';
import { Injectable, HostListener } from "@angular/core";
import swal, { SweetAlertOptions } from "sweetalert2";
import { PlatformLocation } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class AlertService {

  constructor(
    private location: PlatformLocation,
    private translateService: TranslateService,
    public themeService: ThemeService
  ) {
    location.onPopState(() => {
      swal.close();
    });
  }

  customizeAlert(data: any, accion: any = null, cancelAction: any = null) {
    swal.fire(data).then(result => {
      //console.log(result);

      if (result.isConfirmed) {
        if (accion) {
          accion();
        }
      } else {
        if (cancelAction) {
          cancelAction();
        }
      }
    });
  }

  warnAlert(titulo: string, mensaje: string, accion: any = null) {
    let dataAlert: any = {
      type: null,
      title: null,
      text: null,
      confirmButtonText: "Aceptar",
      showCancelButton: false,
      showCloseButton: true,
      allowOutsideClick: false,
      customClass: "alerta-vista-warn"
    };

    dataAlert.html = `
          
          <div class="contenedor-imagen warn-a"> 
          </div>
    
          <div class="mensaje">
            <p>${titulo}</p>
          </div>
    
          <div class="descripcion">
            <p>${mensaje}</p>
          </div>
          `;
    dataAlert.funcion = () => { };

    swal.fire(dataAlert).then(result => {
      if (result.value) {
        if (accion) {
          accion();
        }
      }
    });
  }

  errorAlert(titulo: string, mensaje: string, accion: any = null) {
    let dataAlert: any = {
      type: null,
      title: null,
      text: null,
      confirmButtonText: "Aceptar",
      showCancelButton: false,
      showCloseButton: true,
      allowOutsideClick: false,
      customClass: "alerta-vista-error"
    };

    dataAlert.html = `
          
          <div class="contenedor-imagen error-a"> 
          </div>
    
          <div class="mensaje">
            <p>${titulo}</p>
          </div>
    
          <div class="descripcion">
            <p>${mensaje}</p>
          </div>
          `;
    dataAlert.funcion = () => { };

    swal.fire(dataAlert).then(result => {
      if (result.value) {
        if (accion) {
          accion();
        }
      }
    });
  }

  bottomModals(titulo: string, mensaje: string, accion: any = null, cssClass: string = "olam-alert") {
    let dataAlert: any = {
      type: null,
      title: null,
      text: null,
      confirmButtonText: this.translateService.instant("alerts.accept"),
      showCancelButton: false,
      showCloseButton: true,
      allowOutsideClick: true,
      customClass: `${cssClass} ${this.themeService.getThemeData().alert_class}`,
      showClass: {
        popup: 'animated bounceInUp'
      },
      hideClass: {
        popup: 'animated bounceOutDown'
      }
    };

    dataAlert.html = `
          
          <div class="contenedor-imagen success-a"> 
          </div>
    
          <div class="mensaje">
            <p>${titulo}</p>
          </div>
    
          <div class="descripcion">
            <p>${mensaje}</p>
          </div>
          `;
    dataAlert.funcion = () => { };

    swal.fire(dataAlert).then(result => {
      if (result.value) {
        if (accion) {
          accion();
        }
      }
    });
  }

  successAlert(titulo: string, mensaje: string, accion: any = null, cssClass: string = "olam-alert") {
    let dataAlert: any = {
      type: null,
      title: null,
      text: null,
      confirmButtonText: this.translateService.instant("alerts.accept"),
      showCancelButton: false,
      showCloseButton: true,
      allowOutsideClick: true,
      customClass: `${cssClass} ${this.themeService.getThemeData().alert_class}`,
      showClass: {
        popup: 'animated bounceInUp'
      },
      hideClass: {
        popup: 'animated bounceOutDown'
      }
    };

    dataAlert.html = `
          
          <div class="contenedor-imagen success-a"> 
          </div>
    
          <div class="mensaje">
            <p>${titulo}</p>
          </div>
    
          <div class="descripcion">
            <p>${mensaje}</p>
          </div>
          `;
    dataAlert.funcion = () => { };

    swal.fire(dataAlert).then(result => {
      if (result.value) {
        if (accion) {
          accion();
        }
      }
    });
  }

  confirmWithButtons(titulo: string, accion: any = null, accionCancel: any = null, cssClass: string = "olam-alert") {
    let dataAlert: any = {
      type: null,
      title: null,
      text: null,
      confirmButtonText: this.translateService.instant("alerts.accept"),
      showCancelButton: false,
      showCloseButton: true,
      allowOutsideClick: true,
      customClass: `${cssClass} ${this.themeService.getThemeData().alert_class}`,
      showClass: {
        popup: 'animated bounceInUp'
      },
      hideClass: {
        popup: 'animated bounceOutDown'
      }
    };

    dataAlert.html = `
          <div class="mensaje">
            <p>${titulo}</p>
          </div>
          `;
    dataAlert.funcion = () => { };

    swal.fire(dataAlert).then(result => {
      if (result.value) {
        if (accion) {
          accion();
        }
      }
    });
  }

  confirmTrashAlert(accion: any = null, titulo: string = "", mensaje: string = "", buttonTitle: string = "", cssClass: string = "alerta-vista") {
    let dataAlert: any = {
      type: null,
      title: null,
      text: null,
      confirmButtonText: buttonTitle,
      showCancelButton: true,
      showCloseButton: true,
      allowOutsideClick: false,
      customClass: `${cssClass} trash`
    };

    dataAlert.html = `
          
          <div class="contenedor-imagen trash-a"> 
          </div>
    
          <div class="mensaje">
            <p>${titulo}</p>
          </div>
    
          <div class="descripcion">
            <p>${mensaje}</p>
          </div>
          `;
    dataAlert.funcion = () => { };

    swal.fire(dataAlert).then(result => {
      if (result.value) {
        if (accion) {
          accion();
        }
      }
    });
  }

  alertWithInputs(accion: any = null, titulo: string = "", mensaje: string = "", confirmButtonText: string = "Aceptar", placeholder: string = "Email") {
    let dataAlert: any = {
      type: null,
      title: null,
      text: null,
      confirmButtonText: confirmButtonText,
      showCancelButton: false,
      showCloseButton: true,
      allowOutsideClick: false,
      customClass: "alerta-vista-warn"
    };

    dataAlert.html = `
          
          <div class="contenedor-imagen warn-a"> 
          </div>
    
          <div class="mensaje">
            <p>${titulo}</p>
          </div>
    
          <div class="descripcion">
            <p>${mensaje}</p>
          </div>

          <div>
            <input type="text" id="em" placeholder="${placeholder}"/>
          </div>
          `;
    dataAlert.funcion = () => { };
    dataAlert.preConfirm = () => {
      let valor: any = document.getElementById("em");
      if (valor.value.length <= 0) {
        valor.style.border = "1px solid #ec0000";
        return false;
      } else {
        valor.style.border = "1px solid #cacaca";

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isEmail = re.test(String(valor.value).toLowerCase());
        if (isEmail) {
          valor.style.border = "1px solid #cacaca";
          return true;
        } else {
          valor.style.border = "1px solid #ec0000";
          return false;
        }

      }
    }
    swal.fire(dataAlert).then(result => {
      let valor: any = document.getElementById("em");
      if (result.value) {
        if (accion) {
          accion(valor.value);
        }
      }
    });
  }

  custom(html: string) {
    let dataAlert: any = {
      type: null,
      title: null,
      text: null,
      showCancelButton: false,
      showCloseButton: true,
      allowOutsideClick: false,
      customClass: "alerta-vista"
    };

    dataAlert.html = html;
    dataAlert.funcion = () => { };

    swal.fire(dataAlert).then(result => {

    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    ////console.log("back?");

    swal.close();
  }
}
