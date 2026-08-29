//Repository Setup
# Initialize a new Git repository in current folder
git init

# Clone an existing GitHub repository
git clone https://github.com/username/repo.git

//Remote Repository
# Add a remote (connect local repo to GitHub)
git remote add origin https://github.com/username/repo.git

# Check remote URLs
git remote -v

# Change remote URL
git remote set-url origin https://github.com/username/new-repo.git

//Staging & Committing
# Add all files to staging
git add .

# Add specific file
git add filename.txt

# Commit with message
git commit -m "Initial commit"

//Branching & Switching
# Create a new branch
git branch feature-branch

# Switch to that branch
git checkout feature-branch

# Create + switch in one step
git checkout -b feature-branch

# Rename current branch to main
git branch -M main

# List all branches
git branch

//Staging-Unstaging Workflow
# Create and switch to a new branch
git checkout -b dev

# Make changes, then stage them
git add index.html

# Oops, don’t want it staged → unstage
git restore --staged index.html

# Stage again and commit
git add index.html
git commit -m "Update homepage"

# Push branch to GitHub
git push -u origin dev

//Merging Workflow
# Create and switch to a new branch
git checkout -b dev

# Work, stage, commit
git add index.html
git commit -m "Update homepage"

# Switch back to main
git checkout main

# Merge dev into main
git merge dev

# Push to GitHub
git push origin main


//Pushing & Pulling
# Push to GitHub (main branch)
git push -u origin main

# Push to GitHub (master branch)
git push -u origin master

# Pull latest changes from GitHub
git pull origin main

//Branch Management
# Create new branch
git branch feature-branch

# Switch branch
git checkout feature-branch

# Create + switch in one command
git checkout -b feature-branch

# Rename branch to main
git branch -M main

# Push branch to GitHub
git push -u origin feature-branch

//Logs & Status
# Show commit history
git log

# Show concise commit history
git log --oneline

# Show current status
git status


//Undo & Reset
# Unstage file
git reset filename.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

//Authentication
git remote add origin git@github.com:username/repo.git

//One‑Line Workflow (Fresh Repo)
git init && git remote add origin https://github.com/username/repo.git && git add . && git commit -m "Initial commit" && git branch -M main && git push -u origin main


