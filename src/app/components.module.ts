import { RecuperarPage } from './pages/home/recuperar/recuperar.page';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from 'src/app/material.module';
import { TabsPage } from './pages/home/tabs.page';
import { InitPage } from './pages/home/init/init.page';
import { IonicModule } from '@ionic/angular';
import { ScrollingCardsComponent } from './components/scrolling-cards/scrolling-cards';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { HeaderComponent } from './components/header/header';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TabsComponent } from './components/tabs/tabs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContainerComponent } from './components/container/container';
import { ContainerAppComponent } from './components/container-app/container-app';
import { AdministratorComponent } from './pages/administrador/administrator/administrator.component';
import { AdDirective } from './directives/ad.directive';
import { TriviaAdmonPage } from './pages/administrador/trivia-admon/trivia-admon.page';
import { GenericModalComponent } from './pages/administrador/generic-modal/generic-modal.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AboutComponent } from './pages/home/about/about.component';
import { InputFloatComponent } from './components/input-float/input-float';
import { ItemListAvatarComponent } from './components/item-list-avatar/item-list-avatar';
import { FabButton } from './components/fab-button/fab-button';
import { MapsComponent } from './components/maps/maps.component';
import { InputTandemComponent } from './components/input-tandem/input-tandem';
import { OlamButtonComponent } from './components/olam-button/olam-button';
import { GalleryUrlComponent } from './components/gallery-url/gallery.component';
import { OlamGoButtonComponent } from './components/olam-go-button/olam-go-button';
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        SpinnerOverlayComponent,
        SpinnerComponent,
        TabsComponent,
        TabsPage,
        InitPage,
        HeaderComponent,
        ContainerComponent,
        ContainerAppComponent,
        OpcionesComponent,
        ScrollingCardsComponent,
        AdministratorComponent,
        AdDirective,
        TriviaAdmonPage,
        GenericModalComponent,
        LoginComponent,
        RecuperarPage,
        AboutComponent,
        InputFloatComponent,
        ItemListAvatarComponent,
        FabButton,
        MapsComponent,
        InputTandemComponent,
        OlamButtonComponent,
        GalleryUrlComponent,
        OlamGoButtonComponent
    ],
    exports: [
        SpinnerOverlayComponent,
        SpinnerComponent,
        TabsComponent,
        TabsPage,
        InitPage,
        HeaderComponent,
        ContainerComponent,
        ContainerAppComponent,
        OpcionesComponent,
        ScrollingCardsComponent,
        AdministratorComponent,
        AdDirective,
        TriviaAdmonPage,
        GenericModalComponent,
        LoginComponent,
        RecuperarPage,
        AboutComponent,
        InputFloatComponent,
        ItemListAvatarComponent,
        FabButton,
        MapsComponent,
        InputTandemComponent,
        OlamButtonComponent,
        GalleryUrlComponent,
        OlamGoButtonComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        MaterialModule,
        CKEditorModule,
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [HttpClient]
                }
            }
        ),
    ]
})
export class ComponentsModule { }
