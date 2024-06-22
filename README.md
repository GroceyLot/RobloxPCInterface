# RobloxPCInterface

A helpful tool which lets you interact and execute scripts from your local filesystem in roblox. Especially useful when using an android emulator.

Basically, download serve.py and put it in a folder. Install flask with 
```
pip install flask
```
Then run 
```
loadstring(game:HttpGet("https://github.com/GroceyLot/RobloxPCInterface/raw/Things/interface.lua"))()
```
in a game to open the ui. In the console of the python it will say something like this:
```
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:4654
 * Running on http://192.168.1.256:4654
```
Copy the last one, but don't use ctrl-c as it will stop the program. Paste it into the top bar on roblox and hit refresh. This will then load a list of all files in the directory, allowing you to browse through folders and run .lua files.
