// Google Analytics utility functions

// Initialize GA4
export const initGA = (measurementId) => {
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: true
  });
};

// Track page views
export const trackPageView = (path) => {
  window.gtag('event', 'page_view', {
    page_path: path,
  });
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  window.gtag('event', eventName, eventParams);
};

// Track calculator usage
export const trackCalculatorUsage = (calculatorName, result) => {
  trackEvent('calculator_used', {
    calculator_name: calculatorName,
    result: result
  });
};

// Track user interaction
export const trackUserInteraction = (action, category, label) => {
  trackEvent('user_interaction', {
    action: action,
    category: category,
    label: label
  });
}; 