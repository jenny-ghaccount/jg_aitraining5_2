# GitHub Copilot Instructions - TODO Application

## Project Context

This is a full-stack TODO application with the following characteristics:

- **Frontend**: React application with Material-UI components
- **Backend**: Express.js REST API server
- **Development Approach**: Iterative, feedback-driven development with emphasis on testing
- **Current Phase**: Backend stabilization and frontend feature completion
- **Architecture**: Monorepo structure with separate frontend and backend packages

## Documentation References

Refer to these project documentation files for detailed guidance:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and testing standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles throughout development:

- **Test-Driven Development (TDD)**: Follow the Red-Green-Refactor cycle strictly
- **Incremental Changes**: Make small, testable modifications rather than large rewrites
- **Systematic Debugging**: Use test failures as guides to identify and resolve issues
- **Validation Before Commit**: Ensure all tests pass and no lint errors exist before committing

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Testing Stack
- **Backend**: Jest + Supertest for API endpoint testing
- **Frontend**: React Testing Library for component unit and integration tests
- **Manual Testing**: Browser-based manual verification for full UI flows

### Important Testing Constraints
- **DO NOT** suggest or implement end-to-end (e2e) test frameworks such as:
  - Playwright
  - Cypress
  - Selenium
  - Puppeteer
- **DO NOT** suggest browser automation tools
- **Reason**: This lab focuses on unit/integration testing patterns without the complexity of e2e infrastructure

### Testing Approach by Context

**Backend API Changes**:
- Write Jest tests FIRST that define expected behavior
- Run tests to see them FAIL (RED)
- Implement the minimal code to make tests PASS (GREEN)
- Refactor for quality while keeping tests passing (REFACTOR)

**Frontend Component Features**:
- Write React Testing Library tests FIRST for component behavior
- Run tests to see them FAIL (RED)
- Implement the component code to make tests PASS (GREEN)
- Refactor for quality while keeping tests passing (REFACTOR)
- Follow with manual browser testing for full UI flows and visual verification

**This is true TDD**: Test first, then write code to pass the test.

## Workflow Patterns

Follow these structured workflows for different development activities:

### 1. TDD Workflow (Red-Green-Refactor)
1. Write test that describes desired behavior
2. Run test suite and verify the new test FAILS
3. Implement minimal code to make the test PASS
4. Refactor code for quality and maintainability
5. Ensure all tests still pass after refactoring

### 2. Code Quality Workflow
1. Run lint command to identify issues
2. Categorize issues by type (syntax, style, best practices)
3. Fix issues systematically, one category at a time
4. Re-run lint to validate all issues are resolved
5. Commit fixes with appropriate commit message

### 3. Integration Workflow
1. Identify the integration issue or requirement
2. Debug to understand current behavior
3. Write or update tests to cover the scenario
4. Implement the fix or feature
5. Verify end-to-end functionality manually

## Agent Usage

Use specialized agents for specific types of work:

### tdd-developer Agent
Use for:
- Writing new tests (unit or integration)
- Implementing features using TDD approach
- Debugging failing tests
- Refactoring code while maintaining test coverage
- Any work following the Red-Green-Refactor cycle

### code-reviewer Agent
Use for:
- Addressing lint errors and warnings
- Code quality improvements
- Ensuring adherence to coding standards
- Identifying potential bugs or anti-patterns
- Reviewing code before commits

## Memory System

Track development discoveries and lessons learned using a structured memory system:

### Persistent Memory
- **Location**: This file (`.github/copilot-instructions.md`)
- **Purpose**: Foundational principles and workflows that remain stable
- **Update**: Only when core principles change

### Working Memory
- **Location**: `.github/memory/` directory
- **Purpose**: Discoveries, patterns, and session notes from active development
- **Update**: Regularly during and after development sessions

### Memory Files

**Session Notes** (`.github/memory/session-notes.md`)
- Historical summaries of completed development sessions
- Updated at the END of each significant session
- Committed to git as a historical record
- Captures what was accomplished, key findings, and outcomes

**Patterns Discovered** (`.github/memory/patterns-discovered.md`)
- Library of recurring code patterns and solutions
- Updated when discovering patterns likely to recur
- Committed to git as shared team knowledge
- Includes context, problem, solution, examples, and rationale

**Working Notes** (`.github/memory/scratch/working-notes.md`)
- Active workspace for current session notes (NOT committed to git)
- Updated throughout your current development session
- Real-time observations, decisions, blockers, next steps
- Summarize key findings into session-notes.md at end of session

### Using the Memory System

**During Development**:
1. Take notes in `.github/memory/scratch/working-notes.md`
2. Document your approach, findings, and decisions in real-time
3. Track blockers and next steps

**At Session End**:
1. Review your working notes
2. Extract key findings into `.github/memory/session-notes.md`
3. Document new patterns in `.github/memory/patterns-discovered.md`
4. Clear or archive working notes for next session

**For AI Assistants**:
- Reference memory files when providing context-aware suggestions
- Apply documented patterns consistently across the codebase
- Learn from historical session notes to understand project evolution
- Avoid patterns marked as anti-patterns in patterns-discovered.md

See [.github/memory/README.md](memory/README.md) for detailed guidance on using the memory system.

## Workflow Utilities

### GitHub CLI Commands

GitHub CLI (`gh`) is available for workflow automation and issue tracking:

**List Issues**:
```bash
gh issue list --state open
```

**View Issue Details**:
```bash
gh issue view <issue-number>
```

**View Issue with Comments**:
```bash
gh issue view <issue-number> --comments
```

### Exercise Navigation
- The main exercise issue will contain "Exercise:" in the title
- Exercise steps are posted as comments on the main issue
- Use `gh issue view` with `--comments` flag to retrieve step instructions
- Reference these commands when using `/execute-step` or `/validate-step` prompts

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks (dependencies, configs)
- `docs:` - Documentation changes
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring without behavior change
- `style:` - Code style/formatting changes

**Examples**:
```
feat: add delete button to TODO items
fix: resolve API endpoint 404 error
test: add tests for TODO creation
chore: update dependencies
```

### Branch Strategy

- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<issue-description>`
- **Main branch**: `main` (protected, stable code only)

### Git Commands Workflow

Always follow this sequence:

1. **Stage all changes**:
   ```bash
   git add .
   ```

2. **Commit with conventional format**:
   ```bash
   git commit -m "feat: add new feature description"
   ```

3. **Push to correct branch**:
   ```bash
   git push origin <branch-name>
   ```

### Before Committing

Ensure the following checks pass:

- All tests pass: `npm test`
- No lint errors: `npm run lint`
- Code is properly formatted
- Commit message follows conventional format
