import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirestoreClient } from './firestore-client';
import { IEventStore } from './event-store.interface';
import { IOrderEvent } from '../events/order-events.interface';
import { Order } from '../model/order.aggregate';
import * as uuid from 'uuid';
import { IOrder } from '../model/order.interface';

@Injectable()
export class FirestoreEventStore implements IEventStore {
  private readonly collection;

  constructor(
    private firestoreClient: FirestoreClient,
    @Inject('FIREBASE_ORDER_COLLECTION')
    private readonly collectionName: string,
  ) {
    this.collection = this.firestoreClient.firestore.collection(collectionName);
  }

  async save(order: Partial<IOrder>): Promise<void> {
    // Retrieve the current max sequence number for this order
    const maxSeqNumberSnapshot = await this.collection
      .where('aggregateId', '==', order.id)
      .orderBy('sequenceNumber', 'desc')
      .limit(1)
      .get();

    let sequenceNumber = 1;
    if (!maxSeqNumberSnapshot.empty) {
      sequenceNumber = maxSeqNumberSnapshot.docs[0].data().sequenceNumber + 1;
    }
    const storedOrder = {
      payload: order,
      eventId: uuid.v4(),
      sequenceNumber: sequenceNumber,
      version: 1,
      createdAt: new Date(),
      aggregateId: order.id,
    };

    try {
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
      await this.collection
        .doc(
          date +
            ':' +
            storedOrder.payload.symbol +
            ':' +
            storedOrder.payload.id +
            ':' +
            sequenceNumber,
        )
        .set(storedOrder, { merge: true });
    } catch (error) {
      Logger.error(error);
    }
  }

  async getEventsForOrder(orderId: string): Promise<Order | null> {
    const querySnapshot = await this.collection
      .where('aggregateId', '==', orderId)
      .orderBy('sequenceNumber')
      .get();
    const events = querySnapshot.docs.map((doc) => doc.data() as IOrderEvent);

    if (events.length === 0) {
      return null;
    }

    Logger.debug(`Retrieved ${events.length} events for order ${orderId}`);
    return Order.fromEvents(events);
  }
}
