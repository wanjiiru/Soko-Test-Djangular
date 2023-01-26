import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtisansListComponent } from './artisans-list/artisans-list.component';
import { ArtisansComponent } from './artisans/artisans.component';

const routes: Routes = [
  { path: 'artisans/:id', component: ArtisansComponent },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: '',  pathMatch: 'full', component: ArtisansListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
