import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteId).setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const useraccont = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (useraccont) {
        //if useraccont is cretaed then login user
        return this.login({ email, password });
      } else {
        return useraccont;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite :: login::", error);
    }
  }

  async getCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: GetCurrent ::", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout ::", error);
    }
  }
}

const authService = new AuthService();

export default authService;
