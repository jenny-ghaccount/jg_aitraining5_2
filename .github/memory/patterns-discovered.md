# Code Patterns Discovered

## Purpose

This file documents recurring code patterns, solutions, and conventions discovered during development. Each pattern captures a common problem and its established solution, helping maintain consistency and avoid repeating mistakes.

**Important**: This file is committed to git as shared team knowledge.

---

## Pattern Template

```markdown
### Pattern: [Descriptive Name]

**Context**: When/where this pattern applies

**Problem**: The issue or challenge this pattern addresses

**Solution**: The established approach or convention

**Example**:
// Code example showing the pattern in action

**Why**: Rationale for this approach over alternatives

**Related Files**: List of files where this pattern is used or relevant
- path/to/file.js
- path/to/another-file.js

**Anti-patterns to Avoid**:
- ❌ What NOT to do
- ❌ Common mistakes
```

---

## Patterns

### Pattern: Service Initialization - Empty Array vs Null

**Context**: Initializing data collections in services or state management

**Problem**: Inconsistent handling of empty TODO lists can cause null reference errors and require defensive null checks throughout the codebase

**Solution**: Always initialize data collections as empty arrays `[]`, never as `null` or `undefined`

**Example**:
```javascript
// ✅ Good: Initialize as empty array
let todos = [];

// Later, safe to use array methods without null checks
todos.push(newTodo);
const count = todos.length;
const filtered = todos.filter(t => !t.completed);

// ❌ Bad: Initialize as null
let todos = null;

// Requires defensive checks everywhere
if (todos !== null) {
  todos.push(newTodo);  // Would crash without the check
}
const count = todos ? todos.length : 0;  // Verbose
```

**Why**:
- Array methods work immediately without null checks
- Consistent for new users of the service
- Reduces cognitive load and potential bugs
- Follows JavaScript best practices for collections

**Related Files**:
- `packages/backend/src/app.js` - todos array initialization
- Frontend components expecting arrays, not null values

**Anti-patterns to Avoid**:
- ❌ `let todos = null;` - Requires null checks before array operations
- ❌ `let todos;` (undefined) - Same problems as null
- ❌ Inconsistent initialization across similar data structures

---

## Pattern Categories

Organize patterns by category as the list grows:

### Data Initialization
- Service Initialization - Empty Array vs Null ↑

### API Patterns
(Add API-related patterns here)

### Testing Patterns
(Add testing-related patterns here)

### State Management
(Add state management patterns here)

### Error Handling
(Add error handling patterns here)

---

## Adding New Patterns

When you discover a pattern worth documenting:

1. **Identify the problem**: What issue does this solve?
2. **Document the solution**: Show the established approach
3. **Provide examples**: Include both good and bad examples
4. **Explain the why**: Help others understand the rationale
5. **List related files**: Make the pattern actionable
6. **Update categories**: Keep patterns organized

Remember: A pattern is worth documenting when:
- ✅ It appears (or will appear) in multiple places
- ✅ It addresses a common mistake or confusion
- ✅ It represents a project-specific convention
- ✅ Future developers would benefit from the guidance
