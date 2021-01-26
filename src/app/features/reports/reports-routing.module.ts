import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalPlScenariosComponent } from './components/total-pl-scenarios/total-pl-scenarios.component';
import { ProfitNLossComponent } from './components/profit-nloss/profit-nloss.component';
import { ReportsMainMenuComponent } from './reports-layout/reports-main-menu/reports-main-menu.component';
import { ReportsSideNavMenuComponent } from './reports-layout/reports-side-nav-menu/reports-side-nav-menu.component';

const routes: Routes = [
  { path: 'index', component: ReportsMainMenuComponent },
  {
    path: '', component: ReportsSideNavMenuComponent, children: [
      { path: 'total-Pl-Scenerios', component: TotalPlScenariosComponent },
      { path: 'pnl', component: ProfitNLossComponent },
      // { path: '**', component: Page404RgmComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
