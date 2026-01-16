# @opengspace/react-hover-panel

> A beautiful, draggable floating panel component for React with smart opacity, smooth animations, and modern design.

[![npm version](https://badge.fury.io/js/%40opengspace%2Freact-hover-panel.svg)](https://www.npmjs.com/package/@opengspace/react-hover-panel)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **🎨 Modern Design** - Clean, beautiful panel with rounded corners and subtle shadows
- **🎯 Draggable** - Drag the panel freely in both X and Y axes using the iPhone X-style drag bar
- **👁️ Smart Opacity** - Automatically fades when idle, becomes fully visible on hover/drag
- **📱 Responsive** - Adapts to mobile devices with touch support
- **🎭 Icon Regions** - 5 customizable icon regions with tooltips (top-left, top-center, top-right, bottom-left, bottom-right)
- **⚡ Smooth Animations** - GPU-accelerated with 60fps performance using requestAnimationFrame
- **🔒 Boundary Control** - Keeps panel within viewport with configurable edge margins
- **🎪 Portal Tooltips** - Tooltips render outside the panel to prevent event interference
- **⚙️ Highly Customizable** - Extensive props for customization

## 📦 Installation

```bash
npm install @opengspace/react-hover-panel
# or
yarn add @opengspace/react-hover-panel
# or
pnpm add @opengspace/react-hover-panel
```

## 🚀 Quick Start

```jsx
import React from 'react';
import FloatingPanel from '@opengspace/react-hover-panel';

function App() {
  return (
    <FloatingPanel
      width={380}
      onClose={() => console.log('Panel closed')}
      topLeft={{ icon: <span>⌂</span>, tooltip: 'Home' }}
      bottomLeft={{ icon: <span>⚙</span>, tooltip: 'Settings' }}
    >
      <div>
        <h2>Welcome!</h2>
        <p>This is a draggable floating panel.</p>
      </div>
    </FloatingPanel>
  );
}
```

## 📖 Props

### Layout & Size

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `360` | Width of the panel (px or CSS value) |
| `topPadding` | `number` | `20` | Top padding from window edge (px) |
| `bottomPadding` | `number` | `20` | Bottom padding from window edge (px) |
| `edgeMargin` | `number` | `20` | Minimum distance from window edges (px) |

### Dragging & Position

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `draggable` | `boolean` | `true` | Enable/disable dragging |
| `defaultPosition` | `{ x: number, y: number }` | `undefined` | Initial position |
| `boundary` | `'window' \| 'parent' \| 'none'` | `'window'` | Boundary constraint for dragging |

### Opacity & Appearance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `idleOpacity` | `number` | `0.7` | Opacity when panel is idle (0-1) |
| `activeOpacity` | `number` | `1.0` | Opacity when panel is active (0-1) |
| `opacityTransitionDuration` | `number` | `300` | Transition duration in ms |
| `roundedCorners` | `boolean` | `true` | Enable/disable rounded corners |
| `shadow` | `boolean` | `true` | Enable/disable shadow |
| `zIndex` | `number` | `1000` | z-index of the panel |

### Icon Regions

Each icon region accepts either:
- A React element (just the icon)
- An object `{ icon: ReactElement, tooltip: string }`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `topLeft` | `ReactElement \| { icon: ReactElement, tooltip: string }` | - | Icon for top-left corner |
| `topCenter` | `ReactElement \| { icon: ReactElement, tooltip: string }` | - | Icon for top-center |
| `topRight` | `ReactElement \| { icon: ReactElement, tooltip: string }` | - | Icon for top-right corner |
| `bottomLeft` | `ReactElement \| { icon: ReactElement, tooltip: string }` | - | Icon for bottom-left corner |
| `bottomRight` | `ReactElement \| { icon: ReactElement, tooltip: string }` | - | Icon for bottom-right corner |

### Close Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClose` | `() => void` | - | Callback when close button is clicked (replaces top-right icon) |

### Event Callbacks

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onDragStart` | `() => void` | - | Callback when dragging starts |
| `onDragEnd` | `(position: { x: number, y: number }) => void` | - | Callback when dragging ends |
| `onVisibilityChange` | `(isVisible: boolean) => void` | - | Callback when visibility changes (hover/drag) |

### Other

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS class names |
| `style` | `CSSProperties` | `{}` | Additional inline styles |
| `ref` | `RefObject` | - | Forwarded ref |

## 💡 Usage Examples

### Basic Panel with Close Button

```jsx
<FloatingPanel
  width={400}
  onClose={() => setShowPanel(false)}
>
  <div>
    <h3>Basic Panel</h3>
    <p>Drag the bar at the top to move this panel around!</p>
  </div>
</FloatingPanel>
```

### Panel with Icons and Tooltips

```jsx
<FloatingPanel
  width={380}
  topLeft={{ icon: <span>🏠</span>, tooltip: 'Home' }}
  topCenter={{ icon: <span>⋯</span>, tooltip: 'Menu' }}
  topRight={{ icon: <span>⋮</span>, tooltip: 'More options' }}
  bottomLeft={{ icon: <span>⚙️</span>, tooltip: 'Settings' }}
  bottomRight={{ icon: <span>ℹ️</span>, tooltip: 'Help' }}
>
  <div>
    <h3>Panel with Icons</h3>
    <p>Hover over the icons to see tooltips!</p>
  </div>
</FloatingPanel>
```

### Panel with Custom Styling

```jsx
<FloatingPanel
  width={420}
  idleOpacity={0.3}
  activeOpacity={1.0}
  roundedCorners={true}
  shadow={true}
  zIndex={2000}
  className="my-custom-panel"
  style={{ border: '2px solid #667eea' }}
>
  <div>
    <h3>Custom Styled Panel</h3>
    <p>Customize opacity, corners, shadows, and more!</p>
  </div>
</FloatingPanel>
```

### Panel with Event Handlers

```jsx
const handleDragStart = () => {
  console.log('Drag started');
};

const handleDragEnd = (position) => {
  console.log('Drag ended at:', position);
};

const handleVisibilityChange = (isVisible) => {
  console.log('Panel is', isVisible ? 'visible' : 'idle');
};

<FloatingPanel
  width={380}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
  onVisibilityChange={handleVisibilityChange}
>
  <div>
    <h3>Panel with Events</h3>
    <p>Check the console for event logs!</p>
  </div>
</FloatingPanel>
```

### Panel with Custom Content

```jsx
<FloatingPanel
  width={400}
  topLeft={{ icon: <span>👤</span>, tooltip: 'Profile' }}
  onClose={() => setShowPanel(false)}
>
  <div>
    <h2 style={{ margin: '0 0 16px 0' }}>User Profile</h2>

    <input
      type="text"
      placeholder="Username"
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '12px',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}
    />

    <textarea
      placeholder="Bio"
      style={{
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        minHeight: '100px'
      }}
    />

    <button
      style={{
        width: '100%',
        padding: '12px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '12px'
      }}
    >
      Save
    </button>
  </div>
</FloatingPanel>
```

## 🎨 Customization

### CSS Classes

The component uses the following CSS classes that you can override:

- `.floating-panel` - Main panel container
- `.floating-panel-header` - Header area with drag bar
- `.floating-panel-main` - Main content area (scrollable)
- `.floating-panel-footer` - Footer area
- `.drag-bar` - iPhone X-style drag bar
- `.panel-icon` - Icon containers
- `.tooltip` - Tooltip elements

### Example Custom Styles

```css
/* Override drag bar color */
.floating-panel .drag-bar {
  background: rgba(102, 126, 234, 0.3);
}

/* Custom panel background */
.floating-panel {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Custom scrollbar */
.floating-panel-main::-webkit-scrollbar {
  width: 8px;
}

.floating-panel-main::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 4px;
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT © [opengspace](https://github.com/opengspace)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please visit our [GitHub Issues](https://github.com/opengspace/react-hover-panel/issues).

## 🔗 Links

- [GitHub Repository](https://github.com/opengspace/react-hover-panel)
- [NPM Package](https://www.npmjs.com/package/@opengspace/react-hover-panel)
- [Issues](https://github.com/opengspace/react-hover-panel/issues)

---

Made with ❤️ by [opengspace](https://github.com/opengspace)
