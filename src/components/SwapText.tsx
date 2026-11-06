export function SwapText({ children }: { children: string }) {
  return (
    <span className="swap">
      <span className="swap-out">{children}</span>
      <span aria-hidden className="swap-in">
        {children}
      </span>
    </span>
  );
}
