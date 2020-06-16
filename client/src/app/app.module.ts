import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { TimeSheetListPageComponent } from './time-sheet-list-page/time-sheet-list-page.component';
import { TimeSheetPageComponent } from './time-sheet-page/time-sheet-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TimeSheetListPageComponent,
    TimeSheetPageComponent,
    LoginPageComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }

