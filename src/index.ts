export interface BriqueOptions {
    columns: number;
    columnGap?: string;
    rowGap?: string;
}
export class Brique {
    public static DEFAULT_OPTIONS: BriqueOptions = {
        columns: 3,
        columnGap: '32px',
        rowGap: '32px',
    };

    public itemElements?: HTMLElement[];
    private resizeEvent: () => void;
    private options: BriqueOptions;

    constructor(
        public gridElement: HTMLElement,
        options: BriqueOptions = Brique.DEFAULT_OPTIONS
    ) {
        this.itemElements = [].slice.call(
            this.gridElement.children
        ) as HTMLElement[];
        this.options = options;
        this.resizeEvent = this.resize.bind(this);
        this.update();
    }

    public setOptions(options: BriqueOptions) {
        this.options = options;
        this.update();
    }

    public getOptions() {
        return this.options;
    }

    public watchResize() {
        window.addEventListener('resize', this.resizeEvent);
    }

    public update() {
        this.setStyle();
        this.resize();
    }

    public stopWatchResize() {
        window.removeEventListener('resize', this.resizeEvent);
    }

    private resize() {
        const gridComputedStyle: CSSStyleDeclaration = window.getComputedStyle(
            this.gridElement
        );
        const rowHeight: number = parseInt(
            gridComputedStyle.getPropertyValue('grid-auto-rows')
        );
        const rowGap: number = parseInt(
            gridComputedStyle.getPropertyValue('grid-row-gap')
        );

        if (!this.itemElements) return;
        this.itemElements.forEach((item, index) => {
            if (this.options.columns <= index) {
                item.style.marginTop = this.options.rowGap || '';
            } else if (item.style.marginTop) {
                item.style.removeProperty('margin-top');
            }
            const itemComputedStyle = window.getComputedStyle(item);
            const itemSpacing: number =
                parseInt(itemComputedStyle.getPropertyValue('margin-top')) +
                parseInt(itemComputedStyle.getPropertyValue('padding-top')) +
                parseInt(itemComputedStyle.getPropertyValue('padding-bottom'));
            const itemHeight: number = (
                [].slice.call(item.children) as HTMLElement[]
            ).reduce((acc: number, curr: HTMLElement) => {
                const childrenComputedStyle = window.getComputedStyle(curr);
                const childrenMarginTop: number = parseInt(
                    childrenComputedStyle.getPropertyValue('margin-top')
                );
                const childrenMarginBottom: number = parseInt(
                    childrenComputedStyle.getPropertyValue('margin-bottom')
                );
                return (
                    acc +
                    curr.getBoundingClientRect().height +
                    childrenMarginTop +
                    childrenMarginBottom
                );
            }, itemSpacing as number);
            const rowSpan = Math.ceil(
                (itemHeight + rowGap) / (rowHeight + rowGap)
            );
            item.style.gridRowEnd = `span ${rowSpan}`;
        });
    }

    private setStyle() {
        const gridStyle = this.gridElement.style;
        gridStyle.display = 'grid';
        gridStyle.gridTemplateColumns = `repeat(${this.options.columns}, 1fr)`;
        gridStyle.gridAutoRows = '1px';
        gridStyle.columnGap = this.options.columnGap || '';
        gridStyle.rowGap = '0';
    }
}
