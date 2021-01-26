import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './core/components/app-layout/landing/landing.component';
import { LayoutComponent } from './core/components/app-layout/layout/layout.component';
import { ErrorPageComponent } from './core/components/error-page/error-page.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'setup',
    component: LayoutComponent,
    loadChildren: () => import('./features/setup/setup.module').then((m) => m.SetupModule),
  },
  {
    path: 'rgm',
    component: LayoutComponent,
    loadChildren: () => import('./features/rgm/rgm.module').then((m) => m.RgmModule),
  },
  {
    path: 'seg',
    component: LayoutComponent,
    loadChildren: () => import('./features/seg/seg.module').then((m) => m.SegModule),
  },
  {
    path: 'red',
    component: LayoutComponent,
    loadChildren: () => import('./features/red/red.module').then((m) => m.RedModule),
  },
  {
    path: 'rtm',
    component: LayoutComponent,
    loadChildren: () => import('./features/rtm/rtm.module').then((m) => m.RtmModule),
  },
  {
    path: 'reports',
    component: LayoutComponent,
    loadChildren: () => import('./features/reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'error/:code',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
