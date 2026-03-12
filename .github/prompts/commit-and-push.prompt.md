---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

# Commit and Push Changes

Analyze workspace changes, generate a conventional commit message, and push to a feature branch.

## Input Parameters

**Branch Name:** ${input:branch-name:Feature branch name (e.g., feature/add-delete-button)}

## Commit Workflow

### 1. Validate Branch Name

- Ensure branch name is provided (REQUIRED)
- If not provided, stop and request branch name from user
- Branch should follow naming convention:
  - `feature/<descriptive-name>` for new features
  - `fix/<issue-description>` for bug fixes

### 2. Analyze Changes

Execute:
```bash
git status
git diff
```

Analyze:
- Which files have been modified
- What functionality was added or changed
- Scope of the changes (frontend, backend, tests, docs, etc.)

### 3. Generate Conventional Commit Message

Follow the conventional commit format:

**Format:**
```
<type>: <description>

[optional body]
```

**Types:**
- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring without behavior change
- `chore:` - Maintenance tasks (dependencies, configs)
- `docs:` - Documentation changes
- `style:` - Code style/formatting changes

**Examples:**
```
feat: add delete button to TODO items
fix: resolve API endpoint 404 error
test: add tests for TODO deletion
chore: update ESLint configuration
refactor: extract utility functions for reusability
```

**Message Guidelines:**
- Use imperative mood ("add" not "added")
- Keep description concise (50-72 characters)
- Don't capitalize first letter after type
- No period at the end
- Body is optional for simple changes

### 4. Branch Management

Execute the following Git commands in sequence:

**Check if branch exists:**
```bash
git branch --list <branch-name>
```

**If branch doesn't exist:**
```bash
git checkout -b <branch-name>
```

**If branch exists:**
```bash
git checkout <branch-name>
```

### 5. Stage All Changes

Execute:
```bash
git add .
```

This stages all modified, new, and deleted files.

### 6. Commit with Generated Message

Execute:
```bash
git commit -m "<generated-commit-message>"
```

### 7. Push to Remote Branch

Execute:
```bash
git push origin <branch-name>
```

**Note:** If this is the first push to a new branch, Git will automatically set up tracking.

### 8. Verify Success

Confirm:
- Commit was created successfully
- Push completed without errors
- Remote branch is up to date

Report:
- Branch name
- Commit message used
- Files changed
- Push status

## Safety Constraints

**CRITICAL RULES:**

❌ **NEVER commit to `main` branch**
- Always use the user-provided branch name
- Main branch should only receive changes via pull requests

❌ **NEVER push without a branch name**
- Branch name is REQUIRED
- Stop and ask if not provided

✅ **ONLY commit to the specified feature/fix branch**
- Create branch if it doesn't exist
- Switch to branch if it exists
- Push to that branch only

## Example Execution

```
Branch name provided: feature/add-delete-button

Step 1: Analyzing changes...
Modified files:
- packages/frontend/src/App.js (added delete button UI)
- packages/frontend/src/__tests__/App.test.js (added delete tests)

Step 2: Generating commit message...
Type: feat (new feature)
Description: add delete button to TODO items

Generated message: "feat: add delete button to TODO items"

Step 3: Checking if branch exists...
Branch 'feature/add-delete-button' not found.

Step 4: Creating new branch...
✅ Created and switched to 'feature/add-delete-button'

Step 5: Staging all changes...
✅ Staged 2 files

Step 6: Committing changes...
✅ Commit created: feat: add delete button to TODO items

Step 7: Pushing to remote...
✅ Pushed to origin/feature/add-delete-button

Summary:
- Branch: feature/add-delete-button
- Commit: feat: add delete button to TODO items
- Files changed: 2
- Push: ✅ Success

Your changes are now pushed to the feature branch!
```

## Pre-Commit Checks

Before committing, verify:

✅ All tests pass: `npm test`
✅ No lint errors: `npm run lint` (if required by workflow)
✅ Code is functional and complete
✅ Changes are ready to commit

**Note:** This prompt focuses on the Git workflow. Run `/validate-step` to verify success criteria before committing.

## Reference Documentation

This prompt relies on knowledge from:
- [.github/copilot-instructions.md](../copilot-instructions.md) - Git Workflow section
- [.github/copilot-instructions.md](../copilot-instructions.md) - Conventional Commits format
- [.github/copilot-instructions.md](../copilot-instructions.md) - Branch Strategy

## Agent Context

This prompt does NOT specify an agent mode, so it:
- Works with any currently active agent
- Can be used after `/execute-step` (tdd-developer context)
- Can be used after `/validate-step` (code-reviewer context)
- Operates in default mode if no agent is active

---

**Remember:** Always use a feature or fix branch name. Never commit directly to main.
