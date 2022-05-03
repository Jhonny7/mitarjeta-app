import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUniversityPage } from './modal-university.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUniversityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUniversityPageRoutingModule {}
