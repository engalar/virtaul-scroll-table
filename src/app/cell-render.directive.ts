import {Directive, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {ScDataTableComponent} from "./sc-data-table.component";

@Directive({
    selector: '[appCellRender]'
})
export class CellRenderDirective implements OnChanges, OnInit {
    @Input() appCellRender: any;

    constructor(private _vc: ViewContainerRef, private c: ScDataTableComponent) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('appCellRender')) {
            if (!changes.appCellRender.firstChange) {
                this._vc.clear();
            }
            this.c.columns.forEach(column => {
                this._vc.createEmbeddedView(this._getTpl(column), {row: this.appCellRender, column});
            });
        }
    }

    ngOnInit(): void {
        this.c.columns$.subscribe(columns => {
            this._vc.clear();
            columns.forEach(column => {
                this._vc.createEmbeddedView(this._getTpl(column), {row: this.appCellRender, column});
            });
        });
    }


    private _getTpl(column) {
        let templateRef = this.c.tplMap.get(`${column.name}$cell`);
        if (!templateRef) {
            templateRef = this.c.tplMap.get('$cell');
        }
        return templateRef;
    }
}
