import interfaces from "./interfaces";

export declare type Step = {
  message: string;
  action: interfaces.StepAction;
};

export declare type ValidationResult = {
  validForNewPackages: boolean;
  validForOldPackages: boolean;
  errors?: string[];
  warnings?: string[];
};

export declare type Package = {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  homepage?: string;
  repository?: { type: string; url: string };
  license: string;
  main?: string;
  bin?: string | Record<string, string>;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
