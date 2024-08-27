import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home-page/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/edit-page/edit-page.module').then(
        (m) => m.EditPageModule,
      ),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./pages/add-page/add-page.module').then((m) => m.AddPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
