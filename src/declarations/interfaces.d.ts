import types from "./types";

export declare interface ValidationFunction {
  (name: string): types.ValidationResult;
}

export declare interface StepAction {
  (): void;
}
