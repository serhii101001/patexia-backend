import { fireEvent } from '@testing-library/react';
import * as React from 'react';

import { axe } from 'jest-axe';

import { renderProvider } from '@/tests/renderProvider/renderProvider.utility';

import { InputPassword } from '../inputPassword';

const mockProps = {
  dataTestId: 'inputPassword',
  activeIcon: { icon: 'ADD_IN_A_CIRCLE', altText: 'icon show password alt text' },
  disabledIcon: { icon: 'ADD_IN_A_CIRCLE', altText: 'icon hide password alt text' },
  variant: 'DEFAULT',
  name: 'name',
  label: { content: 'input password' },
  value: 'password',
};

global.structuredClone = jest.fn(val => {
  return JSON.parse(JSON.stringify(val));
});

describe('New Input Password Component', () => {
  it('Should render InputPassword component', async () => {
    const { container, getByTestId } = renderProvider(<InputPassword {...mockProps} />);

    expect(getByTestId(mockProps.dataTestId + 'Input')).toBeInTheDocument();

    const results = await axe(container);
    expect(container).toHTMLValidate();
    expect(results).toHaveNoViolations();
  });

  it('Should render InputPassword component with default input', async () => {
    const onChange = jest.fn();
    const { container, getByTestId } = renderProvider(
      <InputPassword {...mockProps} onInputTypeChange={onChange} />
    );

    expect(getByTestId(mockProps.dataTestId + 'Input')).toBeInTheDocument();

    const results = await axe(container);
    expect(container).toHTMLValidate();
    expect(results).toHaveNoViolations();
  });

  it('Should allow to show and hidde the password', async () => {
    const onInputTypeChangeMock = jest.fn();
    const { container, getByRole, getByTestId } = renderProvider(
      <InputPassword {...mockProps} onInputTypeChange={onInputTypeChangeMock} />
    );

    // Default type
    expect(getByTestId(mockProps.dataTestId + 'Input').getAttribute('type')).toBe('password');

    const iconBotton = getByRole('button');
    fireEvent.click(iconBotton);

    expect(getByTestId(mockProps.dataTestId + 'Input').getAttribute('type')).toBe('text');

    fireEvent.click(iconBotton);
    expect(getByTestId(mockProps.dataTestId + 'Input').getAttribute('type')).toBe('password');

    expect(onInputTypeChangeMock).toHaveBeenCalledTimes(2);
    const results = await axe(container);
    expect(container).toHTMLValidate();
    expect(results).toHaveNoViolations();
  });
});
