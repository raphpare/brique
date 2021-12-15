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
    private options: BriqueOptions;
    private resizeEvent: () => void;
    private childrenObserver: MutationObserver;
    private watchResizeActive: boolean;

    constructor(
        public readonly gridElement: HTMLElement,
        options: BriqueOptions = Brique.DEFAULT_OPTIONS,
        watchResizeActive: boolean = true,
    ) {
        this.options = options;
        this.update();
        this.resizeEvent = this.drawItem.bind(this);
        this.childrenObserver = new MutationObserver(this.updateItems.bind(this))
        this.childrenObserver.observe(this.gridElement, { childList: true });
    
        if (watchResizeActive) {
            this.watchResize();
        }
    }

    public update() {
        this.setItemElements()
        this.draw();
    }

    public updateItems() {
        this.setItemElements()
        this.drawItem();
    }

    public destroy(): void {
        this.childrenObserver.disconnect();
        this.stopWatchResize();
    }

    public getOptions() {
        return this.options;
    }

    public setOptions(options: BriqueOptions) {
        this.options = options;
        this.draw();
    }

    public updateOptions(updatedOptions: BriqueOptions) {
        this.options = {
            ...this.options,
            ...updatedOptions
        };
        this.draw();
    }

    public watchResize() {
        if (this.watchResizeActive) return;
        window.addEventListener('resize', this.resizeEvent);
        this.watchResizeActive = true;
    }

    public stopWatchResize() {
        if (!this.watchResizeActive) return;
        window.removeEventListener('resize', this.resizeEvent);
    }

    private draw() {
        const gridStyle = this.gridElement.style;
        gridStyle.display = 'grid';
        gridStyle.gridTemplateColumns = `repeat(${this.options.columns}, 1fr)`;
        gridStyle.gridAutoRows = '1px';
        gridStyle.columnGap = this.options.columnGap || '';
        gridStyle.rowGap = '0';
        this.drawItem();
    }

    private drawItem() {
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
            const rowSpan = Math.ceil(
                (this.getItemHeight(item) + rowGap) / (rowHeight + rowGap)
            );
            item.style.gridRowEnd = `span ${rowSpan}`;
        });
    }

    private setItemElements(): void {
        this.itemElements = [].slice.call(
            this.gridElement.children
        ) as HTMLElement[];
    }

    private getItemHeight(item: HTMLElement): number {
        const itemComputedStyle = window.getComputedStyle(item);
        const itemSpacing: number =
            parseInt(itemComputedStyle.getPropertyValue('margin-top')) +
            parseInt(itemComputedStyle.getPropertyValue('padding-top')) +
            parseInt(itemComputedStyle.getPropertyValue('padding-bottom'));
        return (
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
    }
}
