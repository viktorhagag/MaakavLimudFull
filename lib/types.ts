
export type Category = 'Gemara' | 'MB' | 'Musar';
export type Section = { id:string; label:string; done:boolean; srs?:number; last?:string };
export type Book = { id:string; title:string; category:Category; parentPath?:string; sections?:Section[]; totalUnits?:number; progress?:number; meta?:Record<string,any> }
