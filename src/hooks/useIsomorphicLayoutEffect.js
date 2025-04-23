'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * A hook that uses useLayoutEffect on the client and useEffect on the server
 * This avoids the warning when using useLayoutEffect during server-side rendering
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect; 