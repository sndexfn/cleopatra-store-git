```markdown
# cleopatra-store-git Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `cleopatra-store-git` repository, a TypeScript codebase with no detected framework. You'll learn about file naming, import/export styles, commit message conventions, and how to write and run tests. While no automated workflows were detected, this guide provides structured commands and best practices for consistent development.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.ts`, `orderManager.test.ts`

### Import Style
- Use **alias imports** to reference modules.
  - Example:
    ```typescript
    import { Product } from '@models/product';
    ```

### Export Style
- **Mixed export styles** are used (both named and default).
  - Named export:
    ```typescript
    export function calculateTotal(price: number, quantity: number): number {
      return price * quantity;
    }
    ```
  - Default export:
    ```typescript
    export default class CartManager { ... }
    ```

### Commit Messages
- Use **conventional commits** with the `feat` prefix for new features.
  - Example: `feat: add user authentication to checkout flow`
- Average commit message length: ~74 characters.

## Workflows

### Feature Development
**Trigger:** When adding a new feature  
**Command:** `/feature-dev`

1. Create a new branch for your feature.
2. Write code using camelCase file naming and alias imports.
3. Use appropriate export style (named or default).
4. Write or update tests in `*.test.ts` files.
5. Commit changes using the `feat:` prefix and a descriptive message.
6. Open a pull request for review.

### Testing
**Trigger:** Before merging or after making changes  
**Command:** `/run-tests`

1. Locate or create test files matching `*.test.ts`.
2. Run the test suite using your project's test runner (framework unknown; check project docs or use `npm test` if available).
3. Ensure all tests pass before committing.

## Testing Patterns

- Test files are named with the pattern `*.test.ts`.
- Place tests alongside the code they test or in a dedicated test directory.
- Example test file:
  ```typescript
  // cartManager.test.ts
  import CartManager from '@managers/cartManager';

  describe('CartManager', () => {
    it('calculates total correctly', () => {
      const cart = new CartManager();
      expect(cart.calculateTotal(10, 2)).toBe(20);
    });
  });
  ```
- Testing framework is not specified; refer to project documentation for setup and execution.

## Commands

| Command        | Purpose                                  |
|----------------|------------------------------------------|
| /feature-dev   | Start a new feature development workflow  |
| /run-tests     | Run the test suite before merging         |
```
