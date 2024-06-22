from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/', defaults={'subpath': ''})
@app.route('/<path:subpath>')
def list_directory_contents(subpath):
    # Using the current directory instead of a fixed path
    BASE_PATH = os.getcwd()
    directory_path = os.path.join(BASE_PATH, subpath)

    # Resetting to BASE_PATH if no subpath is provided
    if not subpath:
        directory_path = BASE_PATH

    if os.path.isdir(directory_path):
        try:
            contents = os.listdir(directory_path)
            detailed_contents = []
            for item in contents:
                item_path = os.path.join(directory_path, item)
                if os.path.isdir(item_path):
                    detailed_contents.append({'name': item, 'extension': 'folder'})
                else:
                    extension = os.path.splitext(item)[1]
                    detailed_contents.append({'name': item, 'extension': extension})
            return jsonify({'path': subpath, 'type': 'folder', 'contents': detailed_contents})
        except PermissionError:
            return jsonify({'error': 'Permission denied'})
    elif os.path.isfile(directory_path):
        try:
            with open(directory_path, 'r') as file:
                file_content = file.read()
            extension = os.path.splitext(subpath)[1]
            return jsonify({'path': subpath, 'type': 'file', 'contents': file_content, 'extension': extension})
        except Exception as e:
            return jsonify({'error': str(e)})
    else:
        return jsonify({'error': 'Non-existent path'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4654)
