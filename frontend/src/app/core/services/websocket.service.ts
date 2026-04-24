import { Injectable, OnDestroy } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DashboardData } from '../models';

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private client: Client | null = null;
  private connectedSubject = new BehaviorSubject<boolean>(false);
  public connected$ = this.connectedSubject.asObservable();

  constructor(private authService: AuthService) {
    this.connect();
  }

  private connect(): void {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        this.connectedSubject.next(true);
      },
      onDisconnect: () => {
        this.connectedSubject.next(false);
      }
    });

    this.client.activate();
  }

  subscribeToResultados(eleccionId: number): Observable<DashboardData> {
    return new Observable<DashboardData>(observer => {
      if (!this.client) {
        observer.error('WebSocket not connected');
        return;
      }

      const subscription = this.client.subscribe(
        `/topic/resultados/${eleccionId}`,
        (message: any) => {
          const data = JSON.parse(message.body);
          observer.next(data);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  sendMessage(destination: string, payload: any): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: destination,
        body: JSON.stringify(payload)
      });
    }
  }

  ngOnDestroy(): void {
    if (this.client) {
      this.client.deactivate();
    }
  }
}