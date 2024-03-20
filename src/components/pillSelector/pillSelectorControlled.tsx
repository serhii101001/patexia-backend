import * as React from 'react';

import { useId } from '@/hooks';
import { useStyles } from '@/hooks/useStyles/useStyles';
import { ErrorBoundary, FallbackComponent } from '@/provider/errorBoundary';

import { PillSelectorStandAlone } from './pillSelectorStandAlone';
import type { IPillSelectorControlled, IPillSelectorStandAlone } from './types/pillSelector';
import { PillSelectorStyles } from './types/pillSelectorTheme';

const PILL_SELECTOR_STYLES = 'PILL_SELECTOR_STYLES';

const PillSelectorControlledComponent = React.forwardRef(
  <V extends string | unknown>(
    { ctv, ...props }: IPillSelectorControlled<V>,
    ref: React.ForwardedRef<HTMLDivElement> | undefined | null
  ): JSX.Element => {
    const styles = useStyles<PillSelectorStyles, V>(PILL_SELECTOR_STYLES, props.variant, ctv);
    const id = useId('name');
    return (
      <PillSelectorStandAlone ref={ref} name={`pillSelector${id}`} styles={styles} {...props} />
    );
  }
);
PillSelectorControlledComponent.displayName = 'PillSelectorControlledComponent';

const PillSelectorBoundary = <V extends string | unknown>(
  props: IPillSelectorControlled<V>,
  ref: React.ForwardedRef<HTMLDivElement> | undefined | null
): JSX.Element => (
  <ErrorBoundary
    fallBackComponent={
      <FallbackComponent>
        <PillSelectorStandAlone {...(props as unknown as IPillSelectorStandAlone)} ref={ref} />
      </FallbackComponent>
    }
  >
    <PillSelectorControlledComponent {...props} ref={ref} />
  </ErrorBoundary>
);

const PillSelectorControlled = React.forwardRef(PillSelectorBoundary) as <
  V extends string | unknown,
>(
  props: React.PropsWithChildren<IPillSelectorControlled<V>> & {
    ref?: React.ForwardedRef<HTMLDivElement> | undefined | null;
  }
) => ReturnType<typeof PillSelectorBoundary>;

export { PillSelectorControlled };
