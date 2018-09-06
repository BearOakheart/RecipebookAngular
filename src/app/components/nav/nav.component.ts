import { Component } from "@angular/core";
import { Router } from "@angular/router";

// todo add auth service

@Component({
    selector: 'nav-menu',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {

    constructor(private router: Router){

    }

    // todo add neccessary actions.
    // add auth / if logged in logout & redirect home
    logout(){
        this.router.navigate(["home"]);
    }
}

