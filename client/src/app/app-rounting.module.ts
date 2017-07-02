import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
	{ path: '', component: '' }
]

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(appRoutes)
	],
	exports: [RouterModule],
	providers: [],
	bootstrap: []
})
export class AppRoutingModule { }