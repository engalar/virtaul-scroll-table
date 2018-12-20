import {Directive, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {ScDataTableComponent} from "./sc-data-table.component";

@Directive({
    selector: '[appMyDirective]'
})
export class MyDirectiveDirective implements OnChanges, OnInit {
    @Input() appMyDirective: any;
    @Input('appMyDirectiveColumns') columns: any[];

    constructor(private _vc: ViewContainerRef, private c: ScDataTableComponent) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('appMyDirective')) {
            if (!changes.appMyDirective.firstChange) {
                this._vc.clear();
            }
            this.c.columns.forEach(value => {
                this._vc.createEmbeddedView(this.c.colC, {$implicit: this.appMyDirective[value.name]});
            });
        }
    }

    ngOnInit(): void {
        this.c.columns$.subscribe(columns => {
            this._vc.clear();
            columns.forEach(column => {
                this._vc.createEmbeddedView(this.c.colC, {$implicit: this.appMyDirective[column.name], column});
            });
        });
    }

}