# Development Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It serves as a knowledge base that helps both human developers and AI assistants understand the project's evolution, avoid repeating mistakes, and apply proven solutions consistently.

## Two Types of Memory

### Persistent Memory
**Location**: `.github/copilot-instructions.md`
- **Contains**: Foundational principles, workflows, and established guidelines
- **Nature**: Stable, well-tested rules that apply broadly across the project
- **Update Frequency**: Infrequent, only when core principles change
- **Examples**: TDD workflow, commit conventions, coding standards

### Working Memory
**Location**: `.github/memory/` directory
- **Contains**: Discoveries, patterns, session notes, and active findings
- **Nature**: Evolving knowledge from hands-on development
- **Update Frequency**: Regularly during and after development sessions
- **Examples**: Bug patterns, API quirks, integration notes

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the memory system
├── session-notes.md             # Historical summaries of completed sessions (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns and solutions (COMMITTED)
└── scratch/
    ├── .gitignore               # Ignores all files in scratch/ directory
    └── working-notes.md         # Active session notes (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Committed to Git)
- **Purpose**: Historical record of completed development sessions
- **When to Update**: At the END of each significant development session
- **Content**: Summary of what was accomplished, key findings, and outcomes
- **Why Commit**: Creates a searchable history of project evolution
- **Think of It As**: Your development journal/changelog

#### `patterns-discovered.md` (Committed to Git)
- **Purpose**: Library of recurring code patterns and solutions
- **When to Update**: When you discover a pattern that's likely to recur
- **Content**: Documented patterns with context, problem, solution, and examples
- **Why Commit**: Shared knowledge base for the entire team
- **Think of It As**: Your project's pattern catalog

#### `scratch/working-notes.md` (NOT Committed)
- **Purpose**: Active workspace for current session notes
- **When to Update**: Throughout your current development session
- **Content**: Real-time observations, decisions, blockers, next steps
- **Why NOT Commit**: Reduces noise in git history, keeps ephemeral notes local
- **Think of It As**: Your scratch pad or whiteboard

## When to Use Each File

### During TDD Workflow (Red-Green-Refactor)

**RED Phase (Writing Failing Tests)**:
- **Use**: `scratch/working-notes.md`
- **Track**: Test cases being written, expected behavior, edge cases
- **Example Note**:
  ```markdown
  ## Current Task: Add DELETE endpoint for TODOs
  - Writing test for successful deletion (200 response)
  - Writing test for non-existent ID (404 response)
  - Need to verify todos array is updated after deletion
  ```

**GREEN Phase (Making Tests Pass)**:
- **Use**: `scratch/working-notes.md`
- **Track**: Implementation approach, API decisions, data flow
- **Example Note**:
  ```markdown
  ## Approach
  - Using todos.filter() to remove item by id
  - Need to parse id as integer (route params are strings)
  - Returning deleted item in response body
  
  ## Decisions Made
  - Return 404 if ID not found (consistent with GET /:id)
  - Return the deleted item for confirmation
  ```

**REFACTOR Phase**:
- **Use**: `scratch/working-notes.md` + `patterns-discovered.md`
- **Track**: Code improvements, patterns emerging
- **Example**:
  ```markdown
  ## Key Findings
  - ID parsing needed in multiple endpoints (GET/:id, PUT/:id, DELETE/:id)
  - Could extract to middleware: parseIdParam()
  
  [Later add this pattern to patterns-discovered.md]
  ```

### During Linting/Code Quality Workflow

**Initial Analysis**:
- **Use**: `scratch/working-notes.md`
- **Track**: Categories of errors, systematic issues
- **Example Note**:
  ```markdown
  ## Current Task: Fix lint errors in backend
  - 15 errors found, categorizing...
  - Most common: unused variables (8)
  - Also: missing semicolons (4), console.log statements (3)
  ```

**Systematic Fixes**:
- **Use**: `scratch/working-notes.md`
- **Track**: Progress through each category
- **Example Note**:
  ```markdown
  ## Approach
  1. ✅ Fixed unused variables - removed or prefixed with _
  2. ⏳ Fixing semicolons
  3. ⏳ Remove console.log (replace with proper logging)
  ```

**Pattern Discovery**:
- **Use**: `patterns-discovered.md`
- **Update**: If you find recurring linting issues
- **Example**:
  ```markdown
  ### Pattern: Jest Test Variables
  **Problem**: Jest globals like `describe`, `it`, `expect` flagged as undefined
  **Solution**: Configure ESLint with jest environment or use /* global describe, it, expect */
  **Related Files**: All test files in __tests__/
  ```

