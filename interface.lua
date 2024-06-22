-- Create UI elements and manage HTTP requests in Roblox
-- UI Instances
local screenGui = Instance.new("ScreenGui")
local mainFrame = Instance.new("Frame")
local mainUICorner = Instance.new("UICorner")
local urlTextBox = Instance.new("TextBox")
local textBoxUICorner = Instance.new("UICorner")
local textSizeConstraint = Instance.new("UITextSizeConstraint")
local contentFrame = Instance.new("Frame")
local scrollingFrame = Instance.new("ScrollingFrame")
local listLayout = Instance.new("UIListLayout")
local contentUICorner = Instance.new("UICorner")
local loadButton = Instance.new("TextButton")
local buttonUICorner = Instance.new("UICorner")
local buttonImageLabel = Instance.new("ImageLabel")
local aspectRatioConstraint = Instance.new("UIAspectRatioConstraint")
print "Loading script interface..."
-- Set parent UI elements
screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")
pcall(function()
	screenGui.Parent = game.CoreGui
end)
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

-- Configure main frame
mainFrame.Parent = screenGui
mainFrame.AnchorPoint = Vector2.new(0.5, 0.5)
mainFrame.BackgroundColor3 = Color3.fromRGB(40, 20, 60)
mainFrame.BorderSizePixel = 0
mainFrame.Position = UDim2.new(0.5, 0, 0.5, 0)
mainFrame.Size = UDim2.new(0.3, 0, 0.35, 0)
mainUICorner.Parent = mainFrame

local function makeFrameDraggable(frame)
	local dragging = false
	local dragInput, mousePos, framePos

	frame.InputBegan:Connect(function(input)
		if input.UserInputType == Enum.UserInputType.MouseButton1 then
			dragging = true
			mousePos = input.Position
			framePos = frame.Position

			input.Changed:Connect(function()
				if input.UserInputState == Enum.UserInputState.End then
					dragging = false
				end
			end)
		end
	end)

	frame.InputChanged:Connect(function(input)
		if input.UserInputType == Enum.UserInputType.MouseMovement then
			dragInput = input
		end
	end)

	game:GetService("UserInputService").InputChanged:Connect(function(input)
		if input == dragInput and dragging then
			local delta = input.Position - mousePos
			frame.Position = UDim2.new(framePos.X.Scale, framePos.X.Offset + delta.X, framePos.Y.Scale, framePos.Y.Offset + delta.Y)
		end
	end)
end

makeFrameDraggable(mainFrame)

-- URL text box settings
urlTextBox.Parent = mainFrame
urlTextBox.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
urlTextBox.BorderSizePixel = 0
urlTextBox.Position = UDim2.new(0.05, 0, 0.05, 0)
urlTextBox.Size = UDim2.new(0.7, 0, 0.15, 0)
urlTextBox.ClearTextOnFocus = false
urlTextBox.Font = Enum.Font.SourceSans
urlTextBox.PlaceholderText = "http://127.0.0.1:4654"
urlTextBox.Text = ""
urlTextBox.TextColor3 = Color3.fromRGB(0, 0, 0)
urlTextBox.TextScaled = true
textBoxUICorner.Parent = urlTextBox
textSizeConstraint.Parent = urlTextBox
textSizeConstraint.MaxTextSize = 35

-- Content frame settings
contentFrame.Parent = mainFrame
contentFrame.AnchorPoint = Vector2.new(0.5, 0.5)
contentFrame.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
contentFrame.BorderSizePixel = 0
contentFrame.Position = UDim2.new(0.5, 0, 0.6, 0)
contentFrame.Size = UDim2.new(0.9, 0, 0.7, 0)
contentUICorner.Parent = contentFrame

-- Scrolling frame configuration
scrollingFrame.Parent = contentFrame
scrollingFrame.Active = true
scrollingFrame.AnchorPoint = Vector2.new(0.5, 0.5)
scrollingFrame.BackgroundTransparency = 1
scrollingFrame.BorderSizePixel = 0
scrollingFrame.Position = UDim2.new(0.5, 0, 0.5, 0)
scrollingFrame.Size = UDim2.new(0.95, 0, 0.9, 0)
scrollingFrame.CanvasSize = UDim2.new(0, 0, 0, 0)
scrollingFrame.AutomaticCanvasSize = Enum.AutomaticSize.Y
listLayout.Parent = scrollingFrame
listLayout.Padding = UDim.new(0, 5)

