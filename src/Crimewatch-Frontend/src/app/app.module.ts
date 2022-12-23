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

import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRippleModule } from "@angular/material/core";
import { ReportDetailsPageComponent } from "./report-pages/report-details-page/report-details-page.component";
import { ReportEvidenceItemComponent } from "./report-pages/report-evidence-item/report-evidence-item.component";

@NgModule({
    declarations: [
        AppComponent,
        ReportIndexPageComponent,
        ReportListItemComponent,
        ReportDetailsPageComponent,
        ReportEvidenceItemComponent,
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
