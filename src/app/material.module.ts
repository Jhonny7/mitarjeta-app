import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxDefaultOptions, MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports:[
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers:[
        //{provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions}
    ]
})
export class MaterialModule { }
  