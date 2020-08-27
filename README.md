<div align="center">

<img height=200px src="./READMEassets/doughnut.png">

<h1>DONUT</h1>

codeuino's open source social platform <br><br>

[![Slack Status](https://img.shields.io/badge/slack-chat-yellow.svg?logo=slack)](https://codeuino.slack.com) [![PRs Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?logo=github)](http://makeapullrequest.com) [![Issues Open](https://img.shields.io/github/issues-raw/codeuino/Social-Platform-Donut.svg?color=orange&logo=github)](https://github.com/codeuino/Social-Platform-Donut/issues) [![License: Docs v3](https://img.shields.io/badge/License-GPLv3-blue.svg?logo=github)](https://www.gnu.org/licenses/gpl-3.0) [![License: Docs v3](https://img.shields.io/badge/Documentation-Gitbook-blue.svg?logo=github)](https://docs.codeuino.org/donut-social-networking-platform/)

</div>

# About

Being inspired by the Cornucopia of various social hub this project has been developed taking into consideration about open source.

Well, this is an Open Source Social networking hub which acts as a bridge between various Developers, Organisations and Open Source aspirants to elaborate on various things like Projects, Events, Discussion on various researches, Scholarships, Coding release and various other things updates.

The major priority of this project has been that this platform allows users to make their project "Open Sourced" and released them under various open source Organisations, experts which hold up a ring plate on this portal.

This platform also makes users introduce and develops various solutions in the form of FOSS software to publish them for public use by integrating them with their social cause. Moreover, this project can be downloaded by any user, organization and can be used by them in their own custom way, making it run on their servers.

### Frontend Technology Stack

- SCSS: Styling web pages, html files
- Javascript: Primary programing language
- ReactJS v16.12: Javascript library for building User Interfaces
- Bootstrap: Styling framework.

Learn more about the donut platform at the [official donut documentation](https://docs.codeuino.org/donut-social-networking-platform/).

---

# Setting up the work environment.

Few things are required before setting up the project locally,

- **A Web Browser** - You can install any browser as per your preference e.g. Google Chrome etc. JavaScript works on any web browser on any OS.
- **An Editor**- We prefer an editor which has built-in features of IntelliSense support and syntax error highlighter for speedy development. Download Visual Studio Code from [here](https://code.visualstudio.com/download).
- **Node and Node Package Manager(NPM)**
  Check if node and npm are already installed by running the following commands in the terminal
  `node -v npm -v`
  If the node and npm are installed
  If not, install it in,
- **Windows & MacOS**

  Installing Node and NPM on Windows and macOS is straightforward because you can just use the provided installer:
  Go to https://nodejs.org/en/
  Select the button to download the LTS build that is "Recommended for most users".
  Install Node by double-clicking on the downloaded file and following the installation prompts.

- **Ubuntu**
  The easiest way to install the most recent LTS version of Node 10.x is to use the [package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) to get it from the Ubuntu _binary distributions_ repository. This can be done very simply by running the following two commands on your terminal:
  `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - sudo apt-get install -y nodejs`
  **\***

# Setting up the donut frontend potion locally.

**Forking The Repository**

The first step of setting the donut frontend locally is to fork the original repository. This creates a copy of that repository under your own account enabling you to begin working with the code. The rights to public repositories will be such that you can view the code, but not directly commit into the repository or create branches. This allows the project owners to control changes within their codebase.

The forking step creates a copy to which you do have permission to commit and branch on and you can consider this your working copy of the project. You can make changes and commits here, safe in the knowledge that you will not affect the main repository.

In order to fork the donut frontend repository visit [here](https://github.com/codeuino/social-platform-donut-frontend)

![](https://i.imgur.com/bWLML1u.png)

**Cloning the forked repository**

In order to clone the forked repository visit fork of the donut repository under "your repositories" section and click on the “Clone or download” which will open a UI showing the Git URL. A button to the right hand side of the URL allows you to copy it into your clipboard.

![](https://i.imgur.com/2UyN3KV.png)
There are various graphical tools you can use to work with Git repositories but for simple procedures, the command line is often fastest.

Open a command window and navigate to the path where you would like to clone the repository.
Use the following command to begin a clone:

```
git clone https://github.com/<your github username>/social-platform-donut-frontend.git
```

Once the command completes you will have a new folder containing the cloned repository. We can validate this by running the “dir” command. We can then move into that directory using the "cd social-platform-donut-frontend" command.

![image of command line](https://i.imgur.com/QsQy4Sg.png)

**Setting up a remote upstream**

The next step is to set up a remote. Remotes simply represent paths or URLs to other versions of your repository. In our case, as we cloned from our fork on GitHub a default remote will have been setup for us called origin. This origin allows us to push and pull code from our forked repository hosted on GitHub. We can list the currently configured remotes on our machine using the “git remote” command.

Pushing and pulling from your own fork is very useful and this will be how you will work with the project most often. However, when working on that code, you’ll want to be starting from the most recent version of the code from the main donut-frontend repository. That code may have been updated and changed since you first made your fork. In order to get access to that latest code, we’ll setup a second remote which points to the main donut-frontend repository. We will not have commit rights there, so we cannot push changes, however, we will be able to fetch the latest commits that have occurred.

To create a new remote we use the “git remote add” command, passing in a name for the new remote and the URL as arguments. In our case since we want the second remote to point towards the original donut-frontend repository we will use the follwing command. It's possible to name the remote anything you like, but the convention is to name it "upstream".

```
git remote add upstream https://github.com/codeuino/social-platform-donut-frontend.git
```

**Installing the dependencies and running our local version of donut-frontend**

The next step is to install the required dependencies to our newly created donut-frontend app. This could be done by running the following command in the terminal.

```
npm install
```

The npm install command will install all the project dependencies mentioned in the package.json file.  
Once all the dependencies are completely installed the final step is to run our local instance using the following command.

```
npm start
```

Now visit the [http://localhost:3000](http://localhost:3000) using your favorite browser to see your very own donut-frontend app in action!

There are few last steps to follow however before you can start exploring the donut platform.
To get most out of locally setup frotnend environment, we highly suggest to setup an instance of the donut backend as well. The backend repository could be found at [https://github.com/codeuino/social-platform-donut-backend](https://github.com/codeuino/social-platform-donut-backend)

1. Once the backend environment is successfully setup, create a new Organization/Community by visiting the link [http://localhost:3000/setup](http://localhost:3000/setup). Follow the instructions and fill in the fields provided by the screen.
2. The next step is sign up using a new admin account. This could be achieved by visiting the [http://localhost:3000/admin](http://localhost:3000/admin) and using the "Admin Account Signup card."
3. Login using the newly created admin account.

You are now all set to explore the donut platform!

# Contributing to the donut frontend.

**Choosing an issue**

The first step when contributing to donut-frontend is to visit the project site and find an issue you would like to work on and which you think is suitable for your skill set. From the project homepage on GitHub you can click the Issues tab to navigate to a list of the open issues.

![enter image description here](https://i.imgur.com/ncLCy84.jpg)
After chosing an issue from the issues tab click on that particular issue to view more details about it. The issue details page provides the full information about the issue. Usually the top comment will include details of the bug or the feature that is needed. Issues can be raised by anyone and as a result, the level of detail may not always be sufficient to understand the problem or requirement. On allReady, the project owners and core contributors try to view new issues and triage them. This involves verifying the issue being reported is valid and where necessary, providing some further details or guidance. If it’s not clear what is needed from an issue, you can leave a comment to ask questions about it. If you have an idea for a solution, but want to run it past the project team before starting, work, you can leave a comment for that too. Issues are a good place for open discussions like this.

**Working on an issue**

When beginning work on an issue locally, the first thing you’ll need to do is to create a branch for that piece of work. There are many Git UI tools that allow you to create a branch, for this demo we’ll use the command line. To create and checkout a branch you can use a single command.

```
git checkout -b <branchname>
```

This command allows us to specify a name for our new branch and immediately check it out so we can work on it. It's common to name the branch with the issue number. For exmaple if we are working on the issue #223 it would be a good idea to name the branch,

```
git checkout -b 223
```

Once we are on our new branch we can make changes to the code which address the issue. When we have made the required changes that address a particular issue, we need to commit that code to our branch. We can use the “git status” command to view the changes since our last commit.

```
git status
```

We then use the “git add” command to stage the changes for the next commit. It's possible to add the files one by one by spcifying their relative path afterwards. For example if we want to add the corrections.js file in the same directory,

```
git add corrections.js
```

However if you want to stage all the files that have been changed, it's also possible with the follwing command.

```
git add .
```

Next we will commit our staged changes using the “git commit” command. In this case we can use the following example:

```
git commit -m "Fix readme typo"
```

The -m option allows us to specify a message for our commit. It’s good practice to try and provide a succinct, but descriptive message for your commits. This helps a reviewer understand at a high level what was addressed in each commit.

At this point we have made and committed out changes local to our development machine. Our final step is to push the changes to our fork of the allReady repository up on GitHub. We can do that using the “git push” command. We need to specify the name of the remote that we want to push to and the name of the branch we want to push up.

```
git push origin 223
```

Now the changes we have made are pushed into our fork in GitHub. The final step is to make a pull request . A **pull request** (PR) is a method of submitting contributions to an open development project. It occurs when a developer asks for changes committed to an external repository to be considered for inclusion in a project's main repository after the peer review.

In order to make a pull request, visit the forked repository on github. On the top right hand side a button will now be there mentioning that a pull request is ready to be made.

Prior to making the PR make sure to choose the base branch as development branch using the dropdown.
![enter image description here](https://i.imgur.com/bTN9On5.jpg)
Click on the "compare and pull request" button to make the pull request!
