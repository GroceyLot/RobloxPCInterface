# RobloxPCInterface

A helpful tool which lets you interact and execute scripts from your local filesystem in roblox. Especially useful when using an android emulator.

## Warning:
### DO NOT RUN THIS ON A PUBLIC NETWORK, AS IT EXPOSES YOUR FILESYSTEM AND OPENS A PORT. IT PROBABLY ALSO HAS BUGS/EXPLOITS SO JUST DON'T. I'M NOT RESPONSIBLE FOR ANY DAMAGE CAUSED WITH MY SOFTWARE.

## Installation:
- Download the exe from the latest release on the right --->
- Place it in a folder, along with some commonly used scripts like infinite yield
- Run it, and choose your port, 80 is usually good, but if it doesn't work just try a random number from 1024 to 65535
- Copy the link by clicking the text, and paste it into your browser followed by /webui
- Then, go onto roblox and execute this ```loadstring(game:HttpGet("https://github.com/GroceyLot/RobloxPCInterface/raw/Things/interface.lua"))()```
- Put the copied link in the top bar, and refresh to see your wonderful filesystem (or at least the contents of the folder you put serve.exe in)
- Close the window with M, or just drag it into the corner
- On your webui you can execute scripts live, using the provided execute button and code editor (I put so much time into the auto-completion)
