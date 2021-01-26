import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupMainMenuComponent } from './setup-layout/setup-main-menu/setup-main-menu.component';
import { SetupSideNavMenuComponent } from './setup-layout/setup-side-nav-menu/setup-side-nav-menu.component';
import { BaseLineSetupComponent } from './components/base-line-setup/base-line-setup.component';
import { SimulationSetupComponent } from './components/simulation-setup/simulation-setup.component';

const routes: Routes = [
  { path: 'index', component: SetupMainMenuComponent },
  {
    path: '', component: SetupSideNavMenuComponent, children: [
      { path: 'baseline-setup', component: BaseLineSetupComponent },
      { path: 'simulation-setup', component: SimulationSetupComponent },
      // { path: '**', component: Page404RgmComponent }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
