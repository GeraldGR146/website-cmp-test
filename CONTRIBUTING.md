# Contributing to CMP Corporate Website

Thank you for your interest in contributing to the PT Cipta Metalindo Persada corporate website! This document provides guidelines and information for contributors.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Internationalization](#internationalization)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

Please be respectful, inclusive, and professional in all interactions. We are committed to providing a welcoming and inspiring community for all.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.x (use `nvm use` with the provided `.nvmrc`)
- **npm** ≥ 10.x

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/cmp-corporate-website.git
cd cmp-corporate-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

---

## Development Workflow

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards below.

3. **Test your changes** locally:
   ```bash
   npm run build    # Ensure it builds
   npm run preview  # Test production build
   ```

4. **Commit** using conventional commits (see below).

5. **Push** and open a Pull Request.

---

## Coding Standards

### TypeScript

- Use **strict mode** (enforced in `tsconfig.json`)
- Define **explicit types** — avoid `any`
- Use **interfaces** for object shapes, **types** for unions/aliases
- Export types from `src/types/index.ts`

### React

- Use **functional components** exclusively
- Prefer **hooks** over class components
- Keep components **small and focused** (< 150 lines)
- Use `useCallback` and `useMemo` for expensive operations
- Avoid inline functions in JSX when possible

### Tailwind CSS

- Use **utility classes only** — no custom CSS unless absolutely necessary
- Use the `cn()` helper for conditional classes:
  ```tsx
  import { cn } from '@/utils/cn';
  
  <div className={cn('base-class', isActive && 'active-class')} />
  ```
- Follow the established color scheme:
  - Primary: `#0B2A59` (dark blue)
  - Use `gray-50` for alternate section backgrounds
  - Max content width: `max-w-[1200px]`

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Pages | PascalCase | `HomePage.tsx` |
| Utilities | camelCase | `cn.ts` |
| Types | PascalCase | `index.ts` (with PascalCase exports) |
| CMS Data | camelCase | `products.ts` |
| i18n | camelCase | `en.json` |

---

## Component Guidelines

### Structure

```tsx
// 1. Imports (React, hooks, types, utils)
import { useState } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import type { Product } from '@/types';
import { cn } from '@/utils/cn';

// 2. Props interface
interface ProductCardProps {
  product: Product;
  className?: string;
}

// 3. Component (named export)
export function ProductCard({ product, className }: ProductCardProps) {
  const { locale } = useLocale();
  
  return (
    <div className={cn('base-styles', className)}>
      {/* Component content */}
    </div>
  );
}
```

### Do's

- ✅ Use semantic HTML (`<section>`, `<article>`, `<nav>`, etc.)
- ✅ Add `alt` text to all images
- ✅ Support `className` prop for customization
- ✅ Use the `useLocale()` hook for all text content
- ✅ Use `loading="lazy"` for below-fold images

### Don'ts

- ❌ Don't use inline styles
- ❌ Don't hardcode text — use i18n translations
- ❌ Don't use `any` type
- ❌ Don't create components larger than 200 lines

---

## Internationalization

### Adding Translations

1. Add keys to **both** `src/i18n/en.json` and `src/i18n/id.json`
2. Use nested keys for organization:
   ```json
   {
     "section": {
       "title": "Section Title",
       "description": "Section description"
     }
   }
   ```
3. For CMS data, use `LocalizedField`:
   ```typescript
   interface LocalizedField {
     en: string;
     id: string;
   }
   ```

### Adding a New Language

1. Create `src/i18n/{code}.json`
2. Update `Locale` type in `src/i18n/index.ts`
3. Add to translations map
4. Update `LocalizedField` type if needed

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style (formatting, semicolons, etc.) |
| `refactor` | Code refactor (no feature/fix) |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Maintenance (deps, config, etc.) |
| `ci` | CI/CD changes |

### Examples

```
feat(products): add product detail modal
fix(i18n): correct Indonesian translation for contact page
docs(readme): add deployment instructions
style(header): improve mobile menu spacing
refactor(cms): extract shared fetch utility
```

---

## Pull Request Process

1. **Title** must follow the commit convention format
2. **Description** must include:
   - What changed and why
   - Screenshots for UI changes
   - Testing steps
3. **Build must pass** (`npm run build`)
4. **One approval** required before merging
5. **Squash merge** preferred for clean history

### PR Template

```markdown
## Description
Brief description of changes.

## Type
- [ ] Feature
- [ ] Bug Fix
- [ ] Documentation
- [ ] Refactor

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows project coding standards
- [ ] Translations added for both EN and ID
- [ ] Build passes (`npm run build`)
- [ ] Responsive design tested
- [ ] No console errors or warnings
```

---

## Questions?

If you have questions about contributing, please reach out to the engineering team at **dev@ciptametalindo.com**.

Thank you for contributing! 🙏
