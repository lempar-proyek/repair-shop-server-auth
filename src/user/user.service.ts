import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.model';
import { Datastore } from "@google-cloud/datastore";

@Injectable()
export class UserService {
    private kind = 'Users';

    constructor(
        private datastore: Datastore
    ) { }

    async getUser(id: string): Promise<User | null> {
        const key = this.datastore.key(this.kind);
        key.id = id;

        const [entities] = await this.datastore.get(key)
        if (entities.length === 0) {
            return null;
        }

        return entities[0];
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const query = this.datastore
            .createQuery(this.kind)
            .filter('email', '=', email);
        
        const [entities] = await this.datastore.runQuery(query);

        if(entities.length === 0) {
            return null;
        }
        return entities[0];
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const query = this.datastore
            .createQuery(this.kind)
            .filter('username', '=', username);
        
        const [entities] = await this.datastore.runQuery(query);

        if(entities.length === 0) {
            return null;
        }
        return entities[0];
    }

    async createUser(user: User): Promise<User> {
        const now = new Date();
        user.createdAt = now;
        user.updatedAt = now;
        user.deletedAt = null;

        const key = this.datastore.key(this.kind);
        const data = { ...user };
        delete data['id'];

        const userEntity = {
            key,
            data,
        }

        try {
            await this.datastore.insert(userEntity);
        } catch (e) {
            throw new InternalServerErrorException(e)
        }

        user.id = key.id;
        return user;
    }
}
