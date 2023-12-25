import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'products',
    pathMatch : 'full'
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path:'login',
    loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path :'denied',
    component: AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
