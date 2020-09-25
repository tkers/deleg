type Sym = { name: string };
type Word = number | string | Sym;
type Quotation = Array<Word>;

type Value = number | Sym;
type Stack = Array<Value>;
type State = {
  stack: Stack;
};

const push = (value: Value, state: State): State => ({
  ...state,
  stack: [value, ...state.stack],
});

export function executeWord(state: State, word: Word): State {
  if (typeof word === "number" || typeof word === "object") {
    return push(word, state);
  }
  return state;
}

export function execute(state: State, words: Quotation): State {
  return words.reduce(executeWord, state);
}

/// test
const sym = (name: string): Sym => ({ name });

const showValue = (value: Value): string =>
  typeof value === "number" ? `${value}` : `\\${value.name}`;

const showStack = (state: State) =>
  console.log(
    `<${state.stack.length}> ${state.stack
      .slice()
      .reverse()
      .map(showValue)
      .join(" ")}`
  );

const myState: State = { stack: [] };
showStack(myState);
const newState = execute(myState, [42, 5, sym("foo")]);
showStack(newState);
