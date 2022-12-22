import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportDetailsPageComponent } from "./report-pages/report-details-page/report-details-page.component";
import { ReportIndexPageComponent } from "./report-pages/report-index-page/report-index-page.component";

const routes: Routes = [
    { path: "", redirectTo: "Report/Index", pathMatch: "full" },
    { path: "Report/Index", component: ReportIndexPageComponent },
    { path: "Report/Details/:id", component: ReportDetailsPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
