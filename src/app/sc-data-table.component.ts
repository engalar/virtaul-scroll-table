import {
    CdkVirtualForOf, CdkVirtualScrollViewport,
    FixedSizeVirtualScrollStrategy,
    VIRTUAL_SCROLL_STRATEGY
} from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {Platform} from "@angular/cdk/platform";
import {BehaviorSubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(34, 250, 500);
    }
}

@Component({
    selector: 'sc-data-table',
    styleUrls: ['sc-data-table.component.scss'],
    templateUrl: 'sc-data-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})
export class ScDataTableComponent implements AfterViewInit, OnInit, OnDestroy {

    @ViewChild('resizeHelper') resizeHelperViewChild: ElementRef;

    @ViewChild('colC') colC: TemplateRef<any>;

    @ViewChild(CdkVirtualForOf) cdkVirtualForOf: CdkVirtualForOf<any>;
    @ViewChild(CdkVirtualScrollViewport) scrollableBody: CdkVirtualScrollViewport;

    private _destroyed = new Subject();
    columns$: BehaviorSubject<any>;
    items: any[];

    columns = [
        {name: 'a', width: 300},
        {name: 'b', width: 300},
        {name: 'c', width: 300},
        {name: 'd', width: 300},
        {name: 'e', width: 300},
        {name: 'f', width: 300},
    ];
    tableWidth: number;
    private headerMarginLeft = 0;

    constructor(private _platform: Platform, private _cd: ChangeDetectorRef) {
        this.columns$ = new BehaviorSubject(this.columns);
        let rownum = 50;
        if (_platform.BLINK) {
            rownum = 95;
        } else if (_platform.TRIDENT) {
            rownum = 50;
        } else if (_platform.FIREFOX) {
            rownum = 26;
        } else if (_platform.EDGE) {
            rownum = 50;
        } else {
            rownum = 50;
        }
        this.items = Array.from({length: 10000 * rownum}).map((_, i) => {
            return {
                a: `#${i} ${Math.random()}`,
                b: `#${i} ${Math.random()}`,
                c: `#${i} ${Math.random()}`,
                d: `#${i} ${Math.random()}`,
                e: `#${i} ${Math.random()}`,
                f: `#${i} ${Math.random()}`,
            };
        });
    }

    ngAfterViewInit(): void {
        this.scrollableBody.elementScrolled().pipe(
            takeUntil(this._destroyed),
        ).subscribe(value => {
            this.headerMarginLeft = -value.srcElement.scrollLeft;
            this._cd.detectChanges();
        });
        this.cdkVirtualForOf.viewChange.pipe(
            takeUntil(this._destroyed),
        ).subscribe(value => {
            console.log(value);
            this.columns = this.columns.reverse();
            this.tableWidth = this.columns.map(a => a.width).reduce((previousValue, currentValue) => previousValue + currentValue);
            console.log(this.tableWidth);
            this.columns$.next(this.columns);
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
