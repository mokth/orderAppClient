import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';
  faBars=faBars;
  constructor(private auth:AuthService,
              public translate: TranslateService,  
              @Inject('IMG_URL') public imgUrl:string) {
                translate.use('en');
                
    }

   ngOnInit() {
  }
  
  isLogin(){
    return this.auth.isAuthenticated();
  }

  logOut(){
    console.log('log oit');
    this.auth.logOut();
  }

  onLang(lang:string){
    this.translate.use(lang);
  }
}
