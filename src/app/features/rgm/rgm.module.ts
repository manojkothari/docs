import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { RgmRoutingModule } from './rgm-routing.module';
import { RgmMainMenuComponent } from './rgm-layout/rgm-main-menu/rgm-main-menu.component';
import { RgmSideNavMenuComponent } from './rgm-layout/rgm-side-nav-menu/rgm-side-nav-menu.component';
import { RgmCategoryComponent } from './components/rgm-category/rgm-category.component';
import { RgmChannelComponent } from './components/rgm-channel/rgm-channel.component';
import { OutletComponent } from './components/outlet/outlet.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RgmPackageComponent } from './components/rgm-package/rgm-package.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UpStreamComponent } from './components/up-stream/up-stream.component';

@NgModule({
  declarations: [
    RgmMainMenuComponent,
    RgmSideNavMenuComponent,
    RgmCategoryComponent,
    RgmChannelComponent,
    OutletComponent,
    RgmPackageComponent,
    UpStreamComponent,
  ],
  imports: [
    CommonModule,
    RgmRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ButtonModule,
    TableModule
  ],
  providers: []
})
export class RgmModule { }
