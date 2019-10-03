import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogPageComponent } from './pages/logs/log-page.component';

const routes: Routes = [
  {
    path: '',
    component: LogPageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
