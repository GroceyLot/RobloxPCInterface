require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' } });

window.MonacoEnvironment = { getWorkerUrl: () => proxy };
let proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/'
    };
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(['vs/editor/editor.main'], function () {
    const cacheBuster = new Date().getTime();
    const url = `https://raw.githubusercontent.com/GroceyLot/RobloxPCInterface/Things/lua.js?cache=${cacheBuster}`;

    fetch(url)
        .then(response => response.text())
        .then(luaLanguageDef => {
            eval(luaLanguageDef);

            window.editor = monaco.editor.create(document.getElementById('editor'), {
                value: '-- Code',
                language: 'luau',
                theme: 'vs-dark',
                automaticLayout: true
            });
        });
});

document.getElementById("execute").addEventListener('click', function() {
    var codeContent = window.editor.getValue();
    fetch('/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: codeContent })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Code executed successfully');
        } else {
            alert('Error executing code: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

fetch('/server-info')
    .then(response => response.json())
    .then(data => {
        document.getElementById('server-info').innerText = `Server running on: ${data.url}`;
    });
