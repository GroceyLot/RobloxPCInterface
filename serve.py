import tkinter as tk
from threading import Thread
import socket
from flask import Flask, jsonify, render_template_string, request
import os

app = Flask(__name__)
# HTML template for /webui with CSS, JavaScript, CodeMirror for Lua syntax highlighting, Roblox Lua globals, blocked words, and customized hints
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Web UI</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/theme/material.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/addon/hint/show-hint.min.css">
      <style>
         body {
         font-family: Arial, sans-serif;
         background-color: #f0f0f0;
         color: #333;
         margin: 0;
         padding: 20px;
         }
         h1 {
         color: #007BFF;
         }
         p {
         font-size: 1.2em;
         }
         .container {
         max-width: 800px;
         margin: 0 auto;
         background-color: #fff;
         padding: 20px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
         }
         a {
         color: white;
         background-color: #007BFF;
         padding: 10px 20px;
         text-align: center;
         text-decoration: none;
         display: inline-block;
         font-size: 16px;
         margin: 4px 2px;
         cursor: pointer;
         border-radius: 5px;
         border: none;
         }
         a:hover {
         background-color: #0056b3;
         }
         button {
         background-color: #007BFF;
         color: white;
         border: none;
         padding: 10px 20px;
         text-align: center;
         text-decoration: none;
         display: inline-block;
         font-size: 16px;
         margin: 4px 2px;
         cursor: pointer;
         border-radius: 5px;
         }
         button:hover {
         background-color: #0056b3;
         }
         .CodeMirror {
         border: 1px solid #ccc;
         height: auto;
         }
         .CodeMirror-hints {
         background-color: #f0f0f0;
         border: 1px solid #ccc;
         }
         .CodeMirror-hint {
         padding: 2px 10px;
         cursor: pointer;
         }
         .CodeMirror-hint-active {
         background-color: #007BFF;
         color: white;
         }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/codemirror.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/mode/lua/lua.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/addon/hint/show-hint.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.5/addon/hint/anyword-hint.min.js"></script>
   </head>
   <body>
      <div class="container">
         <h1>Welcome to the Roblox PC Interface Web UI</h1>
         <p>Executor:</p>
         <textarea id="code" name="code">
-- Lua code goes here
print("Hello, Lua!")
        </textarea>
        <button id="execute">Execute</button>
        <p id="server-info"></p>
      </div>
      <script>
         // Define a list of Roblox Lua globals and blocked words
         var luaGlobals = ["print", "tostring", "tonumber", "game", "workspace", "loadstring", "pcall", "Vector3", "UDim2", "UDim", "Vector2", "new", "Color3", "Instance", "CFrame", "Enum", "math", "table", "coroutine", "os", "string"];
         var blockedWords = ["local", "{", "}", ","];
         
         // Custom hint function to filter out blocked words, include globals, and infer variables from the text
         function customHint(editor, options) {
         var cursor = editor.getCursor();
         var token = editor.getTokenAt(cursor);
         var start = token.start;
         var end = cursor.ch;
         var word = token.string;
         
         // Check if the current token is inside a string or a comment
         if (token.type === "string" || token.type === "comment") {
         return null;
         }
         
         var list = [];
         var seen = {};
         var lines = editor.lineCount();
         for (var i = 0; i < lines; i++) {
         var tokens = editor.getLineTokens(i);
         for (var j = 0; j < tokens.length; j++) {
             var t = tokens[j];
             if (t.type !== "string" && t.type !== "comment" && !seen[t.string] && t.string !== word) {
                 seen[t.string] = true;
                 if (t.string.indexOf(word) === 0 && blockedWords.indexOf(t.string) === -1) {
                     list.push(t.string);
                 }
             }
         }
         }
         
         list = list.concat(luaGlobals.filter(function(item) {
         return item.indexOf(word) === 0 && blockedWords.indexOf(item) === -1 && item !== word;
         }));
         
         return {
         list: list.length ? list : luaGlobals,
         from: CodeMirror.Pos(cursor.line, start),
         to: CodeMirror.Pos(cursor.line, end)
         };
         }
         
         // Initialize CodeMirror editor with Lua syntax highlighting and always-on autocomplete
         var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
         mode: "lua",
         theme: "material",
         lineNumbers: true,
         extraKeys: {
         "Ctrl-Space": "autocomplete"
         },
         hintOptions: {
         hint: customHint,
         completeSingle: false
         }
         });
         
         // Trigger autocomplete on all key presses
         editor.on("inputRead", function(cm, change) {
         if (!cm.state.completionActive && change.origin !== "setValue") {
         CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
         }
         });

         // Prevent Enter key from selecting the autocomplete suggestion
