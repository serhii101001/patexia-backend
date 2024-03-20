import * as React from 'react';

import { useInput } from '@/hooks/useInput/useInput';
import { useStyles } from '@/hooks/useStyles/useStyles';
import { ErrorBoundary, FallbackComponent } from '@/provider/errorBoundary';

// helpers
import { InputTypeType } from '../input';
import { InputCurrencyStandAlone } from './inputCurrencyStandAlone';
import { IInputCurrency, IInputCurrencyStandAlone, InputCurrencyStylesProps } from './types';

const INPUT_CURRENCY_STYLES = 'INPUT_CURRENCY_STYLES';

const InputCurrencyComponent = React.forwardRef(
  <V extends string | unknown>(
    {
      maxDecimals = 2,
      truncate = true,
      min = 0,
      max,
      errorExecution,
      keyValidation,
      maxLength,
      minLength,
      mask,
      maskType,
      disabled,
      disabledArrowUpDownInputNumber = false,
      error,
      value: currentValue,
      informationAssociatedValue,
      ignoreKeys = ['+', '-', 'e'],
      regex,
      formatNumber,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onError,
      onInternalErrors,
      ctv,
      type = InputTypeType.NUMBER,
      ...props
    }: IInputCurrency<V>,
    ref: React.ForwardedRef<HTMLInputElement | undefined>
  ): JSX.Element => {
    const styles = useStyles<InputCurrencyStylesProps, V>(
      INPUT_CURRENCY_STYLES,
      props.variant,
      ctv
    );
    const inputCurrencyType = formatNumber ? InputTypeType.TEXT : type;
    const inputCurrencyMin = formatNumber ? undefined : min;

    const {
      value,
      state,
      inputRef,
      handleChangeInternal,
      handleBlurInternal,
      handleFocusInternal,
      handleKeyDownInternal,
      handleBlurStructure,
      handleFocusStructure,
    } = useInput({
      ref,
      errorExecution,
      keyValidation,
      max,
      min: inputCurrencyMin,
      maxLength,
      minLength,
      mask,
      maskType,
      disabled,
      disabledArrowUpDownInputNumber,
      error,
      currentValue,
      type: inputCurrencyType,
      maxDecimals,
      truncate,
      informationAssociated: informationAssociatedValue?.content,
      ignoreKeys,
      regex,
      formatNumber,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onError,
      onInternalErrors,
    });

    return (
      <InputCurrencyStandAlone
        {...props}
        ref={inputRef}
        informationAssociatedValue={informationAssociatedValue}
        max={max}
        maxDecimals={maxDecimals}
        maxLength={maxLength}
        min={inputCurrencyMin}
        minLength={minLength}
        state={state}
        styles={styles}
        truncate={truncate}
        type={inputCurrencyType}
        value={value}
        onBlur={handleBlurInternal}
        onBlurStructure={handleBlurStructure}
        onChange={handleChangeInternal}
        onFocus={handleFocusInternal}
        onFocusStructure={handleFocusStructure}
        onKeyDown={handleKeyDownInternal}
      />
    );
  }
);
InputCurrencyComponent.displayName = 'InputCurrencyComponent';

const InputCurrencyBoundary = <V extends string | unknown>(
  props: IInputCurrency<V>,
  ref: React.ForwardedRef<HTMLInputElement | undefined>
): JSX.Element => (
  <ErrorBoundary
    fallBackComponent={
      <FallbackComponent>
        <InputCurrencyStandAlone {...(props as unknown as IInputCurrencyStandAlone)} ref={ref} />
      </FallbackComponent>
    }
  >
    <InputCurrencyComponent {...props} ref={ref} />
  </ErrorBoundary>
);

const InputCurrency = React.forwardRef(InputCurrencyBoundary) as <V extends string | unknown>(
  props: React.PropsWithChildren<IInputCurrency<V>> & {
    ref?: React.ForwardedRef<HTMLInputElement> | undefined | null;
  }
) => ReturnType<typeof InputCurrencyBoundary>;

export { InputCurrency };
