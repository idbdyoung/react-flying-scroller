type SomeType = number;
type MyConditionlType = SomeType extends string ? string : null;

function someFunction<T>(value: T) {
  const someOtherFunction = (
    someArg: T extends boolean ? "TYPE A" : "TYPE B"
  ) => {};

  return someOtherFunction;
}

const result = someFunction("");
