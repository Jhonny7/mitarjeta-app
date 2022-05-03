import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUniversityPageRoutingModule } from './modal-university-routing.module';

import { ModalUniversityPage } from './modal-university.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUniversityPageRoutingModule
  ],
  declarations: [ModalUniversityPage]
})
export class ModalUniversityPageModule {}
