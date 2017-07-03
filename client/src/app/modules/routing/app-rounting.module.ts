import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component'
import { RegisterComponent } from '../../components/register/register.component'

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'register', component: RegisterComponent },
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