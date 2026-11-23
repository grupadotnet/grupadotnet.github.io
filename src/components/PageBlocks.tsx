import type { RiCodeBoxLine } from '@remixicon/react';

import { Badge } from '@/components/ui/badge.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';

export interface NumberedStepItem {
  step: string;
  icon: typeof RiCodeBoxLine;
  title: string;
  description: string;
}

export interface TechGroupItem {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export function NumberedStepCard({
  step,
  iconBoxClassName,
}: {
  step: NumberedStepItem;
  iconBoxClassName: string;
}) {
  const Icon = step.icon;

  return (
    <Card className="border border-border/50 bg-muted/40 shadow-sm">
      <CardContent className="flex items-start gap-4 p-5">
        <div className={iconBoxClassName}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
              {step.step}
            </span>
            <h3 className="text-base font-bold">{step.title}</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TechGroupsMatrixSheet({ groups }: { groups: TechGroupItem[] }) {
  return (
    <Card className="overflow-hidden border border-border/50 bg-muted/40 py-0 shadow-sm">
      <div className="divide-y divide-border/50">
        {groups.map((group) => (
          <div
            key={group.id}
            className="grid items-center gap-4 p-6 md:grid-cols-12"
          >
            <div className="space-y-1 md:col-span-5">
              <h3 className="text-base font-bold">{group.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {group.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:col-span-7 md:justify-end">
              {group.items.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="border border-border/40 bg-background/80 px-3 py-1 font-mono text-xs font-medium"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