-- Load button configuration
loadButton.Parent = mainFrame
loadButton.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
loadButton.BorderSizePixel = 0
loadButton.Position = UDim2.new(0.8, 0, 0.05, 0)
loadButton.Size = UDim2.new(0.15, 0, 0.15, 0)
loadButton.Font = Enum.Font.SourceSans
loadButton.Text = ""
buttonUICorner.Parent = loadButton

-- Button image settings
buttonImageLabel.Parent = loadButton
buttonImageLabel.AnchorPoint = Vector2.new(0.5, 0.5)
buttonImageLabel.BackgroundTransparency = 1
buttonImageLabel.BorderSizePixel = 0
buttonImageLabel.Position = UDim2.new(0.5, 0, 0.5, 0)
buttonImageLabel.Size = UDim2.new(1, 0, 1, 0)
buttonImageLabel.ImageColor3 = Color3.new(0,0,0)
buttonImageLabel.Image = "rbxassetid://4512344746"
aspectRatioConstraint.Parent = buttonImageLabel

function createScript(name, callback)
	-- Instances

	local Script = Instance.new("Frame")
	local UICorner = Instance.new("UICorner")
	local TextLabel = Instance.new("TextLabel")
	local UITextSizeConstraint = Instance.new("UITextSizeConstraint")
	local UICorner_2 = Instance.new("UICorner")
	local TextButton = Instance.new("TextButton")
	local UICorner_3 = Instance.new("UICorner")
	local ImageLabel = Instance.new("ImageLabel")
	local UIAspectRatioConstraint = Instance.new("UIAspectRatioConstraint")
	local UICorner_4 = Instance.new("UICorner")

	-- Properties

	Script.Name = "Script"
	Script.Parent = scrollingFrame
	Script.BackgroundColor3 = Color3.new(0.156863, 0.0784314, 0.235294)
	Script.BorderColor3 = Color3.new(0, 0, 0)
	Script.BorderSizePixel = 0
	Script.Size = UDim2.new(1, 0, 0.200000003, 0)

	UICorner.Parent = Script

	TextLabel.Parent = Script
	TextLabel.AnchorPoint = Vector2.new(0.5, 0.5)
	TextLabel.BackgroundColor3 = Color3.new(1, 1, 1)
	TextLabel.BorderColor3 = Color3.new(0, 0, 0)
	TextLabel.BorderSizePixel = 0
	TextLabel.Position = UDim2.new(0.400000006, 0, 0.5, 0)
	TextLabel.Size = UDim2.new(0.699999988, 0, 0.800000012, 0)
	TextLabel.Font = Enum.Font.SourceSans
	TextLabel.TextColor3 = Color3.new(0, 0, 0)
	TextLabel.TextScaled = true
	TextLabel.TextSize = 14
	TextLabel.Text = name
	TextLabel.TextWrapped = true

	UITextSizeConstraint.Parent = TextLabel
	UITextSizeConstraint.MaxTextSize = 25

	UICorner_2.Parent = TextLabel

	TextButton.Parent = Script
	TextButton.AnchorPoint = Vector2.new(0.5, 0.5)
	TextButton.BackgroundColor3 = Color3.new(1, 1, 1)
	TextButton.BorderColor3 = Color3.new(0, 0, 0)
	TextButton.BorderSizePixel = 0
	TextButton.Position = UDim2.new(0.875, 0, 0.5, 0)
	TextButton.Size = UDim2.new(0.150000006, 0, 0.800000012, 0)
	TextButton.Font = Enum.Font.SourceSans
	TextButton.Text = ""
	TextButton.TextColor3 = Color3.new(1, 1, 1)
	TextButton.TextSize = 14

	TextButton.MouseButton1Click:Connect(callback)

	UICorner_3.Parent = TextButton

	ImageLabel.Parent = TextButton
	ImageLabel.AnchorPoint = Vector2.new(0.5, 0.5)
	ImageLabel.BackgroundColor3 = Color3.new(0, 0, 0)
	ImageLabel.BackgroundTransparency = 1
	ImageLabel.BorderColor3 = Color3.new(0, 0, 0)
	ImageLabel.BorderSizePixel = 0
	ImageLabel.Position = UDim2.new(0.5, 0, 0.5, 0)
	ImageLabel.Size = UDim2.new(1, 0, 1, 0)
	ImageLabel.Image = "rbxassetid://153287088"
	ImageLabel.ImageColor3 = Color3.new(0, 0, 0)

	UIAspectRatioConstraint.Parent = ImageLabel

	UICorner_4.Parent = ImageLabel
end

