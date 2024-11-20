import { APIError } from './api/types';

// Error reporting interface
interface ErrorReport {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  timestamp: string;
  type: 'error' | 'warning' | 'info';
}

// Performance metric interface
interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  tags?: Record<string, string>;
}

class Monitoring {
  private static instance: Monitoring;
  private logs: ErrorReport[] = [];
  private metrics: PerformanceMetric[] = [];

  private constructor() {}

  static getInstance(): Monitoring {
    if (!Monitoring.instance) {
      Monitoring.instance = new Monitoring();
    }
    return Monitoring.instance;
  }

  // Error reporting
  reportError(error: Error | APIError, context?: Record<string, unknown>) {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      type: 'error',
    };

    this.logs.push(errorReport);
    console.error('Error:', errorReport);

    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
    }
  }

  // Performance monitoring
  recordMetric(name: string, value: number, unit: string, tags?: Record<string, string>) {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: new Date().toISOString(),
      tags,
    };

    this.metrics.push(metric);

    // In production, send to metrics service
    if (process.env.NODE_ENV === 'production') {
      // Send to metrics service
    }
  }

  // API request timing
  measureApiCall(name: string, startTime: number) {
    const duration = performance.now() - startTime;
    this.recordMetric(`api.${name}.duration`, duration, 'ms');
  }

  // Component render timing
  measureRender(componentName: string, startTime: number) {
    const duration = performance.now() - startTime;
    this.recordMetric(`component.${componentName}.render`, duration, 'ms');
  }

  // Get all logs
  getLogs(): ErrorReport[] {
    return this.logs;
  }

  // Get all metrics
  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  // Clear all data (useful for testing)
  clear() {
    this.logs = [];
    this.metrics = [];
  }
}

export const monitor = Monitoring.getInstance();