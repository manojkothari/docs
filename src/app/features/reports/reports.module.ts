import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsMainMenuComponent } from './reports-layout/reports-main-menu/reports-main-menu.component';
import { ReportsSideNavMenuComponent } from './reports-layout/reports-side-nav-menu/reports-side-nav-menu.component';
import { TotalPlScenariosComponent } from './components/total-pl-scenarios/total-pl-scenarios.component';
import { ProfitNLossComponent } from './components/profit-nloss/profit-nloss.component';

@NgModule({
  declarations: [
    ReportsMainMenuComponent,
    ReportsSideNavMenuComponent,
    TotalPlScenariosComponent,
    ProfitNLossComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatSelectModule,
  ]
})
export class ReportsModule { }
