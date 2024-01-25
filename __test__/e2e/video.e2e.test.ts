import request from 'supertest';
import { app } from "../../src/settings";

describe('/videos', () => {
  beforeAll(async () => {
    await request(app).delete('/testing/all-data').expect(204)
  })

  it('Должен вернуть 200 и пустой массив', async () => {
    await request(app)
      .get('/videos')
      .expect(200, [])
  })
})
