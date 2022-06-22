import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import axios from 'axios';

@Injectable()
export class SecretService {
    private projectId;

    constructor() {
        this.projectId = process.env.GCP_PROJECT;
    }

    async ensureProjectIdAvail(): Promise<boolean> {
        if (this.projectId !== undefined) {
            return true;
        }

        const axiosInstance = axios.create({
            baseURL: 'http://metadata.google.internal/',
            headers: { 'Metadata-Flavor': 'Google' },
        });
        const path = '/computeMetadata/v1/project/project-id';
        try {
            const response = await axiosInstance.get(path)
            this.projectId = response
            return true;
        } catch (e) {
            return false;
        }
    }

    async getPrivateJwtKey(): Promise<string> {
        if (!(await this.ensureProjectIdAvail())) {
            throw new InternalServerErrorException('failed to fetch project id');
        }
        const client = new SecretManagerServiceClient();
        const [response] = await client.accessSecretVersion({
            name: `projects/${this.projectId}/secrets/jwt-priv-key/versions/latest`,
        });

        return response.payload.data.toString();
    }
}
