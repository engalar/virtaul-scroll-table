import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DemoMaterialModule} from "./material-module";
import {MatNativeDateModule} from "@angular/material";
import {ScDataTableComponent} from "./app/sc-data-table.component";
import {MyDirectiveDirective} from "./app/my-directive.directive";
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        DemoMaterialModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        ScrollingModule,
    ],
    entryComponents: [ScDataTableComponent],
    declarations: [ScDataTableComponent,
        MyDirectiveDirective],
    bootstrap: [ScDataTableComponent],
    providers: []
})
export class AppModule {
}