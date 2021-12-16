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
    private updateOnResizeActive: boolean;

    constructor(
        public readonly gridElement: HTMLElement,
        options: BriqueOptions = Brique.DEFAULT_OPTIONS,
        updateOnResizeActive: boolean = true,
    ) {
        this.options = options;
        this.resizeEvent = this.drawItem.bind(this);
        this.update();
        this.childrenObserver = new MutationObserver(this.updateItems.bind(this))
        this.childrenObserver.observe(this.gridElement, { childList: true, subtree: true });

        if (updateOnResizeActive) {
            this.updateOnResize();
        }
    }

    public update(): void {
        this.setItemElements()
        this.draw();
    }

    public updateItems(): void {
        this.setItemElements()
        this.drawItem();
    }

    public updateOnResize(): void {
        if (this.updateOnResizeActive) return;
        window.addEventListener('resize', this.resizeEvent);
        this.updateOnResizeActive = true;
    }

    public stopUpdateOnResize(): void {
        if (!this.updateOnResizeActive) return;
        window.removeEventListener('resize', this.resizeEvent);
    }

    public getOptions(): BriqueOptions {
        return this.options;
    }

    public setOptions(options: BriqueOptions): void {
        this.options = options;
        this.draw();
    }

    public updateOptions(updatedOptions: BriqueOptions): void {
        this.options = {
            ...this.options,
            ...updatedOptions
        };
        this.draw();
    }

    public destroy(): void {
        this.childrenObserver.disconnect();
        this.stopUpdateOnResize();
    }

    private draw(): void {
        const gridStyle: CSSStyleDeclaration = this.gridElement.style;
        gridStyle.display = 'grid';
        gridStyle.gridTemplateColumns = `repeat(${this.options.columns}, 1fr)`;
        gridStyle.gridAutoRows = '1px';
        gridStyle.columnGap = this.options.columnGap || '';
        gridStyle.rowGap = '0';
        this.drawItem();
    }

    private drawItem(): void {
        if (!this.itemElements) return;
        for (let i = 0, len = this.itemElements.length; i < len; i++) {
            const item: HTMLElement = this.itemElements[i];
            const itemStyle: CSSStyleDeclaration = item.style;
            itemStyle.gridRowEnd = undefined;
            let spacing: number = 0;
            if (this.options.columns <= i) {
                const rowGap: string = this.options.rowGap;
                itemStyle.marginTop = rowGap || '0';
                spacing = parseInt(rowGap) || 0;
            } else if (itemStyle.marginTop) {
                itemStyle.removeProperty('margin-top');
            }
            const firstChild: HTMLElement = <HTMLElement>item.children[0];
            if (firstChild) {
                firstChild.style.marginTop = '0';
                spacing -= firstChild.offsetTop - item.offsetTop;
            }
            itemStyle.gridRowEnd = `span ${spacing + item.scrollHeight + item.clientHeight}`;
        }
    }

    private setItemElements(): void {
        this.itemElements = <HTMLElement[]>[].slice.call(
            this.gridElement.children
        );
    }
}
