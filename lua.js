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
    "while",
    "type",
    "continue"
  ],
  globals: [
    "game",
    "workspace",
    "Color3",
    "Vector3",
    "Instance",
    "pcall",
    "print",
    "UDim2",
    "Vector2",
    "loadstring",
    "Enum",
    "tick",
    "error",
    "warn",
    "pairs",
    "ipairs",
    "_G"
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
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  tokenizer: {
    root: [
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
      { include: "@whitespace" },
      [/(,)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ["delimiter", "", "key", "", "delimiter"]],
      [/({)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ["@brackets", "", "key", "", "delimiter"]],
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
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, "number.hex"],
      [/\d+?/, "number"],
      [/[;,.]/, "delimiter"],
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
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
monaco.languages.registerCompletionItemProvider('luau', {
  provideCompletionItems: (model, position) => {
    const textUntilPosition = model.getValueInRange({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column
    });

    const suggestions = [
      {
        label: 'game',
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: 'game',
        detail: 'The entire game'
      },
      {
        label: 'workspace',
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: 'workspace',
        detail: 'The workspace'
      },
      {
        label: 'Enum',
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: 'Enum',
        detail: 'Enums'
      },
      {
        label: 'Color3',
        kind: monaco.languages.CompletionItemKind.Color,
        insertText: 'Color3.new(${1:r}, ${2:g}, ${3:b})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Color3 class for defining colors'
      },
      {
        label: 'Vector3',
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: 'Vector3.new(${1:x}, ${2:y}, ${3:z})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Vector3 class for 3D vectors'
      },
      {
        label: 'Vector2',
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: 'Vector2.new(${1:x}, ${2:y})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Vector2 class for 2D vectors'
      },
      {
        label: 'UDim2',
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: 'UDim2.new(${1:xOffset}, ${2:xScale}, ${3:yOffset}, ${4:yScale})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'UDim2 class for 2D vectors'
      },
      {
        label: 'Instance',
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: 'Instance.new("${1:className}")',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Instance class for creating instances'
      },
      {
        label: '_G',
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: '_G',
        detail: 'Globals'
      },
      {
        label: 'print',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'print("${1:text}")',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Print text'
      },
      {
        label: 'error',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'error("${1:text}")',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Error text'
      },
      {
        label: 'warn',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'warn("${1:text}")',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Warning message'
      },
      {
        label: 'loadstring',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'loadstring("${1:text}")()',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Return a function from a string'
      },
      {
        label: 'pcall',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'pcall(${1:function})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Pcall a function'
      },
      {
        label: 'pairs',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'pairs(${1:table})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Loop through table'
      },
      {
        label: 'ipairs',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'ipairs(${1:table})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Loop through table in order'
      },
      {
        label: 'tick',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'tick()',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Time since unix epoch'
      }
    ];

    const keywords = [
      "and", "break", "do", "else", "elseif", "end", "false", "for",
      "function", "goto", "if", "in", "local", "nil", "not", "or",
      "repeat", "return", "then", "true", "until", "while", "type", "continue"
    ];

    const globals = [
      "game", "workspace", "Color3", "Vector3", "Instance", "pcall",
      "print", "UDim2", "Vector2", "loadstring", "Enum", "tick", "error",
      "warn", "pairs", "ipairs", "_G"
    ];

    const allReserved = new Set([...keywords, ...globals]);

    const currentToken = model.getWordUntilPosition(position).word;
    const variableMatches = textUntilPosition.match(/\b[a-zA-Z_]\w*\b/g);
    const uniqueVariables = [...new Set(variableMatches)].filter(v => {
      // Check if the variable is not a reserved word and is not the current token
      if (allReserved.has(v) || v === currentToken) {
        return false;
      }
      // Check if the variable has a '.' or ':' directly before it
      const variableIndex = textUntilPosition.indexOf(v);
      if (variableIndex > 0) {
        const charBeforeVariable = textUntilPosition[variableIndex - 1];
        if (charBeforeVariable === '.' || charBeforeVariable === ':') {
          return false;
        }
      }
      return true;
    });

    uniqueVariables.forEach(variable => {
      suggestions.push({
        label: variable,
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: variable,
        detail: 'Local variable'
      });
    });

    const tokens = textUntilPosition.split(/(?=\s|\.)|(?=\:)|\s/).filter(token => token.trim().length > 0);
    const lastToken = tokens ? tokens[tokens.length - 1] : '';
    let secondLastToken = tokens && tokens.length > 1 ? tokens[tokens.length - 2] : '';
    const thirdLastToken = tokens && tokens.length > 2 ? tokens[tokens.length - 3] : '';

    if (thirdLastToken == "game" && secondLastToken.includes(":GetService")) {
      const regex = /:GetService\("([^"]+)"\)/;
      const match = secondLastToken.match(regex);

      if (match && match[1]) {
        secondLastToken = `.${match[1]}`;
      }
    }

    console.log(tokens)

    const gameChildren = {
      "Workspace": { properties: ["CurrentCamera", "Gravity", "DistributedGameTime", "FallenPartsDestroyHeight", "Terrain"], functions: { ".": [], ":": ["Raycast", "Blockcast", "GetBoundingBox", "GetChildren"] } },
      "Players": { properties: ["LocalPlayer", "PlayerAdded", "PlayerRemoving"], functions: { ".": [], ":": ["Chat", "GetPlayers", "GetPlayerByUserId", "GetPlayerFromCharacter"] } },
      "Lighting": { properties: ["Brightness", "ClockTime", "Ambient", "FogColor", "GlobalShadows", "ShadowSoftness", "OutdoorAmbient", "LightingChanged"], functions: { ".": [], ":": [] } },
      "ReplicatedStorage": { properties: [], functions: { ".": [], ":": ["GetChildren"] } },
      "StarterGui": { properties: [], functions: { ".": [], ":": ["SetCoreGuiEnabled", "GetCoreGuiEnabled", "SetCore", "GetCore", "GetGuiObjectsAtPosition"] } },
      "SoundService": { properties: ["AmbientReverb", "DistanceFactor", "DopplerScale", "RespectFilteringEnabled", "RolloffScale"], functions: { ".": [], ":": ["GetListener"] } },
      "CoreGui": { properties: [], functions: { ".": [], ":": [] } },
      "UserInputService": { properties: ["InputBegan", "InputEnded", "InputChanged", "MouseIcon", "MouseIconEnabled"], functions: { ".": [], ":": ["GetKeysPressed", "GetMouseButtonsPressed", "IsKeyDown", "IsMouseButtonPressed"] } },
      "RunService": { properties: ["Heartbeat", "RenderStepped", "Stepped"], functions: { ".": [], ":": [] } },
      "TweenService": { properties: [], functions: { ".": [], ":": ["Create"] } },
      "HttpService": { properties: [], functions: { ".": [], ":": ["JSONDecode", "JSONEncode", "UrlEncode"] } },
    };

    if (secondLastToken === 'game' && lastToken.startsWith('.')) {
      Object.keys(gameChildren).forEach(child => {
        suggestions.push({
          label: child,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: child,
          detail: `${child} service`
        });
      });
    } else if (thirdLastToken === 'game' && lastToken.startsWith('.')) {
      const parentService = secondLastToken.replace('.', '');
      console.log(parentService)
      if (gameChildren.hasOwnProperty(parentService)) {
        gameChildren[parentService].properties.forEach(property => {
          suggestions.push({
            label: property,
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: property,
            detail: `${property} of ${parentService}`
          });
        });
        gameChildren[parentService].functions["."].forEach(func => {
          suggestions.push({
            label: func,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${func}()`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `Method of ${parentService}`
          });
        });
      }
    } else if (thirdLastToken === 'game' && lastToken.startsWith(':')) {
      const parentService = secondLastToken.replace('.', '');
      console.log(parentService)
      if (gameChildren.hasOwnProperty(parentService)) {
        gameChildren[parentService].functions[":"].forEach(func => {
          suggestions.push({
            label: func,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${func}()`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `Function of ${parentService}`
          });
        });
      }
    } else if (lastToken.startsWith(':') && secondLastToken === 'game') {
      suggestions.push({
        label: 'HttpGet',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'HttpGet("${1:url}")',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'HTTP requests'
      });
      suggestions.push({
        label: 'GetService',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'GetService("${1:service}")',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Get a service'
      });
    } else if (lastToken.startsWith(':') && secondLastToken === 'workspace') {
      const parentService = "Workspace";
      console.log(parentService)
      if (gameChildren.hasOwnProperty(parentService)) {
        gameChildren[parentService].functions[":"].forEach(func => {
          suggestions.push({
            label: func,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${func}()`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `Function of ${parentService}`
          });
        });
      }
    } else if (lastToken.startsWith('.') && secondLastToken === 'workspace') {
      const parentService = "Workspace";
      console.log(parentService)
      if (gameChildren.hasOwnProperty(parentService)) {
        gameChildren[parentService].properties.forEach(property => {
          suggestions.push({
            label: property,
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: property,
            detail: `${property} of ${parentService}`
          });
        });
        gameChildren[parentService].functions["."].forEach(func => {
          suggestions.push({
            label: func,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${func}()`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `Function of ${parentService}`
          });
        });
      }
    }
    return { suggestions: suggestions };
  }
});