function createFile(name)
	-- Instances

	local File = Instance.new("Frame")
	local UICorner = Instance.new("UICorner")
	local TextLabel = Instance.new("TextLabel")
	local UITextSizeConstraint = Instance.new("UITextSizeConstraint")
	local UICorner_2 = Instance.new("UICorner")
	local TextButton = Instance.new("TextButton")
	local UICorner_3 = Instance.new("UICorner")
	local ImageLabel = Instance.new("ImageLabel")
	local UIAspectRatioConstraint = Instance.new("UIAspectRatioConstraint")
	local UICorner_4 = Instance.new("UICorner")

	-- Properties

	File.Name = "File"
	File.Parent = scrollingFrame
	File.BackgroundColor3 = Color3.new(0.156863, 0.0784314, 0.235294)
	File.BorderColor3 = Color3.new(0, 0, 0)
	File.BorderSizePixel = 0
	File.Size = UDim2.new(1, 0, 0.200000003, 0)

	UICorner.Parent = File

	TextLabel.Parent = File
	TextLabel.AnchorPoint = Vector2.new(0.5, 0.5)
	TextLabel.BackgroundColor3 = Color3.new(1, 1, 1)
	TextLabel.BorderColor3 = Color3.new(0, 0, 0)
	TextLabel.BorderSizePixel = 0
	TextLabel.Position = UDim2.new(0.400000006, 0, 0.5, 0)
	TextLabel.Size = UDim2.new(0.699999988, 0, 0.800000012, 0)
	TextLabel.Font = Enum.Font.SourceSans
	TextLabel.TextColor3 = Color3.new(0, 0, 0)
	TextLabel.TextScaled = true
	TextLabel.TextSize = 14
	TextLabel.Text = name
	TextLabel.TextWrapped = true

	UITextSizeConstraint.Parent = TextLabel
	UITextSizeConstraint.MaxTextSize = 25

	UICorner_2.Parent = TextLabel

	TextButton.Parent = File
	TextButton.AnchorPoint = Vector2.new(0.5, 0.5)
	TextButton.BackgroundColor3 = Color3.new(1, 1, 1)
	TextButton.BorderColor3 = Color3.new(0, 0, 0)
	TextButton.BorderSizePixel = 0
	TextButton.Position = UDim2.new(0.875, 0, 0.5, 0)
	TextButton.Size = UDim2.new(0.150000006, 0, 0.800000012, 0)
	TextButton.Font = Enum.Font.SourceSans
	TextButton.Text = ""
	TextButton.TextColor3 = Color3.new(1, 1, 1)
	TextButton.TextSize = 14

	UICorner_3.Parent = TextButton

	ImageLabel.Parent = TextButton
	ImageLabel.AnchorPoint = Vector2.new(0.5, 0.5)
	ImageLabel.BackgroundColor3 = Color3.new(0, 0, 0)
	ImageLabel.BackgroundTransparency = 1
	ImageLabel.BorderColor3 = Color3.new(0, 0, 0)
	ImageLabel.BorderSizePixel = 0
	ImageLabel.Position = UDim2.new(0.5, 0, 0.5, 0)
	ImageLabel.Size = UDim2.new(0.899999976, 0, 0.899999976, 0)
	ImageLabel.Image = "rbxassetid://13435021955"
	ImageLabel.ImageColor3 = Color3.new(0, 0, 0)

	UIAspectRatioConstraint.Parent = ImageLabel

	UICorner_4.Parent = ImageLabel
end

