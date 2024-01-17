import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DB_Service {
  client = new Client();
  databasers;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteId).setProject(conf.appwriteProjectId);
    this.databasers = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.databasers.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("DB_Service createPost error: ", error);
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databasers.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("DB_Service updatePost error: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databasers.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("DB_Service deletPost error: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databasers.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("DB_Service getPost error: ", error);
      return false;
    }
  }

  async getAllPost() {
    try {
      return await this.databasers.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("DB_Service getAllPost error: ", error);
      return false;
    }
  }

  ////////// File Upload Services //////////

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("DB_Service uploadFile error: ", error);
      return false;
    }
  }

  async deleteFile(fileid) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileid);
      return true;
    } catch (error) {
      console.log("DB_Service deleteFile error: ", error);
      return false;
    }
  }

  getfilepreview(fileid) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileid);
    } catch (error) {
      console.log("DB_Service getfilepreview error: ", error);
      return false;
    }
  }
}

const db_service = new DB_Service();

export default db_service;