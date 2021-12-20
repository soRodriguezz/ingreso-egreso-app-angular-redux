import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;

    return this.fireStore
      .doc(`${ uid }/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener( uid: string ) {
    this.fireStore.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( sanpshot => sanpshot.map( doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
        })))
      )
      .subscribe( algo => {
        console.log(algo);
      });
  }

}
