# BookStore

This is the BookStore project repository.

## How to Pull This Branch to Your PC

If you want to pull this branch (`copilot/pull-branch-to-local-pc`) to your local PC, follow one of these methods depending on your situation:

### Method 1: Clone the Repository and Checkout the Branch (Fresh Start)

If you don't have the repository on your PC yet:

```bash
# Clone the repository
git clone https://github.com/Skrisi23/BookStore.git

# Navigate to the repository directory
cd BookStore

# Checkout the branch
git checkout copilot/pull-branch-to-local-pc
```

### Method 2: Pull the Branch (If You Already Have the Repository)

If you already have the repository cloned on your PC:

```bash
# Navigate to your local repository directory
cd BookStore

# Fetch the latest changes from remote
git fetch origin

# Checkout the branch
git checkout copilot/pull-branch-to-local-pc

# Pull the latest changes (optional, ensures you have the most recent updates)
git pull origin copilot/pull-branch-to-local-pc
```

### Method 3: Using Git GUI Tools

If you prefer using a graphical interface:

**GitHub Desktop:**
1. Open GitHub Desktop
2. Click "File" → "Clone repository"
3. Enter the repository URL: `https://github.com/Skrisi23/BookStore`
4. Choose a local path and click "Clone"
5. Once cloned, click on the "Current Branch" dropdown
6. Select `copilot/pull-branch-to-local-pc` from the branch list

**Visual Studio / VS Code:**
1. Use the built-in Git integration
2. Clone the repository or open an existing one
3. Use the branch selector to switch to `copilot/pull-branch-to-local-pc`

## Project Structure

- **Backend/**: Contains the .NET backend solution for the BookStore application

## Requirements

- Git installed on your PC ([Download Git](https://git-scm.com/downloads))
- For building the backend: .NET SDK

## Getting Started

After pulling the branch, you can explore the project:

```bash
# Navigate to the Backend directory
cd Backend

# Restore NuGet packages (if using .NET)
dotnet restore

# Build the solution
dotnet build
```

## Need Help?

If you encounter any issues pulling the branch:

1. Make sure Git is installed: `git --version`
2. Check your internet connection
3. Verify you have access to the repository
4. Check the branch exists: `git ls-remote --heads origin`

For more Git help, visit the [Git Documentation](https://git-scm.com/doc).
