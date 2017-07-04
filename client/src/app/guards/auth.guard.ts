import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuradService implements CanActivate {

	redirectUrl;

	constructor(private authService: AuthService, private router: Router) { }

	canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.loggedIn()) {
			return true;
		} else {
			// das aktuelle ziel des users speichern
			// kann von komponenten genutzt werden um eine umleitung vorzunhemen
			this.redirectUrl = state.url;
			this.router.navigate(['/login']);
			return false;
		}
	}

}
