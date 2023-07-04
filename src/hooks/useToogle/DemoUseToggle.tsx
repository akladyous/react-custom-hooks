import React from 'react';
import useToggle from './useToggle';

import { Switch } from '@/components/ui/switch';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DemoUseToggle() {
  const [on, toggle] = useToggle(false);

  return (
    <main>
      <h4>Use Toggle Hook</h4>

      <Switch checked={on as boolean} />
    </main>
  );
}
