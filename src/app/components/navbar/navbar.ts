//These first 3 lines will be deprecated by the final release
import {Component} from "angular2/core";

import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";
import {AuthService} from '../../services/auth.service';


@Component({
    selector: 'navbar',
    directives: [ROUTER_DIRECTIVES],
    providers: [],
    pipes: [],
    template: `
    <nav class="navbar navbar-fixed-top navbar-dark bg-success navbar-static-top">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2">
            &#9776;
        </button>
        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
            <a style="color:black" class="navbar-brand" href="#">A2B4O2OM</a>
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <a [ngClass]="{active: page === 'public'}" class="nav-link" [routerLink]="['PublicPage']">Public</a>
                </li>
                <li class="nav-item">
                    <a [ngClass]="{active: page === 'protected'}" class="nav-link" [routerLink]="['ProtectedPage']">Protected</a>
                </li>
            </ul>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <a (click)="doLogin()" [ngClass]="{active: page === 'public'}" class="nav-link text-warning" href="#">Login</a>
                </li>
            </ul>
        </div>
    </nav>
    `
})
export class Navbar {
    constructor(private location:Location, private router:Router, public authService:AuthService) {
    }

    doLogin() {
        this.authService.doLogin();
    }

    doLogout() {
        this.authService.doLogout();
    }

    get page() {
        return this.location.path().split('/')[1];
    }
}

