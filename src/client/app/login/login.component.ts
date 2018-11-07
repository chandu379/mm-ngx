import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { UserDetails } from '../shared/database/user-details';
import { SecurityService } from '../shared/services/security.service';
/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'mm-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {

  user: UserDetails;
  error: string;

  constructor(
      private loginService: LoginService,
      private router: Router,
      private securityService: SecurityService
  ) { }

  login(email: string, password: string) {
    this.loginService.login(email, password)
    .subscribe(res => {
      if(!res) { this.error = 'Email ID or password incorrect';
    } else {
      console.log('id is: ', res);
      this.securityService.setLoginStatus(true);
      this.securityService.setUser(res.user);
      this.securityService.setToken(res.token);
      this.router.navigate([`/chat/${res.user.id}`]);
    }
    });
  }
 }
