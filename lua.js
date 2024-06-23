
    var conf = {
      comments: {
        lineComment: "--",
        blockComment: ["--[[", "]]"]
      },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
      ]
    };
    var language = {
      defaultToken: "",
      tokenPostfix: ".lua",
      keywords: [
        "and",
        "break",
        "do",
        "else",
        "elseif",
        "end",
        "false",
        "for",
        "function",
        "goto",
        "if",
        "in",
        "local",
        "nil",
        "not",
        "or",
        "repeat",
        "return",
        "then",
        "true",
        "until",
        "while"
      ],
      globals: [
        "game",
        "workspace",
        "game.Workspace"
      ],
      brackets: [
        { token: "delimiter.bracket", open: "{", close: "}" },
        { token: "delimiter.array", open: "[", close: "]" },
        { token: "delimiter.parenthesis", open: "(", close: ")" }
      ],
      operators: [
        "+",
        "-",
        "*",
        "/",
        "%",
        "^",
        "#",
        "==",
        "~=",
        "<=",
        ">=",
        "<",
        ">",
        "=",
        ";",
        ":",
        ",",
        ".",
        "..",
        "..."
      ],
      // we include these common regular expressions
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      // The main tokenizer for our languages
      tokenizer: {
        root: [
          // identifiers and keywords
          [
            /[a-zA-Z_]\w*/,
            {
              cases: {
                "@keywords": { token: "keyword.$0" },
                "@globals": { token: "global" },
                "@default": "identifier"
              }
            }
          ],
          // whitespace
          { include: "@whitespace" },
          // keys
          [/(,)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ["delimiter", "", "key", "", "delimiter"]],
          [/({)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ["@brackets", "", "key", "", "delimiter"]],
          // delimiters and operators
          [/[{}()\[\]]/, "@brackets"],
          [
            /@symbols/,
            {
              cases: {
                "@operators": "delimiter",
                "@default": ""
              }
            }
          ],
          // numbers
          [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
          [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, "number.hex"],
          [/\d+?/, "number"],
          // delimiter: after number because of .\d floats
          [/[;,.]/, "delimiter"],
          // strings: recover on non-terminated strings
          [/"([^"\\]|\\.)*$/, "string.invalid"],
          // non-teminated string
          [/'([^'\\]|\\.)*$/, "string.invalid"],
          // non-teminated string
          [/"/, "string", '@string."'],
          [/'/, "string", "@string.'"]
        ],
        whitespace: [
          [/[ \t\r\n]+/, ""],
          [/--\[([=]*)\[/, "comment", "@comment.$1"],
          [/--.*$/, "comment"]
        ],
        comment: [
          [/[^\]]+/, "comment"],
          [
            /\]([=]*)\]/,
            {
              cases: {
                "$1==$S2": { token: "comment", next: "@pop" },
                "@default": "comment"
              }
            }
          ],
          [/./, "comment"]
        ],
        string: [
          [/[^\\"']+/, "string"],
          [/@escapes/, "string.escape"],
          [/\\./, "string.escape.invalid"],
          [
            /["']/,
            {
              cases: {
                "$#==$S2": { token: "string", next: "@pop" },
                "@default": "string"
              }
            }
          ]
        ]
      }
    };

// Register the Lua language configuration and tokenizer
monaco.languages.register({ id: 'luau' });

monaco.languages.setMonarchTokensProvider('luau', language);

monaco.languages.setLanguageConfiguration('luau', conf);

// Register the completion item provider for Lua language
monaco.languages.registerCompletionItemProvider('luau', {
  provideCompletionItems: () => {
    var suggestions = [
      {
        label: 'game',
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: 'game',
        detail: 'Global Variable'
      },
      {
        label: 'workspace',
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: 'workspace',
        detail: 'Global Variable'
      },
      {
        label: 'game.Workspace',
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: 'game.Workspace',
        detail: 'Global Variable'
      }
    ];
    return { suggestions: suggestions };
  }
});
