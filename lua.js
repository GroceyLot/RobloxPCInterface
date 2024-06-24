
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
monaco.languages.registerCompletionItemProvider('luau', {
  provideCompletionItems: (model, position) => {
    const textUntilPosition = model.getValueInRange({
      startLineNumber: position.lineNumber,
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
        insertText: 'UDim2.new(${1:xOffset}, ${2:xScale}, ${1:yOffset}, ${2:yScale})',
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

    const gameServices = [
      {
        key: 'HttpService',
        properties: [],
        methods: { dot: [], colon: ['GetAsync', 'PostAsync', 'JSONEncode', 'JSONDecode'] }
      },
      {
        key: 'UserInputService',
        properties: ['InputBegan', 'InputEnded'],
        methods: { dot: ['GetMouseLocation'], colon: [] }
      },
      {
        key: 'Players',
        properties: ['LocalPlayer'],
        methods: { dot: [], colon: ['GetPlayers', 'PlayerAdded', 'PlayerRemoving'] }
      },
      {
        key: 'Lighting',
        properties: ['Ambient', 'Brightness', 'ColorShift_Bottom', 'ColorShift_Top', 'EnvironmentDiffuseScale', 'EnvironmentSpecularScale', 'ExposureCompensation', 'FogColor', 'FogEnd', 'FogStart', 'GeographicLatitude', 'GlobalShadows', 'OutdoorAmbient', 'ShadowSoftness'],
        methods: { dot: [], colon: [] }
      },
      {
        key: 'ReplicatedStorage',
        properties: [],
        methods: { dot: [], colon: ['FindFirstChild', 'WaitForChild', 'GetChildren'] }
      },
      {
        key: 'Workspace',
        properties: ['CurrentCamera', 'DistributedGameTime', 'FallenPartsDestroyHeight', 'Gravity', 'StreamingEnabled', 'TouchCameraMovementMode'],
        methods: { dot: [], colon: [] }
      },
      {
        key: 'RunService',
        properties: ['Stepped', 'Heartbeat', 'RenderStepped'],
        methods: { dot: [], colon: [] }
      },
      {
        key: 'TweenService',
        properties: [],
        methods: { dot: [], colon: ['Create'] }
      },
      {
        key: 'CollectionService',
        properties: [],
        methods: { dot: [], colon: ['GetTagged', 'AddTag', 'RemoveTag'] }
      },
      {
        key: 'TextService',
        properties: [],
        methods: { dot: [], colon: ['GetTextSize'] }
      },
      {
        key: 'SoundService',
        properties: [],
        methods: { dot: [], colon: ['PlayLocalSound', 'StopAllSounds'] }
      },
      {
        key: 'Debris',
        properties: [],
        methods: { dot: [], colon: ['AddItem'] }
      },
      {
        key: 'PathfindingService',
        properties: [],
        methods: { dot: [], colon: ['CreatePath'] }
      },
      {
        key: 'TeleportService',
        properties: [],
        methods: { dot: [], colon: ['Teleport'] }
      },
      {
        key: 'LocalizationService',
        properties: [],
        methods: { dot: [], colon: ['GetTranslatorForPlayerAsync'] }
      },
      {
        key: 'Teams',
        properties: [],
        methods: { dot: [], colon: ['GetTeams'] }
      },
      {
        key: 'Stats',
        properties: [],
        methods: { dot: [], colon: ['GetTotalMemoryUsageMb'] }
      },
      {
        key: 'StarterGui',
        properties: [],
        methods: { dot: [], colon: ['SetCore', 'GetCore'] }
      },
      {
        key: 'StarterPack',
        properties: [],
        methods: { dot: [], colon: ['GetChildren'] }
      },
      {
        key: 'StarterPlayer',
        properties: [],
        methods: { dot: [], colon: ['GetChildren'] }
      },
      {
        key: 'TestService',
        properties: [],
        methods: { dot: [], colon: ['Check'] }
      },
      {
        key: 'CoreGui',
        properties: ['RobloxGui', 'TopbarEnabled'],
        methods: { dot: [], colon: [] }
      }
    ];

    const parts = textUntilPosition.split(/[:.]/);
    const lastPart = parts[parts.length - 1];

    if (lastPart === 'game') {
      gameServices.forEach(service => {
        suggestions.push({
          label: `game.${service.key}`,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: `game.${service.key}`,
          detail: `${service.key} service`
        });
      });
    } else {
      gameServices.forEach(service => {
        if (lastPart === service.key) {
          if (textUntilPosition.includes(':')) {
            service.methods.colon.forEach(method => {
              suggestions.push({
                label: `${service.key}:${method}()`,
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: `${service.key}:${method}()`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: `${method} method of ${service.key}`
              });
            });
          } else {
            service.properties.forEach(prop => {
              suggestions.push({
                label: `${service.key}.${prop}`,
                kind: monaco.languages.CompletionItemKind.Property,
                insertText: `${service.key}.${prop}`,
                detail: `${prop} property of ${service.key}`
              });
            });

            service.methods.dot.forEach(method => {
              suggestions.push({
                label: `${service.key}.${method}()`,
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: `${service.key}.${method}()`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: `${method} method of ${service.key}`
              });
            });
          }
        }
      });
    }

    return { suggestions: suggestions };
  }
});


