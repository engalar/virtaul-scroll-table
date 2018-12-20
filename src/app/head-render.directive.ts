import {Directive, OnInit, ViewContainerRef} from '@angular/core';
import {ScDataTableComponent} from "./sc-data-table.component";

@Directive({
    selector: '[appHeadRend]'
})
export class HeadRenderDirective implements OnInit {

    constructor(private _vc: ViewContainerRef, private c: ScDataTableComponent) {
    }

    private _getTpl(column) {
        let templateRef = this.c.tplMap.get(`${column.name}$header`);
        if (!templateRef) {
            templateRef = this.c.tplMap.get('$header');
        }
        return templateRef;
    }

    ngOnInit(): void {
        this.c.columns$.subscribe(columns => {
            this._vc.clear();
            columns.forEach(column => {
                this._vc.createEmbeddedView(this._getTpl(column), {column});
            });
        });
    }

}
