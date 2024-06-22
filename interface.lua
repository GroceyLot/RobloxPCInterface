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
scrollingFrame.AutomaticSize = Enum.AutomaticSize.Y
listLayout.Parent = scrollingFrame
listLayout.SortOrder = Enum.SortOrder.LayoutOrder
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
buttonImageLabel.Image = "rbxassetid://4512344746"
aspectRatioConstraint.Parent = buttonImageLabel

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
