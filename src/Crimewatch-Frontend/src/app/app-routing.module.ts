import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountCreatePageComponent } from "./account-pages/account-create-page/account-create-page.component";
import { AccountSigninPageComponent } from "./account-pages/account-signin-page/account-signin-page.component";
import { ReportCreatePageComponent } from "./report-pages/report-create-page/report-create-page.component";
import { ReportDetailsPageComponent } from "./report-pages/report-details-page/report-details-page.component";
import { ReportIndexPageComponent } from "./report-pages/report-index-page/report-index-page.component";

const routes: Routes = [
    { path: "", redirectTo: "Account/Signin", pathMatch: "full" },
    { path: "Report/Index", component: ReportIndexPageComponent },
    { path: "Report/Create", component: ReportCreatePageComponent },
    { path: "Report/Details/:id", component: ReportDetailsPageComponent },
    { path: "Account/Create", component: AccountCreatePageComponent },
    { path: "Account/Signin", component: AccountSigninPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
