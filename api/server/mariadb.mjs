import * as mariadb from "mariadb";

export let maria = {

  pool : null,

  createPool(config) {
    this.pool = mariadb.createPool(config)
  },

  async singleQuery(sql, placeholders) {
    let conn
    let resp
    try {
      conn = await this.pool.getConnection()
      resp = await conn.query(sql, placeholders)
    } catch (err) {
      throw err;
    } finally {
      if (conn) await conn.release()
    }
    return resp
  },

  async singleQueryOne(sql, placeholders) {
    let conn
    let resp
    try {
      conn = await this.pool.getConnection()
      resp = await conn.query(sql, placeholders)
    } catch (err) {
      throw err;
    } finally {
      if (conn) await conn.release()
    }
    return resp[0]
  }


}