function createFolder(name, callback)
	-- Instances

	local Folder = Instance.new("Frame")
	local UICorner = Instance.new("UICorner")
	local TextLabel = Instance.new("TextLabel")
	local UITextSizeConstraint = Instance.new("UITextSizeConstraint")
	local UICorner_2 = Instance.new("UICorner")
	local TextButton = Instance.new("TextButton")
	local UICorner_3 = Instance.new("UICorner")
	local ImageLabel = Instance.new("ImageLabel")
	local UIAspectRatioConstraint = Instance.new("UIAspectRatioConstraint")
	local UICorner_4 = Instance.new("UICorner")

	-- Properties

	Folder.Name = "Folder"
	Folder.Parent = scrollingFrame
	Folder.BackgroundColor3 = Color3.new(0.156863, 0.0784314, 0.235294)
	Folder.BorderColor3 = Color3.new(0, 0, 0)
	Folder.BorderSizePixel = 0
	Folder.Size = UDim2.new(1, 0, 0.200000003, 0)

	UICorner.Parent = Folder

	TextLabel.Parent = Folder
	TextLabel.AnchorPoint = Vector2.new(0.5, 0.5)
	TextLabel.BackgroundColor3 = Color3.new(1, 1, 1)
	TextLabel.BorderColor3 = Color3.new(0, 0, 0)
	TextLabel.BorderSizePixel = 0
	TextLabel.Position = UDim2.new(0.400000006, 0, 0.5, 0)
	TextLabel.Size = UDim2.new(0.699999988, 0, 0.800000012, 0)
	TextLabel.Font = Enum.Font.SourceSans
	TextLabel.TextColor3 = Color3.new(0, 0, 0)
	TextLabel.TextScaled = true
	TextLabel.TextSize = 14
	TextLabel.Text = name
	TextLabel.TextWrapped = true

	UITextSizeConstraint.Parent = TextLabel
	UITextSizeConstraint.MaxTextSize = 25

	UICorner_2.Parent = TextLabel

	TextButton.Parent = Folder
	TextButton.AnchorPoint = Vector2.new(0.5, 0.5)
	TextButton.BackgroundColor3 = Color3.new(1, 1, 1)
	TextButton.BorderColor3 = Color3.new(0, 0, 0)
	TextButton.BorderSizePixel = 0
	TextButton.Position = UDim2.new(0.875, 0, 0.5, 0)
	TextButton.Size = UDim2.new(0.150000006, 0, 0.800000012, 0)
	TextButton.Font = Enum.Font.SourceSans
	TextButton.Text = ""
	TextButton.TextColor3 = Color3.new(1, 1, 1)
	TextButton.TextSize = 14

	UICorner_3.Parent = TextButton

	ImageLabel.Parent = TextButton
	ImageLabel.AnchorPoint = Vector2.new(0.5, 0.5)
	ImageLabel.BackgroundColor3 = Color3.new(0, 0, 0)
	ImageLabel.BackgroundTransparency = 1
	ImageLabel.BorderColor3 = Color3.new(0, 0, 0)
	ImageLabel.BorderSizePixel = 0
	ImageLabel.Position = UDim2.new(0.5, 0, 0.5, 0)
	ImageLabel.Size = UDim2.new(1.39999998, 0, 1.39999998, 0)
	ImageLabel.Image = "rbxassetid://946376164"
	ImageLabel.ImageColor3 = Color3.new(0, 0, 0)

	UIAspectRatioConstraint.Parent = ImageLabel

	UICorner_4.Parent = ImageLabel
end

local loading = false

-- Function to handle JSON data
local function handleData(dataJson)
	if not dataJson then
		createFile("Error: No data received")
		return
	end

	if dataJson["type"] == "file" then
		createFile("Please specify a path to a folder, not a file")
	elseif dataJson["type"] == "folder" then
		for _, v in ipairs(dataJson["contents"]) do
			if v["extension"] == ".lua" or v["extension"] == ".luau" then
				createScript(v["name"], function()
					task.spawn(function()
						local success, result = pcall(function()
							local scriptData = game:HttpGet(dataJson["path"] .. "/" .. v["name"])
							local scriptJson = game.HttpService:JSONDecode(scriptData)
							loadstring(scriptJson["contents"])()
						end)
						if not success then
							createFile("Error loading script: " .. result)
						end
					end)
				end)
			elseif v["type"] == "folder" then
				createFolder(v["name"], function()
					urlTextBox.Text = urlTextBox.Text .. "/" .. v["name"]
					scrollingFrame:ClearAllChildren()
					createFile("Please refresh")
				end)
			else
				createFile(v["name"])
			end
		end
	else
		createFile("Error: Unknown data type")
	end
end

-- Load data function
local function loadData()
	if loading then
		return
	end
	loading = true
	local done = false
	local dataJson, errorMessage, errorOccurred = nil, "", false

	task.spawn(function()
		local success, result = pcall(function()
			local data = game:HttpGet(urlTextBox.Text)
			dataJson = game.HttpService:JSONDecode(data)
			if dataJson["error"] then
				errorMessage = dataJson["error"]
				errorOccurred = true
			end
		end)
		if not success then
			errorMessage = result
			errorOccurred = true
		end
		done = true
	end)

	local startTime = tick()
	repeat
		task.wait()
		buttonImageLabel.Rotation = -(tick() - startTime) * 360
	until done
	buttonImageLabel.Rotation = 0
	scrollingFrame:ClearAllChildren()

	if errorOccurred then
		createFile(errorMessage)
	else
		handleData(dataJson)
	end
	loading = false
end

loadButton.MouseButton1Click:Connect(loadData)
