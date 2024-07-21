const pool = require('../database/db');

const findAllProducts = async (id) => {
  const result = await pool.query(
    `SELECT p.product_number, p.sim_card_serial_number, p.modem_serial_number, p.mobile_number, p.modem_name, s.service, p.customer_number 
     FROM products p 
     JOIN servicemode s ON p.service_id = s.service_id`
  );
  return result.rows;
};

const findProductByID = async (id) => {
  const result = await pool.query(
    `SELECT p.product_number, p.sim_card_serial_number, p.modem_serial_number, p.mobile_number, p.modem_name, s.service, p.customer_number 
     FROM products p 
     JOIN servicemode s ON p.service_id = s.service_id 
     WHERE p.product_number = $1`, [id]);
  return result.rows[0];
};

const createProduct = async (productData, service, customer_number) => {
  const {
    sim_card_serial_number,
    modem_serial_number,
    mobile_number,
    modem_name,
  } = productData;

  const client = await pool.connect();

  try {
    const serviceResult = await client.query(
      'SELECT service_id FROM servicemode WHERE service = $1',
      [service]
    );
    let serviceId;
    if (serviceResult.rows.length === 0) {
      const newService = await client.query(
        'INSERT INTO servicemode (service) VALUES ($1) RETURNING service_id',
        [service]
      );
      serviceId = newService.rows[0].service_id;
    } else {
      serviceId = serviceResult.rows[0].service_id;
    }

    const newProduct = await client.query(
      'INSERT INTO products (sim_card_serial_number, modem_serial_number, mobile_number, modem_name, service_id, customer_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        sim_card_serial_number,
        modem_serial_number,
        mobile_number,
        modem_name,
        serviceId,
        customer_number,
      ]
    );
    await client.query('COMMIT');
    return newProduct.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const updateProduct = async (id, productData, service, customer_number) => {
  const {
    sim_card_serial_number,
    modem_serial_number,
    mobile_number,
    modem_name,
  } = productData;

  const client = await pool.connect();

  try {
    const serviceResult = await client.query(
      'SELECT service_id FROM servicemode WHERE service = $1',
      [service]
    );
    let serviceId;
    if (serviceResult.rows.length === 0) {
      const newService = await client.query(
        'INSERT INTO servicemode (service) VALUES ($1) RETURNING service_id',
        [service]
      );
      serviceId = newService.rows[0].service_id;
    } else {
      serviceId = serviceResult.rows[0].service_id;
    }

    const updatedProduct = await client.query(
      'UPDATE products SET sim_card_serial_number = $1, modem_serial_number = $2, mobile_number = $3, modem_name = $4, service_id = $5 WHERE product_number = $6 RETURNING *',
      [
        sim_card_serial_number,
        modem_serial_number,
        mobile_number,
        modem_name,
        serviceId,
        id,
      ]
    );
    await client.query('COMMIT');
    return updatedProduct.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE product_number = $1', [id]);
};

module.exports = {
  findAllProducts,
  findProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};
