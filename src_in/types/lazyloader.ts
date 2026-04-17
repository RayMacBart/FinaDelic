export interface LazyLoaderType {

   parser: DOMParser;

   importSVG(svgFilename: string, wrapperCSSclass: string, ownCSSclasses: string): Promise<SVGSVGElement>;
   hoverPicLoader(e: MouseEvent, hover: boolean): void;
}