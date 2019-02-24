import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NotepageComponent } from "./notepage/notepage.component";
import { HomeComponent } from "./home/home.component";
import { ExtractPageComponent } from "./extract-page/extract-page.component";
import { DisplayPageComponent } from "./display-page/display-page.component";
import { DbDemoComponent } from "./db-demo/db-demo.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { TextAnalyticsTestComponent } from './text-analytics-test/text-analytics-test.component'

const routes: Routes = [
    { path: "", redirectTo: "/home-page", pathMatch: "full" },
    { path: "text-analytics-test", component: TextAnalyticsTestComponent},
    { path: "home-page", component: HomePageComponent},
    { path: "extract_page", component: ExtractPageComponent},
    { path: "notepage", component: NotepageComponent},
    { path: "notepage/:id", component: NotepageComponent},
    { path: "display_page/:id", component: DisplayPageComponent},
    { path: "db-demo", component: DbDemoComponent},
    { path: "home", component: HomeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
