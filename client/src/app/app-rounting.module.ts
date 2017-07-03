import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './component/home/home.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent }
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