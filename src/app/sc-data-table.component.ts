import {
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    FixedSizeVirtualScrollStrategy,
    VIRTUAL_SCROLL_STRATEGY
} from '@angular/cdk/scrolling';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {Platform} from "@angular/cdk/platform";
import {BehaviorSubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ScDataTableTplDirective} from "./sc-data-table-tpl.directive";

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(34, 250, 500);
    }
}


export interface ScColumn {

    _headerWidthCache?: number;
    _bodyWidthCache?: number;
    _resizeWidth?: number;
    /**
     * indicate if resize by gui
     */
    _resized?: boolean;
    _paddingLeft?: number;
    _paddingRight?: number;
    _isSpanRest?: boolean;


    width?: number;


    name: string;
    visible: boolean;
    disableSort?: boolean;
    /**
     * lock column resize if true
     */
    lockResize?: boolean;
    /**
     * table header display text
     */
    title?: string;
    /**
     * table header display sub text
     */
    subtitle?: string;
    /**
     * table column max width constraint
     */
    maxWidth?: number;
    /**
     * indicate some predefine behavior
     */
    dataType?: 'number' | 'datetime' | 'Severity';

    /**
     * table body cell display transform function
     */
    cellFn?(row, last?: string): string;

    /**
     * data for sort
     * @param row raw data of table row
     * @param last value return by dataType default sortFn
     */
    sortFn?(row, last?: string | number): string | number;
    /**
     * table header title attribute transform function
     */
    headerTitleFn?(column: ScColumn, last?: string): string;

    /**
     * cell title
     * @param row raw data of table row
     * @param last value return by dataType default cellTitleFn
     */
    cellTitleFn?(row, last?: string): string;
}


@Component({
    selector: 'sc-data-table',
    styleUrls: ['sc-data-table.component.scss'],
    templateUrl: 'sc-data-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})
export class ScDataTableComponent implements AfterViewInit,OnChanges , OnInit, OnDestroy, AfterContentInit {

    @Input() searchString: string;
    @Input() isLoading: boolean = false;
    @Input() data: any[] = [];
    @Input() columns: ScColumn[];
    @Input() orders: any[];
    @Input() sortable: boolean = false;
    @Input() select: boolean = false;
    @Input() noDataMessage: string = 'no data';

    @ContentChildren(ScDataTableTplDirective) tpls: QueryList<ScDataTableTplDirective>;

    @ViewChild('resizeHelper') resizeHelperViewChild: ElementRef;

    @ViewChild('defaultCellTpl') defaultCellTpl: TemplateRef<any>;
    @ViewChild('defaultHeadTpl') defaultHeadTpl: TemplateRef<any>;

    @ViewChild(CdkVirtualForOf) cdkVirtualForOf: CdkVirtualForOf<any>;
    @ViewChild(CdkVirtualScrollViewport) scrollableBody: CdkVirtualScrollViewport;

    private _destroyed = new Subject();
    columns$: BehaviorSubject<any>;
    items: any[];

    tableWidth: number;
    private headerMarginLeft = 0;
    tplMap: Map<string, TemplateRef<any>>;

    constructor(private _platform: Platform, private _cd: ChangeDetectorRef) {
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

    ngAfterContentInit(): void {
        this.tplMap = new Map<string,TemplateRef<any>>();
        this.tplMap.set('$cell', this.defaultCellTpl);
        this.tplMap.set('$header', this.defaultHeadTpl);
        this.tpls.forEach(item => {
            this.tplMap.set(item.scDataTableTpl, item.templateRef);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('columns')) {
            this.columns.forEach(value => {
                value.cellFn = (r)=>r.name;
            });
            this.columns$ = new BehaviorSubject(this.columns);
            let rownum = 50;
            if (this._platform.BLINK) {
                rownum = 95;
            } else if (this._platform.TRIDENT) {
                rownum = 50;
            } else if (this._platform.FIREFOX) {
                rownum = 26;
            } else if (this._platform.EDGE) {
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
    }
}
