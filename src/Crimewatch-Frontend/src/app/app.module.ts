import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReportIndexPageComponent } from "./report-pages/report-index-page/report-index-page.component";
import { CommonModule, formatDate } from "@angular/common";
import { ReportListItemComponent } from "./report-pages/report-list-item/report-list-item.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ReportDetailsPageComponent } from "./report-pages/report-details-page/report-details-page.component";
import { ReportEvidenceItemComponent } from "./report-pages/report-evidence-item/report-evidence-item.component";
import { ReportDataFormComponent } from "./report-pages/report-data-form/report-data-form.component";
import { FormsModule, NgModel } from "@angular/forms";
import { ReportCreatePageComponent } from "./report-pages/report-create-page/report-create-page.component";
import { EvidenceCreateItemComponent } from './report-pages/evidence-create-item/evidence-create-item.component';
import { AccountCreatePageComponent } from './account-pages/account-create-page/account-create-page.component';
import { AccountSigninPageComponent } from './account-pages/account-signin-page/account-signin-page.component';

@NgModule({
    declarations: [
        AppComponent,
        ReportIndexPageComponent,
        ReportListItemComponent,
        ReportDetailsPageComponent,
        ReportEvidenceItemComponent,
        ReportDataFormComponent,
        ReportCreatePageComponent,
        EvidenceCreateItemComponent,
        AccountCreatePageComponent,
        AccountSigninPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        NgbModule,
        MatRippleModule,
        MatCardModule,
        MatProgressBarModule,
        MatGridListModule,
        MatChipsModule,
        MatIconModule,
        MatExpansionModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
