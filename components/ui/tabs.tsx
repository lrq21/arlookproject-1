"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Drop-in replacement for the shadcn/Radix Tabs (same exports and props used
 * by Airlook), written without dependencies so nothing extra has to be installed.
 */

type TabsCtx = { value: string; onValueChange: (value: string) => void };
const TabsContext = React.createContext<TabsCtx>({ value: "", onValueChange: () => {} });

type TabsProps = Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  activationMode?: "automatic" | "manual"; // accepted for Radix compatibility
};

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, defaultValue = "", onValueChange, activationMode, ...props }, ref) => {
    void activationMode;
    const [inner, setInner] = React.useState(defaultValue);
    const current = value ?? inner;
    const change = React.useCallback(
      (v: string) => {
        if (value === undefined) setInner(v);
        onValueChange?.(v);
      },
      [value, onValueChange],
    );
    return (
      <TabsContext.Provider value={{ value: current, onValueChange: change }}>
        <div ref={ref} {...props} />
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, onKeyDown, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-muted p-0.5 text-muted-foreground/70",
        className,
      )}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'));
        const i = tabs.indexOf(document.activeElement as HTMLElement);
        if (i < 0) return;
        e.preventDefault();
        tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length].focus();
      }}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, onClick, ...props }, ref) => {
  const ctx = React.useContext(TabsContext);
  const active = ctx.value === value;
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={active}
      data-state={active ? "active" : "inactive"}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) ctx.onValueChange(value);
      }}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium outline-offset-2 transition-all hover:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:shadow-black/5",
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const ctx = React.useContext(TabsContext);
  if (ctx.value !== value) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn(
        "mt-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
        className,
      )}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, TabsList, TabsTrigger };
