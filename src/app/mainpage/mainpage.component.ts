import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent implements OnInit {
  
  isLogon:boolean;

  constructor(private auth: AuthService,
              private router: Router
    ) {
    
    }


  ngOnInit() {
    this.isLogon = this.auth.isAuthenticated();
    if (this.isLogon) {
      this.router.navigate(['/order/orders']);
    }else{
      this.router.navigate(['/auth/login']);
    }
    this.auth.authChanged.subscribe(
      (x) => {
        this.isLogon = x;
        if (this.isLogon) {
          this.router.navigate(['/order/orders']);
        }
      }
    );
  }


}
