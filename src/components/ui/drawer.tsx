import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';

import { cn } from '@/lib/utils';

function Drawer({
  swipeDirection = 'right',
  ...props
}: DrawerPrimitive.Root.Props) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      swipeDirection={swipeDirection}
      {...props}
    />
  );
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        'fixed inset-0 z-50 bg-black/55 backdrop-blur-xs opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:transition-none motion-reduce:transition-none',
        className
      )}
      {...props}
    />
  );
}

function DrawerViewport({
  className,
  side = 'right',
  ...props
}: DrawerPrimitive.Viewport.Props & { side?: 'right' | 'left' }) {
  return (
    <DrawerPrimitive.Viewport
      data-slot="drawer-viewport"
      className={cn(
        'fixed inset-0 z-50 flex',
        side === 'left' ? 'justify-start' : 'justify-end',
        className
      )}
      {...props}
    />
  );
}

function DrawerPopup({
  className,
  children,
  side = 'right',
  ...props
}: DrawerPrimitive.Popup.Props & { side?: 'right' | 'left' }) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerViewport side={side}>
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          className={cn(
            'relative z-50 flex h-dvh w-[min(21rem,86vw)] max-w-full flex-col bg-background text-foreground shadow-2xl outline-none [transform:translateX(var(--drawer-swipe-movement-x,0px))] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-swiping:transition-none data-swipe-dismiss:duration-[calc(300ms*var(--drawer-swipe-strength,1))] motion-reduce:transition-none',
            side === 'right'
              ? 'border-l border-border data-starting-style:[transform:translateX(100%)] data-ending-style:[transform:translateX(100%)]'
              : 'border-r border-border data-starting-style:[transform:translateX(-100%)] data-ending-style:[transform:translateX(-100%)]',
            className
          )}
          {...props}
        >
          {children}
        </DrawerPrimitive.Popup>
      </DrawerViewport>
    </DrawerPortal>
  );
}

function DrawerContent({ className, ...props }: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      className={cn(className)}
      {...props}
    />
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={cn(className)} {...props} />;
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-footer" className={cn(className)} {...props} />;
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        'font-heading text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
};
