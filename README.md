# RobloxPCInterface

A helpful tool which lets you interact and execute scripts from your local filesystem in roblox. Especially useful when using an android emulator.

### Development paused due to hydrogen android being down

Sorry about the fact that every time I release a new release, everything breaks on old ones.

If you're seeing this, please try the program, and if you find any bugs or want some features, show it in issues.

## Disclaimer:
DO NOT RUN THIS ON ANY WIFI OTHER THAN YOUR HOME WIFI, AS YOU **WILL** GET HACKED

## Installation:
- Download the exe from the latest release
- Place it in a folder, along with some commonly used scripts like infinite yield
- Run it, and you will see this:

![image](https://github.com/GroceyLot/RobloxPCInterface/assets/108685271/29a5c83b-23f0-41fc-83f3-34ccd52f240d)
- Choose your port, 80 is usually good, but if it doesn't work just try a random number from 1024 to 65535
- Press 'Start Server'
- You will see this:

![image](https://github.com/GroceyLot/RobloxPCInterface/assets/108685271/405e8afc-06da-442d-9dbd-0b777506adb7)
- Copy the link by clicking the text:

![image](https://github.com/GroceyLot/RobloxPCInterface/assets/108685271/252d6919-c76a-4753-8155-07a40fe813d6)
- And paste it into your browser followed by /webui:

![image](https://github.com/GroceyLot/RobloxPCInterface/assets/108685271/aa488e18-f031-460b-b278-924b8c6064f4)
- Then, go onto roblox and execute this:
```
loadstring(game:HttpGet("https://github.com/GroceyLot/RobloxPCInterface/raw/Things/interface.lua"))()
```
- Put the copied link in the top bar, and refresh to see your wonderful filesystem (or at least the contents of the folder you put serve.exe in)
- Close the window with M, or just drag it into the corner
- On your webui you can execute scripts live, using the provided execute button and code editor (I put so much time into the auto-completion)
