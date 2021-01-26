import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { SegRoutingModule } from './seg-routing.module';
import { SegMainMenuComponent } from './seg-layout/seg-main-menu/seg-main-menu.component';
import { SegSideNavMenuComponent } from './seg-layout/seg-side-nav-menu/seg-side-nav-menu.component';
import { OutletsByChannelComponent } from './components/outlets-by-channel/outlets-by-channel.component';
import { IndirectCostHeadersComponent } from './components/indirect-cost-headers/indirect-cost-headers.component';

@NgModule({
  declarations: [
    SegMainMenuComponent,
    SegSideNavMenuComponent,
    OutletsByChannelComponent,
    IndirectCostHeadersComponent,
  ],
  imports: [
    CommonModule,
    SegRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class SegModule { }
