import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { RegisterComponent } from '../../components/register/register.component'
import { LoginComponent } from "../../components/login/login.component";
import { ProfileComponent } from "../../components/profile/profile.component";
import { AuthGuradService  } from '../../guards/auth.guard';
import { NoAuthGuradService  } from '../../guards/noauth.guard';


const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuradService]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [NoAuthGuradService]
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [NoAuthGuradService]
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuradService]
	},
	{ path: '**', component: HomeComponent }
]

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule],
	providers: [],
	bootstrap: []
})
export class AppRoutingModule { }