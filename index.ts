type Word = number | string;
type Quotation = Array<Word>;
type Value = number | string | Quotation;
type Stack = Array<Value>;

type State = {
  stack: Stack;
};

const push = (value: Value, state: State): State => ({
  ...state,
  stack: [value, ...state.stack],
});

export function executeWord(state: State, word: Word): State {
  if (typeof word === "number") {
    return push(word, state);
  }
  return state;
}

export function execute(state: State, words: Quotation): State {
  return words.reduce(executeWord, state);
}

/// test

const showStack = (state: State) =>
  console.log(`<${state.stack.length}> ${state.stack.join(" ")}`);

const myState: State = { stack: [] };
showStack(myState);
const newState = execute(myState, [42, 5, 12]);
showStack(newState);
