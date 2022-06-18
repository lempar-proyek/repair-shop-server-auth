import { Module } from '@nestjs/common';
import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore();
const datastoreProvider = {
    provide: Datastore,
    useValue: datastore
}

@Module({
    providers: [
        datastoreProvider
    ],
    exports: [
        datastoreProvider
    ]
})
export class DatastoreModule { }
