import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { websocketManager } from '@/lib/websocket';

export function useRealtimeData() {
  const queryClient = useQueryClient();
  const unsubscribeRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    // Subscribe to all WebSocket messages
    const unsubscribe = websocketManager.subscribe('*', (message) => {
      console.log('Received real-time update:', message);

      // Invalidate related queries based on message type
      switch (message.type) {
        case 'metrics_update':
          queryClient.invalidateQueries({ queryKey: ['/api/metrics'] });
          break;
        case 'bus_created':
        case 'bus_updated':
        case 'bus_deleted':
          queryClient.invalidateQueries({ queryKey: ['/api/buses'] });
          break;
        case 'route_created':
          queryClient.invalidateQueries({ queryKey: ['/api/routes'] });
          break;
        case 'alert_created':
        case 'alert_updated':
          queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
          break;
        case 'heatmap_updated':
          queryClient.invalidateQueries({ queryKey: ['/api/passenger-heatmap'] });
          break;
        case 'recommendation_created':
        case 'recommendation_updated':
          queryClient.invalidateQueries({ queryKey: ['/api/ai-recommendations'] });
          break;
        case 'sos_created':
        case 'sos_updated':
          queryClient.invalidateQueries({ queryKey: ['/api/sos'] });
          break;
      }
    });

    unsubscribeRef.current.push(unsubscribe);

    return () => {
      unsubscribeRef.current.forEach(unsub => unsub());
      unsubscribeRef.current = [];
    };
  }, [queryClient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      websocketManager.disconnect();
    };
  }, []);
}
