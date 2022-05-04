import { environment, themeData } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { LocalStorageEncryptService } from './local-storage-encrypt.service';

export const TIME_OUT = 1000 * 60 * 1; //ultimo número define en minutos
/**Clase provider que es básicamente un servicio generico para las peticiones a servicios */
@Injectable(
    {
        providedIn: "root"
    }
)
export class ThemeService {

    constructor(
        private localStorageEncryptService: LocalStorageEncryptService) {
    }

    //For themes
    getColorPrimary() {
        let color: any = this.localStorageEncryptService.getFromLocalStorage("primary");
        return color;
    }

    getColorHex() {
        let color: any = this.localStorageEncryptService.getFromLocalStorage("theme");
        //console.log(color);
        if(color == "#FFFFFF"){
            color = "#006480";
        }
        return color;
    }

    getColorHexButtons() {
        let color: any = this.localStorageEncryptService.getFromLocalStorage("theme");

        return color = color != "#FFFFFF" ? color : "#29b8e1";
    }

    getThemeClass() {
        let color: any = this.localStorageEncryptService.getFromLocalStorage("themeClass");
        return color;
    }

    getTheme(key:string){
        return themeData[key];
    }

    getThemeData(){
        let color: any = this.localStorageEncryptService.getFromLocalStorage("theme");
        //console.log(color);
        
        if(!color){
            color = "blue";
        }
        return themeData[color];
    }
}