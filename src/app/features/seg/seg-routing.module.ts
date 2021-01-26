import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegMainMenuComponent } from './seg-layout/seg-main-menu/seg-main-menu.component';
import { SegSideNavMenuComponent } from './seg-layout/seg-side-nav-menu/seg-side-nav-menu.component';
import { OutletsByChannelComponent } from './components/outlets-by-channel/outlets-by-channel.component';
import { IndirectCostHeadersComponent } from './components/indirect-cost-headers/indirect-cost-headers.component';

const routes: Routes = [
  { path: 'index', component: SegMainMenuComponent },
  {
    path: 'home', component: SegSideNavMenuComponent, children: [
      { path: 'outletsByChannel', component: OutletsByChannelComponent },
      { path: 'indirectCostHeaders', component: IndirectCostHeadersComponent },
      // { path: '**', component: Page404RgmComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegRoutingModule { }
