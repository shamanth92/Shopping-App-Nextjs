export const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'test') {
      return 'http://localhost:3000';
    }
  
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    return isBrowser ? '' : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  };
  