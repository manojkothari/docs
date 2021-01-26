import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RtmMainMenuComponent } from './rtm-layout/rtm-main-menu/rtm-main-menu.component';
import { RtmSideNavMenuComponent } from './rtm-layout/rtm-side-nav-menu/rtm-side-nav-menu.component';

const routes: Routes = [
  { path: 'index', component: RtmMainMenuComponent },
  {
    path: 'home', component: RtmSideNavMenuComponent, children: [
      // { path: 'route-type', component: RouteTypeComponent },
      // { path: '**', component: Page404RgmComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RtmRoutingModule { }
