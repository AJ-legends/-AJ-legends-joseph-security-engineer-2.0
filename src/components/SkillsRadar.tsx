import { useState } from "react";

import { profile } from "@/lib/profile";

type Axis = { label: string; value: number };

const SIZE = 260;
const CENTER = SIZE / 2;
const RADIUS = 70;

function point(i: number, total: number, r: number) {
  const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
  return [CENTER + Math.cos(angle) * r, CENTER + Math.sin(angle) * r] as const;
}

function polygon(axes: Axis[], scale: number) {
  return axes
    .map((a, i) => {
      const [x, y] = point(i, axes.length, (a.value / 100) * RADIUS * scale);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function RadarChart({ axes }: { axes: Axis[] }) {
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="mx-auto h-[260px] w-[260px]"
      role="img"
      aria-label="Radar chart of skill proficiency"
    >
      {rings.map((r) => (
        <polygon
          key={r}
          points={axes
            .map((_, i) => {
              const [x, y] = point(i, axes.length, RADIUS * r);
              return `${x.toFixed(2)},${y.toFixed(2)}`;
            })
            .join(" ")}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1"
        />
      ))}

      {axes.map((a, i) => {
        const [x, y] = point(i, axes.length, RADIUS);
        return (
          <line
            key={a.label}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={polygon(axes, 1)}
        fill="var(--color-primary)"
        fillOpacity="0.12"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
      />

      {axes.map((a, i) => {
        const [x, y] = point(i, axes.length, (a.value / 100) * RADIUS);
        return <circle key={a.label} cx={x} cy={y} r="2.5" fill="var(--color-primary)" />;
      })}

      {axes.map((a, i) => {
        const [x, y] = point(i, axes.length, RADIUS + 16);
        return (
          <text
            key={a.label}
            x={x}
            y={y}
            textAnchor={x > CENTER + 4 ? "start" : x < CENTER - 4 ? "end" : "middle"}
            dominantBaseline="middle"
            fontSize="8"
            letterSpacing="1"
            fill="var(--color-muted-foreground)"
            fontFamily="var(--font-mono)"
          >
            {a.label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

export function SkillsRadar() {
  const groups = profile.skillGroups;
  const [active, setActive] = useState(groups[0].id);

  return (
    <div>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className={`shrink-0 rounded-[10px] border px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors ${
              active === g.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {groups
          .filter((g) => g.id === active)
          .map((g) => (
            <div
              key={g.id}
              className="w-full shrink-0 snap-start rounded-[22px] border border-border bg-card p-5 sm:grid sm:grid-cols-[280px_1fr] sm:items-center sm:gap-6"
            >
              <RadarChart axes={g.axes} />
              <div className="mt-4 sm:mt-0">
                <div className="headline text-2xl">{g.label}</div>
                <p className="mt-2 text-xs text-muted-foreground">{g.note}</p>
                <ul className="mt-4 space-y-2">
                  {g.axes.map((a) => (
                    <li key={a.label} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 text-[11px] text-muted-foreground">
                        {a.label}
                      </span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <span
                          className="block h-full rounded-full bg-primary"
                          style={{ width: `${a.value}%` }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
