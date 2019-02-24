import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NotepageComponent } from './notepage/notepage.component';
import { HomeComponent } from "./home/home.component";
import { ExtractPageComponent } from './extract-page/extract-page.component';
import { DisplayPageComponent } from './display-page/display-page.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { DbDemoComponent } from './db-demo/db-demo.component';


import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { DatePipe } from "@angular/common";
import { HomePageComponent } from './home-page/home-page.component';
import { CalendarComponent } from './calendar/calendar.component';

import { HttpModule } from '@angular/http';
import { TextAnalyticsTestComponent } from './text-analytics-test/text-analytics-test.component'
import {NativeScriptHttpModule} from 'nativescript-angular/http';
import { TextService } from "./azure-service/text.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        NativeScriptUICalendarModule,
        TNSFontIconModule.forRoot({
            'fa': './assets/font-awesome.css',
            'ion': './assets/ionicons.css'
        }),
        HttpModule,
        NativeScriptHttpModule,
    ],
    declarations: [
        AppComponent,
        NotepageComponent,
        HomeComponent,
        ExtractPageComponent,
        DisplayPageComponent,
        DbDemoComponent,
        HomePageComponent,
        CalendarComponent,
        TextAnalyticsTestComponent,
    ],
    providers: [
        DatePipe,
        TextService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
