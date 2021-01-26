import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule
} from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#0e68aa',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 70,
  bgsType: 'ball-scale-multiple',
  blur: 1,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#0e68aa',
  fgsPosition: 'center-center',
  fgsSize: 70,
  fgsType: 'ball-scale-multiple',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(255,255,255,0.71)',
  pbColor: '#0e68aa',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
};

const ngxUiLoaderHttpConfig: NgxUiLoaderHttpConfig = {
  showForeground: false
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot(ngxUiLoaderHttpConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
