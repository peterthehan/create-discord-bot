declare type Step = {
    message: string;
    action: Function;
};
declare type ValidationResult = {
    validForOldPackages: boolean;
    validForNewPackages: boolean;
    errors?: any[];
};