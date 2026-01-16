# Contributing to @opengspace/react-hover-panel

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- A clear title and description
- Steps to reproduce the bug
- Expected behavior vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, React version, etc.)

### Suggesting Features

We'd love to hear your ideas! Please:
- Check existing issues first to avoid duplicates
- Provide a clear description of the feature
- Explain why it would be useful
- Consider if it fits the project's scope

### Submitting Pull Requests

1. **Fork the repository**
   - Click the "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-hover-panel.git
   cd react-hover-panel
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Brief description of changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Provide a clear description of your changes
   - Link any related issues

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/opengspace/react-hover-panel.git
cd react-hover-panel

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Project Structure

```
react-hover-panel/
├── src/
│   ├── components/
│   │   ├── FloatingPanel.jsx
│   │   └── FloatingPanel.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── public/
├── index.html
├── vite.config.js
├── vite.config.lib.js
├── package.json
└── README.md
```

### Building

```bash
# Build the demo
npm run build

# Build the library
npm run build:lib

# Test what will be published
npm run test:pack
```

## Coding Standards

### JavaScript/React

- Use modern ES6+ features
- Follow React best practices
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for public APIs

### CSS

- Use BEM-like naming for classes
- Keep styles organized and scoped
- Use CSS custom properties for theming

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(dragging): add touch support for mobile devices
fix(tooltip): prevent tooltip from triggering on click
docs(readme): update installation instructions
```

## Testing

Before submitting a PR, please:

1. **Test manually**
   - Start the dev server: `npm run dev`
   - Test your changes in different browsers
   - Test on mobile devices if applicable

2. **Test the library build**
   ```bash
   npm run build:lib
   npm link
   # In another project:
   npm link @opengspace/react-hover-panel
   ```

3. **Check for issues**
   - Console errors
   - Visual bugs
   - Accessibility issues
   - Performance problems

## Style Guide

### Component Structure

```jsx
import React from 'react';
import './Component.css';

const Component = ({ prop1, prop2 }) => {
  // 1. State and refs
  const [state, setState] = React.useState(null);
  const ref = React.useRef(null);

  // 2. Effects
  React.useEffect(() => {
    // effect logic
  }, []);

  // 3. Event handlers
  const handleClick = () => {
    // handler logic
  };

  // 4. Derived values
  const computedValue = React.useMemo(() => {
    // computation
  }, [deps]);

  // 5. Render
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### Naming Conventions

- Components: PascalCase (`FloatingPanel`)
- Functions: camelCase (`handleClick`)
- Constants: UPPER_SNAKE_CASE (`MAX_WIDTH`)
- CSS classes: kebab-case (`floating-panel`)

## Questions?

Feel free to:
- Open an issue for discussion
- Ask in a pull request
- Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
