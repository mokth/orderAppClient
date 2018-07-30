import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareservicesService } from './shared/shareservices.service';
import { AuthService } from './shared/auth.service';
import { config } from './config';

import { PassDataService } from './shared/passdata-service';
import { AuthguardService } from './shared/AuthguardService';
import { CanDeactivateGuard } from './shared/CanDeactivateGuard';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SharedModule } from './shared/SharedModule';


// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { environment } from '../environments/environment';

//import { SubscriptSevService } from './shared/subscript-sev.service';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent
    
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule ,
    FontAwesomeModule,
    AppRoutingModule,
    SharedModule,   
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    ShareservicesService,
    AuthService,
    AuthguardService,
    CanDeactivateGuard,  
    PassDataService,
    {provide:'BASE_PATH',useValue: config.baseURL},
    {provide:'API_URL',useValue: config.apiUrl},
    {provide:'IMG_URL',useValue: config.imagepath},
    {provide:'ORD_URL',useValue: config.orderUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
