export interface BriqueOptions {
    /** Number of columns */
    columns: number;
    /** Spacing between columns */
    columnGap?: string;
    /** Spacing between row */
    rowGap?: string;
}

/**
 * Class representing a Brique.
 */
export class Brique {
    public static DEFAULT_OPTIONS: BriqueOptions = {
        columns: 3,
        columnGap: '32px',
        rowGap: '32px',
    };

    public itemElements?: HTMLElement[];
    private options: BriqueOptions;
    private resizeObserver: ResizeObserver;
    private resizeEvent: () => void;
    private childrenObserver: MutationObserver;
    private observeGridResize: boolean;

    /**
     * Creates a new instance of Brique.
     * @param gridElement - Grid container
     * @param options - Options to customize the grid
     * @param observeGridResize - Update the dimension of grid items when the grid container is resized
     */
    constructor(
        public readonly gridElement: HTMLElement,
        options: BriqueOptions = Brique.DEFAULT_OPTIONS,
        observeGridResize: boolean = true,
    ) {
        this.options = options;
        this.resizeObserver = new ResizeObserver(this.drawItems.bind(this));
        this.resizeEvent = this.drawItems.bind(this);
        this.childrenObserver = new MutationObserver(this.updateItems.bind(this))
        this.childrenObserver.observe(this.gridElement, { childList: true, subtree: true });
        this.setItemElements()
        this.drawGridContainer();
        observeGridResize ? this.updateOnResize() : this.drawItems();
        if (observeGridResize) {
            this.updateOnResize();
            if (!window.ResizeObserver) {
                this.drawItems();
            }
            return;
        }
        this.drawItems()
    }

    /**
     * Update the rendering of the entire grid.
     */
    public update(): void {
        this.setItemElements()
        this.draw();
    }

    /**
     * Update the rendering of the grid items.
     */
    public updateItems(): void {
        this.setItemElements()
        this.drawItems();
    }

    /**
     * Update the dimension of grid items when the grid element is resized.
     */
    public updateOnResize(): void {
        if (this.observeGridResize) return;
        window.ResizeObserver ?
            this.resizeObserver.observe(this.gridElement) : window.addEventListener('resize', this.resizeEvent);
        this.observeGridResize = true;
    }

    /**
     * Update the dimension of grid items when the grid element is resized.
     */
    public stopUpdateOnResize(): void {
        if (!this.observeGridResize) return;
        window.ResizeObserver ?
            this.resizeObserver.disconnect() : window.removeEventListener('resize', this.resizeEvent);
    }

    /**
     * Return current options object.
     */
    public getOptions(): BriqueOptions {
        return this.options;
    }

    /**
     * Change all properties of options object.
     * @param options
     */
    public setOptions(options: BriqueOptions): void {
        this.options = options;
        this.draw();
    }

    /**
     * Updates only changed properties.
     * @param updatedOptions - Option properties to update
     */
    public updateOptions(updatedOptions: BriqueOptions): void {
        this.options = {
            ...this.options,
            ...updatedOptions
        };
        this.draw();
    }

    /**
     * Removes all events listened to on the HTML elements handled by the Brique class.
     * The `destroy()` method must be called when the grid is removed from HTML.
     */
    public destroy(): void {
        this.childrenObserver.disconnect();
        this.stopUpdateOnResize();
    }

    /**
     * Apply inline styles on grid container and grid items
     * @private
     */
    private draw(): void {
        this.drawGridContainer();
        this.drawItems();
    }

    /**
     * Apply inline styles on grid container
     */
    private drawGridContainer(): void {
        const gridStyle: CSSStyleDeclaration = this.gridElement.style;
        gridStyle.display = 'grid';
        gridStyle.gridTemplateColumns = `repeat(${this.options.columns}, 1fr)`;
        gridStyle.gridAutoRows = '1px';
        gridStyle.columnGap = this.options.columnGap || '';
        gridStyle.rowGap = '0';
    }

    /**
     * Apply inline styles on grid items
     */
    private drawItems(): void {
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

    /**
     * Find grid items in grid element children and set property itemElements
     */
    private setItemElements(): void {
        this.itemElements = <HTMLElement[]>[].slice.call(
            this.gridElement.children
        );
    }
}
