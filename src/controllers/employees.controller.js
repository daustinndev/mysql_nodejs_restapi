import { pool } from "../db.js"




export const getEmployees = async (req, res) => {
   const query = 'SELECT * FROM employee'
   try {
      const [employees] = await pool.query(query)
      res.json(employees)
   } catch (error) {
      return res.status(500).json({
         "message": "error"
      })
   }
}

export const getEmployee = async (req, res) => {
   const { id } = req.params
   const query = 'SELECT * FROM employee WHERE id = ?'

   try {
      const [rows] = await pool.query(query, [id])
      if (rows.length <= 0) return res.status(404).json({
         message: 'Employee not found'
      })
      res.json(rows[0])
   } catch (error) {
      return res.status(500).json({
         "message": "Error"
      })
   }
}

export const createEmployees = async (req, res) => {
   const { name, salary } = req.body;
   const query = 'INSERT INTO employee (name, salary) VALUES(?, ?)';

   try {
      const [rows] = await pool.query(query, [name, salary])

      res.send({
         id: rows.insertId,
         name,
         salary
      })
   } catch (error) {
      return res.status(500).json({
         "message": "Error"
      })
   }
}

export const updateEmployees = async (req, res) => {
   const { id } = req.params
   const { name, salary } = req.body
   const query = 'UPDATE employee SET name = IFNULL(?, name) , salary = IFNULL(?, salary) WHERE id = ?'

   try {
      const [result] = await pool.query(query, [name, salary, id])
      if (result.affectedRows === 0) return res.status(404).json({
         message: 'Employee not found'
      })
      const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])

      res.json(rows[0])
   } catch (error) {
      return res.status(500).json({
         "message": "Error"
      })
   }
}

export const deleteEmployees = async (req, res) => {
   const query = 'DELETE FROM employee WHERE id = ?';

   try {
      const [result] = await pool.query(query, [req.params.id])
      if (result.affectedRows <= 0) return res.status(404).json({
         message: 'Employee not found'
      })
      res.sendStatus(204)
   } catch (error) {
      return res.status(500).json({
         "message": "Error"
      })
   }
}
