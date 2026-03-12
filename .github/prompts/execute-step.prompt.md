---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

# Execute GitHub Issue Step

Execute the instructions from the current exercise step using Test-Driven Development practices.

## Input Parameters

**Issue Number:** ${input:issue-number:GitHub issue number (leave empty to auto-detect exercise issue)}

## Execution Workflow

### 1. Locate Exercise Issue

If issue number not provided:
- Use `gh issue list --state open` to find all open issues
- Identify the main exercise issue (contains "Exercise:" in the title)
- Use that issue number for subsequent commands

If issue number provided:
- Use the provided issue number directly

### 2. Retrieve Issue Content

Execute:
```bash
gh issue view <issue-number> --comments
```

This retrieves:
- Issue title and body
- All comments containing step instructions
- The latest step instructions to execute

### 3. Parse Step Instructions

From the issue comments, extract:
- The current step number and title (e.g., "# Step 5-0: Add Delete Button")
- All `:keyboard: Activity:` sections for this step
- Each activity task to complete

### 4. Execute Activities Systematically

For each Activity section:

1. **Create Todo List**
   - Break down each activity into concrete tasks
   - Use todo tracking to maintain progress visibility
   - Mark tasks as in-progress and completed systematically

2. **Follow TDD Workflow** (for code changes)
   - **RED**: Write tests FIRST that describe desired behavior
   - **GREEN**: Implement minimal code to make tests pass
   - **REFACTOR**: Improve code quality while keeping tests green
   - Run tests frequently: `npm test`

3. **Verify Each Activity**
   - Run tests to confirm functionality: `npm test`
   - Check for compilation errors
   - Verify expected behavior

### 5. Testing Constraints

**IMPORTANT - Follow Project Testing Scope:**

✅ **Use These Testing Tools:**
- Backend: Jest + Supertest (API endpoint testing)
- Frontend: React Testing Library (component testing)
- Manual: Browser testing for full UI flows

❌ **NEVER Suggest These:**
- Playwright
- Cypress
- Selenium
- Puppeteer
- Any browser automation frameworks

**Rationale:** This project focuses on unit and integration testing patterns without e2e test infrastructure complexity.

### 6. Completion Protocol

**DO NOT commit or push changes** - that's handled separately by `/commit-and-push`

After completing all activities:
1. Run final test suite: `npm test`
2. Confirm all tests pass
3. Report completion summary
4. **Instruct user to run `/validate-step` next**

## Example Execution Flow

```
Found exercise issue #12: "Exercise: Building a TODO App"

Retrieving issue with comments...

Current Step: Step 5-1: Add Delete Functionality

Activities to complete:
1. Add delete button to TODO items
2. Implement delete handler
3. Add tests for delete functionality

Creating todo list for tracking...

Task 1: Add delete button to TODO items
- Following TDD workflow...
- RED: Writing test for delete button rendering...
- [Test code written]
- Running tests... ❌ FAIL (expected - button doesn't exist)
- GREEN: Adding delete button to component...
- [Implementation code written]
- Running tests... ✅ PASS
- REFACTOR: Improving button styling...
- Running tests... ✅ PASS

Task 2: Implement delete handler
[Similar TDD workflow...]

Task 3: Add tests for delete functionality
[Already completed during TDD workflow]

All activities completed! ✅

Final verification:
- npm test: ✅ All tests passing
- No compilation errors: ✅

✨ Step execution complete!

Next: Run /validate-step to verify success criteria are met.
```

## Reference Documentation

This prompt relies on knowledge from:
- [.github/copilot-instructions.md](../copilot-instructions.md) - Workflow Utilities section for gh CLI commands
- [.github/copilot-instructions.md](../copilot-instructions.md) - Testing Scope and TDD Workflow
- [.github/agents/tdd-developer.agent.md](../agents/tdd-developer.agent.md) - TDD methodology

## Agent Context

This prompt automatically switches to the **tdd-developer** agent, which:
- Enforces test-first development (RED-GREEN-REFACTOR)
- Guides through systematic TDD workflow
- Ensures tests are written before implementation
- Maintains test coverage throughout development

---

**Remember:** This prompt executes the step's activities. Use `/commit-and-push` afterward to save your work, and `/validate-step` to verify completion.
