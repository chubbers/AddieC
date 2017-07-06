import { Component } from '@angular/core';
import { UserService } from '../user/userShared/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavComponent {
    userLoggedIn: boolean = false;
    loggedIn: string;

    constructor(private userSVC: UserService, private router: Router) { 
        this.userLoggedIn = userSVC.userLoggedIn;

        if (userSVC.userLoggedIn) {
            this.loggedIn = userSVC.loggedInUser;
        } else {
            this.loggedIn = "Login";
        }
    }

    logout() {
        this.userSVC.logout();
        location.reload();
    }
}