import interfaces from "./interfaces";

export declare type Answers = {
  name: string;
  token: string;
};

export declare type Package = {
  name: string;
  version: string;
  description?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

export declare type Step = {
  message: string;
  action: interfaces.StepAction;
};
