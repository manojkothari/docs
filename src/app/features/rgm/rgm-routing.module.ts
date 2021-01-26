import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RgmMainMenuComponent } from './rgm-layout/rgm-main-menu/rgm-main-menu.component';
import { RgmSideNavMenuComponent } from './rgm-layout/rgm-side-nav-menu/rgm-side-nav-menu.component';
import { OutletComponent } from './components/outlet/outlet.component';
import { RgmCategoryComponent } from './components/rgm-category/rgm-category.component';
import { RgmChannelComponent } from './components/rgm-channel/rgm-channel.component';
import { RgmPackageComponent } from './components/rgm-package/rgm-package.component';
import { UpStreamComponent } from './components/up-stream/up-stream.component';

const routes: Routes = [
  { path: 'index', component: RgmMainMenuComponent },
  {
    path: '', component: RgmSideNavMenuComponent, children: [
      { path: 'brand-category', component: RgmCategoryComponent },
      { path: 'rgm-channel', component: RgmChannelComponent },
      { path: 'outlet', component: OutletComponent },
      { path: 'rgm-package', component: RgmPackageComponent },
      { path: 'upstream/:upStreamType', component: UpStreamComponent },
      // { path: '**', component: Page404RgmComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RgmRoutingModule { }
