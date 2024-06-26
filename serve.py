import tkinter as tk
from threading import Thread
import socket
from flask import Flask, jsonify, render_template_string, request
import os
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type"]}})

url = "https://github.com/GroceyLot/RobloxPCInterface/raw/Things/webui.html"
response = requests.get(url)

if response.status_code != 200:
    raise Exception(f"Failed to retrieve the content. Status code: {response.status_code}")

# HTML template for /webui with CSS, JavaScript, CodeMirror for Lua syntax highlighting, Roblox Lua globals, blocked words, and customized hints
HTML_TEMPLATE = response.text

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
