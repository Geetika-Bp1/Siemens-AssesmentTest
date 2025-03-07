import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { User, Role } from './_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AssesmentTest';
  currentUser: User;
  constructor( private router: Router,
    private authenticationService: AuthenticationService){
      this.authenticationService.user.subscribe(x => this.currentUser = x);
    }
    get isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
    }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
  