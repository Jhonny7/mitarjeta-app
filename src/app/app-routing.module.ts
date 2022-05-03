import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RootGuard } from './guards/root.guard';
import { AdministratorComponent } from './pages/administrador/administrator/administrator.component';
import { TriviaAdmonPage } from './pages/administrador/trivia-admon/trivia-admon.page';
import { AboutComponent } from './pages/home/about/about.component';
import { RecuperarPage } from './pages/home/recuperar/recuperar.page';
import { TabsPage } from './pages/home/tabs.page';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "inicio",
    pathMatch: "full"
  },
  {
    path: 'llamada',
    redirectTo: "inicio",
    pathMatch: "full"
  },
  {
    path: 'inicio',
    component: TabsPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'recuperar',
    children: [{
      path: ":id",
      component: RecuperarPage,
    }]
  }, 
  {
    path: "root",
    //canActivateChild: [RootGuard],
    children: [
      {
        path: 'administrador',
        component: TriviaAdmonPage
        //loadChildren: () => import('./pages/administrador/trivia-admon/trivia-admon.module').then( m => m.TriviaAdmonPageModule)
      }, {
        path: 'admon',
        component: AdministratorComponent
      },
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
