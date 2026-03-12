---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ["search", "read", "execute", "web", "todo"]
---

# Validate Step Success Criteria

Verify that all success criteria for the specified exercise step have been met.

## Input Parameters

**Step Number:** ${input:step-number:Step number to validate (e.g., 5-0, 5-1)}

## Validation Workflow

### 1. Locate Exercise Issue

Execute:
```bash
gh issue list --state open
```

Find the main exercise issue:
- Look for issue with "Exercise:" in the title
- Use that issue number for subsequent commands

### 2. Retrieve Issue with All Comments

Execute:
```bash
gh issue view <issue-number> --comments
```

This retrieves:
- Issue title and body
- All comments containing step definitions
- Success criteria for each step

### 3. Find Target Step

Search through the issue content for:
```
# Step {step-number}:
```

For example, if validating step "5-1", search for:
```
# Step 5-1:
```

Extract:
- Step title
- Step instructions
- Success Criteria section

### 4. Extract Success Criteria

Locate the "Success Criteria" or "Success criteria" section within the step.

Typical format:
```markdown
## Success Criteria
- [ ] Criterion 1 description
- [ ] Criterion 2 description
- [ ] Criterion 3 description
```

Parse each criterion into a checklist.

### 5. Validate Each Criterion

For each success criterion, systematically check:

**Code Changes:**
- Search for specific files mentioned
- Verify functions/components exist
- Check implementation matches requirements

**Test Coverage:**
- Locate test files mentioned in criteria
- Verify tests exist and cover required scenarios
- Run test suite: `npm test`
- Confirm all tests pass

**Functionality:**
- Check that features work as described
- Verify error handling if specified
- Confirm edge cases are handled

**Code Quality:**
- Run linter: `npm run lint`
- Check for errors or warnings
- Verify code follows project standards

### 6. Report Validation Results

For each criterion:

✅ **Pass**: Criterion is fully met
- Explain what was verified
- Show evidence (file locations, test results, etc.)

❌ **Fail**: Criterion is not met or incomplete
- Explain what is missing
- Provide specific guidance on what needs to be done
- Reference relevant files or tests

⚠️ **Partial**: Criterion is partially met
- Explain what is complete
- Explain what still needs work
- Provide actionable next steps

### 7. Generate Summary

Provide:
- Total criteria count
- Pass/Fail/Partial breakdown
- Overall step completion status
- Next actions if incomplete

## Example Validation Flow

```
Step Number: 5-1

Locating exercise issue...
Found: Issue #12 "Exercise: Building a TODO App"

Retrieving issue with comments...

Searching for "# Step 5-1:"...
Found: Step 5-1: Add Delete Functionality

Extracting Success Criteria...

Success Criteria:
1. ✅ Delete button appears on each TODO item
2. ✅ Clicking delete removes the item from the list
3. ✅ Tests verify delete functionality
4. ❌ No console errors in browser

Validating each criterion:

1. Delete button appears on each TODO item
   ✅ PASS
   - Found delete button in App.js line 42
   - Button rendered for each TODO item
   - Evidence: packages/frontend/src/App.js

2. Clicking delete removes the item from the list
   ✅ PASS
   - Delete handler implemented in App.js line 15
   - Handler filters out deleted item
   - State updates correctly
   - Evidence: packages/frontend/src/App.js

3. Tests verify delete functionality
   ✅ PASS
   - Test file: packages/frontend/src/__tests__/App.test.js
   - Tests cover: button rendering, click handler, item removal
   - All tests passing: npm test shows 12 passing
   - Evidence: Test suite output

4. No console errors in browser
   ❌ FAIL
   - Console.log statement found at App.js:16
   - This will cause lint errors and clutter console
   - Action needed: Remove or wrap in conditional
   - File: packages/frontend/src/App.js:16

Summary:
- Total Criteria: 4
- Passed: 3
- Failed: 1
- Partial: 0

Overall Status: INCOMPLETE ⚠️

Next Steps:
1. Remove console.log statement at App.js:16
2. Run npm run lint to check for other issues
3. Run /validate-step 5-1 again to confirm

Once all criteria pass, proceed to /commit-and-push.
```

## Validation Guidelines

**Thoroughness:**
- Check each criterion completely
- Don't assume - verify with code inspection
- Run actual commands (tests, lint) for evidence

**Specificity:**
- Reference exact file names and line numbers
- Show specific test names that pass/fail
- Provide actionable guidance for failures

**Code Quality Focus:**
- Check for lint errors that violate criteria
- Verify code follows project standards
- Ensure tests are meaningful (not just passing)

## Common Success Criteria Patterns

**Feature Implementation:**
- Component/function exists
- UI elements render correctly
- State management works properly
- Event handlers respond correctly

**Test Coverage:**
- Test files exist
- Tests cover specified scenarios
- All tests pass
- No skipped or pending tests

**Code Quality:**
- No lint errors
- No console statements (unless intentional)
- No unused variables
- Follows coding standards

**Manual Verification:**
- Feature works in browser
- No console errors
- UI looks correct
- Edge cases handled

## Pre-Commit Validation

This validation should occur BEFORE running `/commit-and-push`:

1. Run `/execute-step` to complete activities
2. Run `/validate-step` to verify success criteria  ← **YOU ARE HERE**
3. Fix any failing criteria
4. Re-run `/validate-step` until all pass
5. Run `/commit-and-push` to save work

## Reference Documentation

This prompt relies on knowledge from:
- [.github/copilot-instructions.md](../copilot-instructions.md) - Workflow Utilities section for gh CLI commands
- [.github/copilot-instructions.md](../copilot-instructions.md) - Testing scope and standards
- [.github/agents/code-reviewer.agent.md](../agents/code-reviewer.agent.md) - Code quality review methodology

## Agent Context

This prompt automatically switches to the **code-reviewer** agent, which:
- Systematically analyzes code quality
- Identifies issues and anti-patterns
- Provides specific, actionable guidance
- Ensures code meets project standards

---

**Remember:** Validation ensures your work meets all requirements before committing. Fix any failing criteria and re-validate before proceeding to `/commit-and-push`.
