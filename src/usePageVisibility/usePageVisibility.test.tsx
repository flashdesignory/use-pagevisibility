import { fireEvent, render } from '@testing-library/react';

import usePageVisibility from './usePageVisibility';

const getSubject = () => {
  const Element = () => {
    const [visibilityState, isVisible] = usePageVisibility();
    const visibleValue = isVisible().toString();
    return (
      <>
        <div data-testid="visibility-state">{visibilityState}</div>
        <div data-testid="visibility-visible">{visibleValue}</div>
      </>
    );
  };

  return <Element />;
};

const setup = () => render(getSubject());

describe('usePageVisibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the visibility state with a visible / truthy response', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'visible';
      },
    });

    const { getByTestId } = setup();
    expect(getByTestId('visibility-state')).toHaveTextContent('visible');
    expect(getByTestId('visibility-visible')).toHaveTextContent('true');
  });

  it('should return the visibility state with a visible / falsy response', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'hidden';
      },
    });

    const { getByTestId } = setup();
    expect(getByTestId('visibility-state')).toHaveTextContent('hidden');
    expect(getByTestId('visibility-visible')).toHaveTextContent('false');
  });

  it('should update state and visiblity on rerender', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'hidden';
      },
    });

    const { getByTestId, rerender } = setup();
    expect(getByTestId('visibility-state')).toHaveTextContent('hidden');
    expect(getByTestId('visibility-visible')).toHaveTextContent('false');

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'visible';
      },
    });

    rerender(getSubject());
    expect(getByTestId('visibility-state')).toHaveTextContent('visible');
    expect(getByTestId('visibility-visible')).toHaveTextContent('true');
  });

  it('should change state on visibilitychange', () => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'hidden';
      },
    });

    const { getByTestId } = setup();
    expect(getByTestId('visibility-state')).toHaveTextContent('hidden');
    expect(getByTestId('visibility-visible')).toHaveTextContent('false');

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get() {
        return 'visible';
      },
    });

    fireEvent(window, new Event('visibilitychange'));
    expect(getByTestId('visibility-state')).toHaveTextContent('visible');
    expect(getByTestId('visibility-visible')).toHaveTextContent('true');
  });
});
