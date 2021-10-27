# Assessment Project
The repo for React Native Assessment Project


## 1. Installation Instructions.

- You must have Xcode installed on your macOS.

- You can install [react native cli](https://reactnative.dev/docs/environment-setup) or follow the instructions below.


> **Install brew**
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> **Install cocoapods**
```
sudo gem install cocoapods
```


> **Install node and watchman**
```
brew install node
brew install watchman
```

> **Setup Xcode Command Line Tools**
>
> You will also need to install the Xcode Command Line Tools. 
> Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

![Xcode Screenshot](https://d33wubrfki0l68.cloudfront.net/034d429a7cfa4674b9d23aca7fe779e6e1cca622/c6cb8/assets/images/gettingstartedxcodecommandlinetools-8259be8d3ab8575bec2b71988163c850.png)



> Setup js dependencies.
>  *You can use either* ***npm*** *or* ***yarn*** *for this step.*


> **Via NPM**
```
cd react-native-assessment-project
npm i
```

### OR
> **Via Yarn**
```
npm install --global yarn
```
```
cd react-native-assessment-project
yarn install
```


> Setup Cocoapod dependencies inside the react-native-assessment-project repo
```
cd ios
pod install
```


## 2. Running the application

Inside the project folder go to "constants" folder there will be a file named "APIConstants.js", open that file and add your authentication token inside the quotes to make the application work.

```
cd react-native-assessment-project
react-native run-ios
```
This should run the application on the iOS simulator.
