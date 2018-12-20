import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DemoMaterialModule} from "./material-module";
import {MatNativeDateModule} from "@angular/material";
import {ScDataTableComponent} from "./app/sc-data-table.component";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { WrapperComponent } from './app/wrapper/wrapper.component';
import {ScDataTableTplDirective} from "./app/sc-data-table-tpl.directive";
import { HeadRenderDirective } from './app/head-render.directive';
import { CellRenderDirective } from './app/cell-render.directive';

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
    entryComponents: [WrapperComponent],
    declarations: [ScDataTableComponent,
        ScDataTableTplDirective,
        WrapperComponent,
        HeadRenderDirective,
        CellRenderDirective],
    bootstrap: [WrapperComponent],
    providers: []
})
export class AppModule {
}