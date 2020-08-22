export declare type Step = {
  message: string;
  action: Function;
};
export declare type ValidationResult = {
  validForOldPackages: boolean;
  validForNewPackages: boolean;
  errors?: any[];
};