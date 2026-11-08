export type LocationMap = {
  zoomIn(): void;
  zoomOut(): void;
  reset(): void;
  destroy(): void;
  readonly zoom: number;
};

export function createLocationMap(
  container: HTMLElement,
  options?: Record<string, unknown>,
): Promise<LocationMap>;
