"use client";

import { useEffect, useState } from "react";

export function Autoplay({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(true);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setOn((v) => !v), 1600);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div data-on={playing && on ? "" : undefined}>
      <button
        type="button"
        onClick={() => {
          setPlaying((p) => !p);
          setOn(false);
        }}
        className="mb-10 rounded-[25px] border border-cream/60 px-5 py-2 text-body"
      >
        {playing ? "Pause autoplay to try hovering" : "Play all on a loop"}
      </button>
      {children}
    </div>
  );
}
