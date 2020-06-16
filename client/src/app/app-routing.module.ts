import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { TimeSheetListPageComponent } from './time-sheet-list-page/time-sheet-list-page.component';
import { TimeSheetPageComponent } from './time-sheet-page/time-sheet-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch:'full'},
      {path: '', component: TimeSheetListPageComponent},
      {path: 'time-sheet/:id', component: TimeSheetPageComponent},
      {path: 'login', component: LoginPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
