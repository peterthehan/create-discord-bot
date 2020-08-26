import interfaces from "./interfaces";

export declare type Step = {
  message: string;
  action: interfaces.StepAction;
};
export declare type ValidationResult = {
  validForOldPackages: boolean;
  validForNewPackages: boolean;
  errors?: string[];
  warnings?: string[];
};
export declare type Package = {
  name: string;
  version: string;
  license: string;
  bin?: string | Record<string, string>;
  description?: string;
  keywords?: string[];
  main?: string;
  repository?: { type: string; url: string };
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  private?: boolean;
};
