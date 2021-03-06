import { Collection, InsertOneResult, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any)
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (
    data: any,
    collection: InsertOneResult<Document>
  ): { id: string, [others: string]: any } => {
    return { ...data, id: collection.insertedId.toString() }
  }
}
