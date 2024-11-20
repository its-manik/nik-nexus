import { useEffect, useRef } from 'react';
import { monitor } from '../lib/monitoring';

export function useMonitoring(componentName: string) {
  const renderStartTime = useRef<number>();

  useEffect(() => {
    renderStartTime.current = performance.now();

    return () => {
      if (renderStartTime.current) {
        monitor.measureRender(componentName, renderStartTime.current);
      }
    };
  }, [componentName]);

  return {
    logError: (error: Error, context?: Record<string, unknown>) => {
      monitor.reportError(error, { component: componentName, ...context });
    },
    measureOperation: (name: string, operation: () => Promise<void>) => {
      const startTime = performance.now();
      return operation().finally(() => {
        monitor.recordMetric(
          `${componentName}.${name}`,
          performance.now() - startTime,
          'ms'
        );
      });
    },
  };
}