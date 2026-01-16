import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { createPortal } from 'react-dom';
import './FloatingPanel.css';

// ========================================
// Main Component
// ========================================

const FloatingPanel = React.forwardRef(({
  // Content
  children,

  // Drag regions (5 regions) - { icon: ReactNode, tooltip: string }
  topLeft,
  topCenter,
  topRight,
  bottomLeft,
  bottomRight,

  // Size control
  width = 360,
  topPadding = 20,
  bottomPadding = 20,
  edgeMargin = 20, // Keep panel away from edges

  // Behavior control
  draggable = true,
  defaultPosition,
  boundary = 'window',

  // Opacity settings
  idleOpacity = 0.7,
  activeOpacity = 1.0,
  opacityTransitionDuration = 300,

  // Visual style
  roundedCorners = true,
  shadow = true,

  // Event callbacks
  onClose,
  onDragStart,
  onDragEnd,
  onVisibilityChange,

  // Other
  className = '',
  style: customStyle = {},
  zIndex = 1000,
}, ref) => {
  // ========================================
  // State
  // ========================================
  const panelRef = useRef(null);

  // Sync external ref with panelRef
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(panelRef.current);
    } else {
      ref.current = panelRef.current;
    }
  }, [ref]);

  const [position, setPosition] = useState(() => {
    if (defaultPosition) {
      return defaultPosition;
    }
    // Default position: right side of viewport
    if (typeof window !== 'undefined') {
      return {
        x: window.innerWidth - width - 20,
        y: topPadding
      };
    }
    return { x: 0, y: 0 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const rafRef = useRef(null);
  const positionRef = useRef(position);
  const dragStartRef = useRef(dragStart);
  const callbacksRef = useRef({ onDragStart, onDragEnd });
  const lastVisibilityRef = useRef(isHovered || isDragging);

  // Keep refs in sync with state
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    dragStartRef.current = dragStart;
  }, [dragStart]);

  // Update callbacks ref when callbacks change
  useEffect(() => {
    callbacksRef.current = { onDragStart, onDragEnd };
  }, [onDragStart, onDragEnd]);

  // Tooltip state and handlers
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0, position: 'bottom' });

  const handleIconMouseEnter = useCallback((e, text) => {
    e.stopPropagation();
    if (!text) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const panel = panelRef.current;
    if (!panel) return;

    // Check if icon is in header or footer
    const panelRect = panel.getBoundingClientRect();
    const isInHeader = rect.top < panelRect.top + panelRect.height / 2;

    setTooltip({
      visible: true,
      text,
      x: rect.left + rect.width / 2,
      y: isInHeader ? rect.bottom + 6 : rect.top - 6,
      position: isInHeader ? 'bottom' : 'top'
    });
  }, []);

  const handleIconMouseLeave = useCallback(() => {
    setTooltip({ visible: false, text: '', x: 0, y: 0, position: 'bottom' });
  }, []);

  // ========================================
  // Effects
  // ========================================

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Detect first user interaction (mouse movement)
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('mousemove', handleFirstInteraction);
    };

    window.addEventListener('mousemove', handleFirstInteraction);
    return () => window.removeEventListener('mousemove', handleFirstInteraction);
  }, []);

  // Visibility change callback
  useEffect(() => {
    // Only report visibility if user has interacted
    if (!hasInteracted) return;

    const currentVisibility = isHovered || isDragging;
    if (currentVisibility !== lastVisibilityRef.current) {
      lastVisibilityRef.current = currentVisibility;
      onVisibilityChange?.(currentVisibility);
    }
  }, [hasInteracted, isHovered, isDragging, onVisibilityChange]);

  // Handle window resize to keep panel in viewport
  useEffect(() => {
    const handleResize = () => {
      const panel = panelRef.current;
      if (!panel) return;

      const rect = panel.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let newX = position.x;
      let newY = position.y;

      // Keep panel in viewport with margin
      if (rect.right > windowWidth - edgeMargin) {
        newX = windowWidth - rect.width - edgeMargin;
      }
      if (rect.left < edgeMargin) {
        newX = edgeMargin;
      }
      if (rect.bottom > windowHeight - edgeMargin) {
        newY = windowHeight - rect.height - edgeMargin;
      }
      if (rect.top < edgeMargin) {
        newY = edgeMargin;
      }

      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, edgeMargin]);

  // ========================================
  // Drag Handlers (X and Y axis)
  // ========================================

  const calculateBoundary = useCallback((x, y) => {
    if (boundary === 'none') return { x, y };

    const panel = panelRef.current;
    if (!panel) return { x, y };

    const rect = panel.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (boundary === 'window') {
      // Keep panel within window bounds with margin
      const minX = edgeMargin;
      const maxX = windowWidth - rect.width - edgeMargin;
      const minY = edgeMargin;
      const maxY = windowHeight - rect.height - edgeMargin;

      return {
        x: Math.max(minX, Math.min(x, maxX)),
        y: Math.max(minY, Math.min(y, maxY))
      };
    } else if (boundary === 'parent' && panel.parentElement) {
      const parentRect = panel.parentElement.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(x, parentRect.width - rect.width)),
        y: Math.max(0, Math.min(y, parentRect.height - rect.height))
      };
    }

    return { x, y };
  }, [boundary, edgeMargin]);

  const handleDragStart = useCallback((e) => {
    if (!draggable || isMobile) return;

    // Check if clicking on the drag bar
    const target = e.target;
    const isDragBar = target.closest('.drag-bar');

    if (!isDragBar) return;

    const currentPosition = positionRef.current;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - currentPosition.x,
      y: e.clientY - currentPosition.y
    });
    callbacksRef.current.onDragStart?.();
  }, [draggable, isMobile]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const currentDragStart = dragStartRef.current;
    const newX = e.clientX - currentDragStart.x;
    const newY = e.clientY - currentDragStart.y;

    // Use requestAnimationFrame for smooth updates
    rafRef.current = requestAnimationFrame(() => {
      // Allow moving outside bounds during drag
      setPosition({ x: newX, y: newY });
    });
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Snap back to valid bounds with animation
    const currentPosition = positionRef.current;
    const constrained = calculateBoundary(currentPosition.x, currentPosition.y);
    if (constrained.x !== currentPosition.x || constrained.y !== currentPosition.y) {
      setPosition(constrained);
    }

    setIsDragging(false);
    callbacksRef.current.onDragEnd?.(constrained);
  }, [isDragging, calculateBoundary]);

  // ========================================
  // Event Listeners
  // ========================================

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);

      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // ========================================
  // Computed Styles
  // ========================================

  const currentOpacity = useMemo(() => {
    if (isMobile) return 1;
    // Only show active opacity if user has interacted
    if (!hasInteracted) return idleOpacity;
    if (isHovered || isDragging) return activeOpacity;
    return idleOpacity;
  }, [hasInteracted, isHovered, isDragging, activeOpacity, idleOpacity, isMobile]);

  // Calculate height: window height - top padding - bottom padding
  const panelHeight = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight - topPadding - bottomPadding;
    }
    return '90vh';
  }, [topPadding, bottomPadding]);

  const panelStyle = useMemo(() => ({
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: typeof width === 'number' ? `${width}px` : width,
    height: `${panelHeight}px`,
    opacity: currentOpacity,
    transition: isDragging
      ? 'opacity 0s, left 0s, top 0s'
      : `opacity ${opacityTransitionDuration}ms ease-in-out, left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    transform: 'translateZ(0)',
    willChange: isDragging ? 'transform, left, top' : 'auto',
    zIndex,
    userSelect: isDragging ? 'none' : 'auto',
    ...customStyle,
  }), [
    position,
    width,
    panelHeight,
    currentOpacity,
    isDragging,
    opacityTransitionDuration,
    zIndex,
    customStyle
  ]);

  // ========================================
  // Render
  // ========================================

  const frameClasses = [
    'floating-panel',
    roundedCorners && 'rounded',
    shadow && 'with-shadow',
    isDragging && 'dragging',
    className
  ].filter(Boolean).join(' ');

  return (
    <>
      <div
        ref={panelRef}
        className={frameClasses}
        style={panelStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header Area */}
        <div className="floating-panel-header">
          {/* iPhone X-style drag bar */}
          <div className="drag-bar" onMouseDown={handleDragStart} />

          {/* Top Left Icon */}
          {topLeft && (
            <div
              className="panel-icon panel-icon-top-left"
              onMouseEnter={(e) => handleIconMouseEnter(e, typeof topLeft === 'object' ? topLeft.tooltip : '')}
              onMouseLeave={handleIconMouseLeave}
            >
              {typeof topLeft === 'object' ? topLeft.icon : topLeft}
            </div>
          )}

          {/* Top Center Icon */}
          {topCenter && (
            <div
              className="panel-icon panel-icon-top-center"
              onMouseEnter={(e) => handleIconMouseEnter(e, typeof topCenter === 'object' ? topCenter.tooltip : '')}
              onMouseLeave={handleIconMouseLeave}
            >
              {typeof topCenter === 'object' ? topCenter.icon : topCenter}
            </div>
          )}

          {/* Top Right Icon / Close Button */}
          {onClose ? (
            <div
              className="panel-icon panel-icon-top-right"
              onMouseEnter={(e) => handleIconMouseEnter(e, 'Close')}
              onMouseLeave={handleIconMouseLeave}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              style={{ cursor: 'pointer', fontSize: '16px' }}
            >
              ×
            </div>
          ) : topRight && (
            <div
              className="panel-icon panel-icon-top-right"
              onMouseEnter={(e) => handleIconMouseEnter(e, typeof topRight === 'object' ? topRight.tooltip : '')}
              onMouseLeave={handleIconMouseLeave}
            >
              {typeof topRight === 'object' ? topRight.icon : topRight}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="floating-panel-main">
          {children}
        </div>

        {/* Footer Area */}
        <div className="floating-panel-footer">
          {/* Bottom Left Icon */}
          {bottomLeft && (
            <div
              className="panel-icon panel-icon-bottom-left"
              onMouseEnter={(e) => handleIconMouseEnter(e, typeof bottomLeft === 'object' ? bottomLeft.tooltip : '')}
              onMouseLeave={handleIconMouseLeave}
            >
              {typeof bottomLeft === 'object' ? bottomLeft.icon : bottomLeft}
            </div>
          )}

          {/* Bottom Right Icon */}
          {bottomRight && (
            <div
              className="panel-icon panel-icon-bottom-right"
              onMouseEnter={(e) => handleIconMouseEnter(e, typeof bottomRight === 'object' ? bottomRight.tooltip : '')}
              onMouseLeave={handleIconMouseLeave}
            >
              {typeof bottomRight === 'object' ? bottomRight.icon : bottomRight}
            </div>
          )}
        </div>
      </div>

      {/* Tooltip rendered outside panel via portal */}
      {tooltip.visible && createPortal(
        <div
          className={`tooltip tooltip-${tooltip.position}`}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            position: 'fixed',
            transform: tooltip.position === 'top'
              ? 'translateX(-50%) translateY(-100%)'
              : 'translateX(-50%)',
            zIndex: 9999,
            pointerEvents: 'none'
          }}
        >
          {tooltip.text}
        </div>,
        document.body
      )}
    </>
  );
});

FloatingPanel.displayName = 'FloatingPanel';

export default FloatingPanel;
