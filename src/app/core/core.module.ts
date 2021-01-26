import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

import { LandingComponent } from './components/app-layout/landing/landing.component';
import { LayoutComponent } from './components/app-layout/layout/layout.component';
import { TopLeftNavMenuComponent } from './components/app-layout/header/top-left-nav-menu/top-left-nav-menu.component';
import { TopRightNavMenuComponent } from './components/app-layout/header/top-right-nav-menu/top-right-nav-menu.component';
import { FooterComponent } from './components/app-layout/footer/footer.component';
import { RightSideTreeComponent } from './components/app-layout/header/right-side-tree/right-side-tree.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

import { LandingService } from './services/landing.service';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification.service';
import { DropDownService } from './services/drop-down.service';


@NgModule({
  declarations: [
    LandingComponent,
    LayoutComponent,
    TopLeftNavMenuComponent,
    TopRightNavMenuComponent,
    FooterComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    RightSideTreeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 1000,
      positionClass: 'toast-top-right',
      // progressBar: true
    }),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ModalModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [
    StorageService,
    LandingService,
    NotificationService,
    DropDownService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. You should only import Core modules in the AppModule only.'
      );
    }
  }
}