### During Debugging Workflow

**Initial Investigation**:
- **Use**: `scratch/working-notes.md`
- **Track**: Symptoms, hypothesis, debugging steps
- **Example Note**:
  ```markdown
  ## Current Task: Debug 404 error on GET /api/todos/:id
  
  ## Key Findings
  - Route defined in app.js line 45
  - Test passing locally but failing in CI
  - URL showing: /api/todos/undefined
  
  ## Blockers
  - Need to check how test constructs the URL
  ```

**Root Cause Found**:
- **Use**: `scratch/working-notes.md` → Later move to `patterns-discovered.md`
- **Track**: The discovery and solution
- **Example Note**:
  ```markdown
  ## Key Findings
  - Issue: Test was using template literal ${id} instead of ${todo.id}
  - Root Cause: Variable shadowing - `id` undefined in that scope
  - Fix: Use correct variable reference
  
  [Document this common mistake in patterns-discovered.md]
  ```

**Session End**:
- **Use**: `session-notes.md`
- **Document**: Summary of the debugging session
- **Example**:
  ```markdown
  ## Session: Debug TODO API Tests (2026-03-12)
  
  ### What Was Accomplished
  - Fixed 404 errors in GET /api/todos/:id endpoint tests
  - All backend tests now passing
  
  ### Key Findings
  - Variable shadowing causing undefined ID in test URLs
  - Need to be careful with variable scope in test setup
  
  ### Outcomes
  - ✅ Backend test suite: 100% passing
  - ✅ No lint errors remaining
  ```

## How AI Reads and Applies These Patterns

When GitHub Copilot (or similar AI assistants) works on this codebase:

1. **Context Loading**:
   - Reads `.github/copilot-instructions.md` for foundational principles
   - Scans `.github/memory/patterns-discovered.md` for known patterns
   - Reviews recent entries in `.github/memory/session-notes.md` for context

2. **Pattern Application**:
   - When generating code, checks if similar patterns exist in `patterns-discovered.md`
   - Applies documented solutions rather than inventing new approaches
   - Avoids patterns marked as problematic

3. **Consistency**:
   - Uses established naming conventions from patterns
   - Follows architectural decisions documented in session notes
   - Maintains consistency with recent work

4. **Learning**:
   - As you document new patterns, AI learns project-specific conventions
   - Better suggestions over time as the knowledge base grows

**Example**:
```markdown
# In patterns-discovered.md:
### Pattern: Service Initialization - Empty Array vs Null
**Problem**: Inconsistent handling of empty TODO lists
**Solution**: Always initialize todos as empty array [], never null
**Why**: Array methods work without null checks, consistent for new users

# Now when AI generates code:
let todos = [];  // ✅ AI applies the pattern
// Not: let todos = null;  // ❌ AI avoids this
```

## Workflow Summary

### During Active Development
1. ✍️ Take notes in `scratch/working-notes.md`
2. 🔍 Document your approach, findings, and decisions
3. 📝 Update in real-time as you work

### At Session End
1. 📋 Review `scratch/working-notes.md`
2. ✨ Extract key findings into `session-notes.md`
3. 🔖 Document new patterns in `patterns-discovered.md`
4. 🗑️ Clear or archive `scratch/working-notes.md` for next session

### Over Time
1. 📚 `session-notes.md` grows as a historical record
2. 🎯 `patterns-discovered.md` becomes your pattern library
3. 🤖 AI assistants become more context-aware
4. ⚡ Development becomes faster and more consistent

## Best Practices

1. **Be Specific**: Include file names, line numbers, and concrete examples
2. **Be Concise**: Use bullet points and clear headings
3. **Be Consistent**: Use the same format for similar types of notes
4. **Review Regularly**: Periodically review session-notes.md to identify broader patterns
5. **Keep Scratch Clean**: Start each session fresh in working-notes.md
6. **Document Decisions**: Capture not just what, but WHY decisions were made
7. **Link Context**: Reference related files and issues for traceability

## Questions?

If you're unsure which file to use, ask yourself:

- **Is this temporary/exploratory?** → `scratch/working-notes.md`
- **Is this a completed session summary?** → `session-notes.md`
- **Is this a reusable pattern?** → `patterns-discovered.md`
- **Is this a fundamental principle?** → `.github/copilot-instructions.md`

When in doubt, start in `scratch/working-notes.md` and promote to other files later.
