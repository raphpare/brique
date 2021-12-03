export interface BriqueOptions {
    columns: number;
    columnGap?: string;
    rowGap?: string;
}
export declare class Brique {
    gridElement: HTMLElement;
    static DEFAULT_OPTIONS: BriqueOptions;
    itemElements?: HTMLElement[];
    private resizeEvent;
    private options;
    constructor(gridElement: HTMLElement, options?: BriqueOptions);
    setOptions(options: BriqueOptions): void;
    getOptions(): BriqueOptions;
    watchResize(): void;
    update(): void;
    stropWatchResize(): void;
    private resize;
    private setStyle;
}
//# sourceMappingURL=index.d.ts.map