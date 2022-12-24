import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountCreatePageComponent } from "./account-pages/account-create-page/account-create-page.component";
import { ReportCreatePageComponent } from "./report-pages/report-create-page/report-create-page.component";
import { ReportDetailsPageComponent } from "./report-pages/report-details-page/report-details-page.component";
import { ReportIndexPageComponent } from "./report-pages/report-index-page/report-index-page.component";

const routes: Routes = [
    { path: "", redirectTo: "Account/Create", pathMatch: "full" },
    { path: "Report/Index", component: ReportIndexPageComponent },
    { path: "Report/Create", component: ReportCreatePageComponent },
    { path: "Report/Details/:id", component: ReportDetailsPageComponent },
    { path: "Account/Create", component: AccountCreatePageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
