// These functions operate on a puzzle object.
// The puzzle object is just a plain JavaScript object with no special prototype.
// This was chosen because it is trivial do (de)serialize as JSON, and because
// it just works as a reactive "data" in Vue.

// Given a string, parses it into a puzzle object.
export function parsePuzzleText(text) {
  // Splitting the dimensions from the hints.
  let [
    ,
    width,
    height,
    hintstring,
  ] = /^\s*(\d+)\s*x\s*(\d+)\s*:?\s*([\d \t.,\r\n;/]+)\s*$/.exec(text) || [
    "",
    0,
    0,
    "",
  ];
  if (width && height) {
    width = parseInt(width, 10);
    height = parseInt(height, 10);
  } else {
    // Invalid string.
    return null;
  }
  // Spliting into each line (either row or col) of hints.
  // Also filtering the empty lines.
  const hintlines = hintstring.split(/[\r\n;/]+/).filter(line => line.trim());
  // Splitting each line into each individual hint, and converting to integer.
  const hints = hintlines.map(line =>
    line
      .split(/[ \t.,]+/)
      .filter(hint => hint.trim())
      .map(hint => parseInt(hint, 10))
  );
  const colHints = hints.slice(0, width);
  const rowHints = hints.slice(width);
  return {
    type: "puzzle_definition",
    width: parseInt(width, 10),
    height: parseInt(height, 10),
    colHints,
    rowHints,
  };
}

export function stringifyPuzzleDefinitionAsSimonTathan(puzzleDefinition) {
  const p = puzzleDefinition;
  return (
    `${p.width}x${p.height}:` +
    [...p.colHints, ...p.rowHints].map(hints => hints.join(".")).join("/")
  );
}

export function stringifyPuzzleDefinitionAsHumanReadable(puzzleDefinition) {
  const p = puzzleDefinition;
  return (
    `${p.width}x${p.height}\n` +
    [...p.colHints, ...p.rowHints].map(hints => hints.join(" ")).join("\n")
  );
}

export function validatePuzzleDefinition(puzzleDefinition) {
  const p = puzzleDefinition;
  let errors = [];

  // These two are essentially warnings.
  // We limit the dimensions to 99 because this tool was designed to have at
  // most 2 digits on each hint (for layout/display reasons). We can lift this
  // restiction later in the future, if/when needed.
  if (p.width > 99) {
    errors.push(`Puzzle is too wide (${p.width} > 99).`);
  }
  if (p.height > 99) {
    errors.push(`Puzzle is too tall (${p.height} > 99).`);
  }

  // These are errors:
  if (p.width !== p.colHints.length) {
    errors.push(
      `Width=${p.width}, but got ${p.colHints.length} vertical hints.`
    );
  }
  if (p.height !== p.rowHints.length) {
    errors.push(
      `Height=${p.height}, but got ${p.rowHints.length} horizontal hints.`
    );
  }

  const sumColHints = p.colHints
    .map(hints => hints.reduce(sumReducer))
    .reduce(sumReducer);
  const sumRowHints = p.rowHints
    .map(hints => hints.reduce(sumReducer))
    .reduce(sumReducer);
  if (sumColHints !== sumRowHints) {
    errors.push(
      `The columns have a total of ${sumColHints} filled cells, while the rows have ${sumRowHints}`
    );
  }

  return errors;
}

function sumReducer(acc, cur) {
  return acc + cur;
}

// TODO: Write down another (two) function(s) to generate the text from a puzzle object.
// TODO: Detect and report errors, such as:
// * ERROR/WARN: sum(sum(hints) for colHints) != sum(sum(hints) for rowHints)
// * LATER: any(sum(hints) + hints.length - 1 > height for colHints) -> This would be easily detected when trying to solve the puzzle; so we can wait to detect/report this later.
