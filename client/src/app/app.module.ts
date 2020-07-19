import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { TimeSheetListPageComponent } from './time-sheet-list-page/time-sheet-list-page.component';
import { TimeSheetPageComponent } from './time-sheet-page/time-sheet-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './services/auth.guard';
import { EmployeeListPageComponent } from './employee-list-page/employee-list-page.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { EmployeeService } from './services/employee.service';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployeeComponent } from './employee/employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubdivisionListComponent } from './subdivision-list/subdivision-list.component';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { SelectListItemDialogComponent } from './select-list-item-dialog/select-list-item-dialog';
import { PageHeaderComponent } from './page-header/page-header.component';
import { DateDatepickerComponent } from './shared/components/date-datepicker/date-datepicker.component';

registerLocaleData(localeRu, 'ru', localeRuExtra);

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};


@NgModule(
  {
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TimeSheetListPageComponent,
    TimeSheetPageComponent,
    LoginPageComponent,
    AlertComponent,
    EmployeeListPageComponent,
    EmployeeListComponent,
    EmployeePageComponent,
    EmployeeComponent,
    SubdivisionListComponent,
    SelectListItemDialogComponent,
    PageHeaderComponent,
    DateDatepickerComponent
  ],
  entryComponents: [
    SubdivisionListComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    EmployeeService,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

