export declare type Step = {
  message: string;
  action: Function;
};
export declare type ValidationResult = {
  validForOldPackages: boolean;
  validForNewPackages: boolean;
  errors?: any[];
};
export declare type Token = {
  token: string;
};
export declare type Package = {
  name: string;
  version: string;
  license: string;
  description?: string;
  keywords?: string[];
  main?: string;
  repository?: {type: string, url: string};
  scripts?: any;
  dependencies?: any;
  devDependencies?: any;
  private?: boolean;
};