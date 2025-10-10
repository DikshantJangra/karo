# Contributing to Karo

First off, thank you for considering contributing to Karo! It's people like you that make open source such a great community.

We welcome any type of contribution, not just code. You can help with:
*   **Reporting a bug**
*   **Discussing the current state of the code**
*   **Submitting a fix**
*   **Proposing new features**

## We Have a Code of Conduct
Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Getting Started

### 1. Fork the Repository
Fork this repository by clicking on the "Fork" button on the top right of this page. This will create a copy of this repository in your account.

### 2. Clone Your Fork
Now, clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the "Code" button and then click the _copy to clipboard_ icon.

Open a terminal and run the following git command:
```bash
git clone "https://github.com/DikshantJangra/karo.git"
```
where `"https://github.com/DikshantJangra/karo.git"` is the url to your forked repository.

### 3. Set Up the Project
Navigate to the project directory and install the dependencies.

```bash
cd karo
npm install
```

### 4. Run the Development Server
Now that you have the project set up, you can run the development server.

```bash
npm run dev
```
This will start the development server at `http://localhost:3000`.

### 5. Create a New Branch
It's important to create a new branch for each new feature or bug fix you're working on.

```bash
git checkout -b your-branch-name
```
Replace `your-branch-name` with a descriptive name for your branch (e.g., `feat/add-login-button` or `fix/header-style`).

### 6. Make Your Changes
Make your changes to the code. Make sure to follow the project's coding style.

### 7. Lint Your Code
Before you commit your changes, make sure to lint your code.

```bash
npm run lint
```
This will check your code for any linting errors and fix them if possible.

### 8. Commit Your Changes
Once you're happy with your changes, you can commit them.

```bash
git add .
git commit -m "Your detailed commit message"
```

### 9. Push to Your Fork
Push your changes to your forked repository.

```bash
git push origin your-branch-name
```

### 10. Create a Pull Request
Go to your repository on GitHub. You'll see a "Compare & pull request" button. Click on that button.

Now submit the pull request. Provide a clear title and description for your pull request, explaining the changes you've made. If your PR fixes an open issue, be sure to link it (e.g., "Closes #123").

## That's It!
Thank you for your contribution! Your pull request will be reviewed, and we'll merge it as soon as possible.