editor.on("keydown", function(cm, event) {
    if (event.key === "Enter" && cm.state.completionActive) {
        event.stopPropagation();
        event.preventDefault();
    }
});
         
         document.getElementById("execute").addEventListener('click', function() {
    var codeContent = editor.getValue();
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
         
      </script>
   </body>
</html>

"""

execute = False
toExec = ""
port = ""

@app.route('/webui')
def web_ui():
    return render_template_string(HTML_TEMPLATE)

@app.route('/server-info')
def server_info():
    global port
    ip_address = get_local_ip()
    url = f"http://{ip_address}:{port}"
    return jsonify({'url': url})

@app.route('/executing', methods=['GET'])
def get_executing_script():
    global execute
    global toExec
    current_script = toExec
    toExec = ""
    execute = False
    return jsonify({'script': current_script})

@app.route('/execute', methods=['POST'])
def execute_code():
    global execute
    global toExec
    data = request.get_json()
    code = data.get('code', '')

    try:
        if not execute:
            execute = True
            toExec = code
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'error': "Please wait for the last execution to finish before executing a new script."})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/', defaults={'subpath': ''})
@app.route('/<path:subpath>')
def list_directory_contents(subpath):
    BASE_PATH = os.getcwd()
    directory_path = os.path.join(BASE_PATH, subpath)
    if not subpath:
        directory_path = BASE_PATH

    if os.path.isdir(directory_path):
        try:
            contents = os.listdir(directory_path)
            detailed_contents = [{'name': item, 'extension': 'folder' if os.path.isdir(os.path.join(directory_path, item)) else os.path.splitext(item)[1]} for item in contents]
            return jsonify({'path': subpath, 'type': 'folder', 'contents': detailed_contents})
        except PermissionError:
            return jsonify({'error': 'Permission denied', 'path': subpath})
    elif os.path.isfile(directory_path):
        try:
            with open(directory_path, 'r') as file:
                file_content = file.read()
            extension = os.path.splitext(subpath)[1]
            return jsonify({'path': subpath, 'type': 'file', 'contents': file_content, 'extension': extension})
        except Exception as e:
            return jsonify({'error': str(e), 'path': subpath})
    else:
        return jsonify({'error': 'Non-existent path', 'path': subpath})

def start_flask_app(port):
    app.run(host='0.0.0.0', port=port, use_reloader=False)  # Disable reloader to avoid creating multiple threads

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.254.254.254', 1))
        IP = s.getsockname()[0]
    finally:
        s.close()
    return IP

def copy_to_clipboard(root, full_text):
    url = full_text.split(" ")[-1]
    root.clipboard_clear()
    root.clipboard_append(url)
    feedback_label = tk.Label(root, text="Copied to clipboard!", fg="green")
    feedback_label.pack(pady=(0, 20))
    root.after(500, feedback_label.destroy)

def start_server(root, port_entry):
    global port
    port = int(port_entry.get())
    Thread(target=lambda: start_flask_app(port), daemon=True).start()  # Use daemon=True to ensure threads close with the application
    show_ip_address(root)

def show_ip_address(root):
    global port
    for widget in root.winfo_children():
        widget.destroy()
    ip_address = get_local_ip()
    msg = f"Server running on http://{ip_address}:{port}"
    lbl = tk.Label(root, text=msg, cursor="xterm")
    lbl.pack(pady=10)
    lbl.bind("<Button-1>", lambda e: copy_to_clipboard(root, lbl.cget("text")))

    tk.Button(root, text="Close", command=root.destroy).pack(pady=20)

def main_gui():
    root = tk.Tk()
    root.title("Configure Flask Server")
    root.resizable(False, False)
    
    tk.Label(root, text="Enter port:").pack(pady=10)
    port_entry = tk.Entry(root)
    port_entry.pack(pady=10, padx=40)
    
    start_button = tk.Button(root, text="Start Server", command=lambda: start_server(root, port_entry))
    start_button.pack(pady=20)
    
    root.mainloop()

if __name__ == '__main__':
    main_gui()
