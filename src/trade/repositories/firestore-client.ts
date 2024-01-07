import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firabaseAdmin from 'firebase-admin';

@Injectable()
export class FirestoreClient {
  private _firestore: firabaseAdmin.firestore.Firestore;

  constructor(private readonly configService: ConfigService) {
    // Firebase configuration
    const adminConfig = {
      projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKey: configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };

    firabaseAdmin.initializeApp({
      credential: firabaseAdmin.credential.cert(adminConfig),
    });
    this._firestore = firabaseAdmin.firestore();
  }

  get firestore(): firabaseAdmin.firestore.Firestore {
    return this._firestore;
  }
}
