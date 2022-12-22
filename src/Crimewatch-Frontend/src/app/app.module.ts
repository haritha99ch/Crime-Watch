import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReportIndexPageComponent } from "./report-pages/report-index-page/report-index-page.component";
import { CommonModule } from "@angular/common";
import { ReportListItemComponent } from './report-pages/report-list-item/report-list-item.component';

@NgModule({
    declarations: [AppComponent, ReportIndexPageComponent, ReportListItemComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
