import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DemoMaterialModule} from "./material-module";
import {MatNativeDateModule} from "@angular/material";
import {CdkVirtualScrollCustomStrategyExample} from "./app/cdk-virtual-scroll-custom-strategy-example";
import {MyDirectiveDirective} from "./app/my-directive.directive";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        DemoMaterialModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
    entryComponents: [CdkVirtualScrollCustomStrategyExample],
    declarations: [CdkVirtualScrollCustomStrategyExample,
        MyDirectiveDirective],
    bootstrap: [CdkVirtualScrollCustomStrategyExample],
    providers: []
})
export class AppModule {
}