import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ENV } from '../config/env';
import { ApiError } from '../utils/ApiError';
import logger from '../logger/winston.logger';

export interface UploadFileOptions {
  key: string;
  body: string | Uint8Array | Buffer;
  contentType?: string;
  bucket?: string;
}

export interface PresignedUrlOptions {
  key: string;
  expiresIn?: number; // in seconds (default: 3600)
  bucket?: string;
}

export interface PresignedUploadUrlOptions {
  key: string;
  expiresIn?: number;
  contentType?: string;
  bucket?: string;
}

/**
 * Service class wrapping AWS S3-compatible Object Storage (Neon Storage).
 */
export class StorageService {
  private client: S3Client | null = null;

  /**
   * Returns the configured S3Client instance.
   */
  getClient(): S3Client {
    if (!this.client) {
      const { ENDPOINT, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION } = ENV.STORAGE;

      if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
        throw new ApiError(
          500,
          'AWS S3 Storage credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) are not configured.'
        );
      }

      this.client = new S3Client({
        endpoint: ENDPOINT || undefined,
        region: REGION || 'ap-southeast-1',
        credentials: {
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
        forcePathStyle: true,
      });

      logger.info(
        `[StorageService] S3Client initialized with endpoint: ${ENDPOINT || 'AWS Default'}`
      );
    }

    return this.client;
  }

  /**
   * Upload an object / file buffer directly to S3 bucket.
   */
  async uploadFile(
    options: UploadFileOptions
  ): Promise<{ key: string; bucket: string; eTag?: string }> {
    const {
      key,
      body,
      contentType = 'application/octet-stream',
      bucket = ENV.STORAGE.BUCKET,
    } = options;

    if (!key) {
      throw new ApiError(400, 'Storage key is required for upload');
    }

    const s3 = this.getClient();

    try {
      const commandInput: PutObjectCommandInput = {
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      };

      const response = await s3.send(new PutObjectCommand(commandInput));
      logger.info(`[StorageService] Uploaded object '${key}' to bucket '${bucket}'`);

      return {
        key,
        bucket,
        eTag: response.ETag,
      };
    } catch (error: any) {
      logger.error(`[StorageService] Upload failed for key '${key}': ${error.message}`);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Storage upload failed: ${error.message}`);
    }
  }

  /**
   * Generate a presigned URL to download/view an object from S3.
   */
  async getPresignedDownloadUrl(options: PresignedUrlOptions): Promise<string> {
    const { key, expiresIn = 3600, bucket = ENV.STORAGE.BUCKET } = options;

    if (!key) {
      throw new ApiError(400, 'Storage key is required to generate presigned download URL');
    }

    const s3 = this.getClient();

    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const url = await getSignedUrl(s3, command, { expiresIn });
      logger.debug(
        `[StorageService] Generated presigned download URL for '${key}' (expires: ${expiresIn}s)`
      );
      return url;
    } catch (error: any) {
      logger.error(
        `[StorageService] Failed to generate download URL for '${key}': ${error.message}`
      );
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Failed to generate download URL: ${error.message}`);
    }
  }

  /**
   * Generate a presigned URL for direct client-side upload (PUT) to S3.
   */
  async getPresignedUploadUrl(
    options: PresignedUploadUrlOptions
  ): Promise<{ url: string; key: string; bucket: string; expiresIn: number }> {
    const {
      key,
      expiresIn = 3600,
      contentType = 'application/octet-stream',
      bucket = ENV.STORAGE.BUCKET,
    } = options;

    if (!key) {
      throw new ApiError(400, 'Storage key is required to generate presigned upload URL');
    }

    const s3 = this.getClient();

    try {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: contentType,
      });

      const url = await getSignedUrl(s3, command, { expiresIn });
      logger.debug(
        `[StorageService] Generated presigned upload URL for '${key}' (expires: ${expiresIn}s)`
      );

      return {
        url,
        key,
        bucket,
        expiresIn,
      };
    } catch (error: any) {
      logger.error(`[StorageService] Failed to generate upload URL for '${key}': ${error.message}`);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Failed to generate upload URL: ${error.message}`);
    }
  }

  /**
   * Delete an object from S3.
   */
  async deleteFile(key: string, bucket: string = ENV.STORAGE.BUCKET): Promise<void> {
    if (!key) {
      throw new ApiError(400, 'Storage key is required for deletion');
    }

    const s3 = this.getClient();

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );
      logger.info(`[StorageService] Deleted object '${key}' from bucket '${bucket}'`);
    } catch (error: any) {
      logger.error(`[StorageService] Delete failed for key '${key}': ${error.message}`);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Failed to delete file from storage: ${error.message}`);
    }
  }

  /**
   * Tests connection to S3 storage bucket.
   */
  async testStorageConnection(): Promise<{
    connected: boolean;
    bucket: string;
    latencyMs: number;
    error?: string;
  }> {
    const start = Date.now();
    const bucket = ENV.STORAGE.BUCKET;

    try {
      const s3 = this.getClient();
      await s3.send(new HeadBucketCommand({ Bucket: bucket }));
      const latencyMs = Date.now() - start;
      logger.info(
        `[StorageService] Storage bucket '${bucket}' verified successfully (${latencyMs}ms)`
      );
      return {
        connected: true,
        bucket,
        latencyMs,
      };
    } catch (error: any) {
      const latencyMs = Date.now() - start;
      logger.error(
        `[StorageService] Storage connection check failed for bucket '${bucket}': ${error.message}`
      );
      return {
        connected: false,
        bucket,
        latencyMs,
        error: error.message,
      };
    }
  }
}

export const storageService = new StorageService();
export default storageService;
