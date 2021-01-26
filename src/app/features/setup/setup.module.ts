import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SetupRoutingModule } from './setup-routing.module';
import { SetupMainMenuComponent } from './setup-layout/setup-main-menu/setup-main-menu.component';
import { SetupSideNavMenuComponent } from './setup-layout/setup-side-nav-menu/setup-side-nav-menu.component';
import { BaseLineSetupComponent } from './components/base-line-setup/base-line-setup.component';
import { DialogBaseLineAddComponent } from './components/dialog-base-line-add/dialog-base-line-add.component';
import { SimulationSetupComponent } from './components/simulation-setup/simulation-setup.component';
import { DialogSimulationCopyComponent } from './components/dialog-simulation-copy/dialog-simulation-copy.component';


@NgModule({
  declarations: [
    SetupMainMenuComponent,
    SetupSideNavMenuComponent,
    BaseLineSetupComponent,
    DialogBaseLineAddComponent,
    SimulationSetupComponent,
    DialogSimulationCopyComponent,
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SetupModule { }
