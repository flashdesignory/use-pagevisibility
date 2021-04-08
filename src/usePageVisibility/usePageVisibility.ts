import { useEffect, useState } from 'react';

// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

const VISIBILITY_STATE = Object.freeze({
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
  PRERENDER: 'prerender',
  UNLOAD: 'unload',
});

const getVisibilityState = () => {
  /* istanbul ignore if */
  if (typeof document === 'undefined') return VISIBILITY_STATE.HIDDEN;
  return document.visibilityState;
};

const usePageVisibility = (): [string, () => boolean] => {
  const [visibilityState, setVisibilityState] = useState(getVisibilityState());

  const isVisible = () => visibilityState === VISIBILITY_STATE.VISIBLE;

  const handleVisibilityChange = () => setVisibilityState(getVisibilityState());

  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return [visibilityState, isVisible];
};

export default usePageVisibility;
