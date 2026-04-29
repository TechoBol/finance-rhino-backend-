import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import mailer from '../services/nodemailer'
import bcrypt from 'bcrypt'

import {
  getAllEmloyees,
  registerEmployeeRepository,
  updateVisibilityEmployeeRepository,
  changePasswordRepository,
  getOneEmployeeToValidateToken
} from '../repository/employee.repository'
import techoBolEmailTemplate from '../templates/techoBolEmailTemplate'

export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await getAllEmloyees()
    res.status(200).json(employees)
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const newEmployee = await registerEmployeeRepository(req.body)
    
    const passwordTokenLink = jwt.sign(
      { id: newEmployee.id, password: req.body.password },
      process.env.JWTSECRET as string,
      {
        expiresIn: '1h'
      }
    )
    const header = `BIENVENIDO A LA PLATAFORMA`
    const title= `Hola ${newEmployee.name}`
    const content =`Para obtener acceso al sistema de finanzas es necesario crear una contraseña segura.
    Esta contraseña no puede ser modificada, si deseas cambiarla, debes contactar con el administrador de la plataforma.   No compartas esta contraseña con nadie. Si no solicitaste este acceso, ignora este mensaje.`
    const messageButton= `Click para crear tu contraseña`
    const direction=`${process.env.FRONTED_URL}/set-password/${passwordTokenLink}`
    const number =`+591 68112030`
    
    const mailOptions = {
      to: `${newEmployee.email}`,
      from: `Sistema de Finanzas`,
      subject: 'Habilitar acceso al sistema de finanzas',
      html:techoBolEmailTemplate( header,title, content, messageButton, direction, number)
    };

    
    

    mailer.sendMail(mailOptions, err => {
      if (err) {
        return res.status(500).json({ message: 'Mail not sent' })
      }
      return res.status(201).json(newEmployee)
    })
    return
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateVisibilityEmployee = async (req: Request, res: Response) => {
  try {
    const response = await updateVisibilityEmployeeRepository(
      Number(req.params.id)
    )
  
    return res.status(200).json(response)
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

  export const changePassword = async (req: Request, res: Response) => {
    try {
      const { newPassword } = req.body
      const { token } = req.params

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(newPassword, salt)

      const response = jwt.verify(token, process.env.JWTSECRET as string)
      const id = (response as jwt.JwtPayload).id
      const password = (response as jwt.JwtPayload).password

      const employee = await getOneEmployeeToValidateToken(id, password)

      if(!employee) {
        return res.status(400).json({ message: 'Invalid token' })
      }

      const updatedEmployee = changePasswordRepository(id, hash)

      if(!updatedEmployee) {
        return res.status(400).json({ message: 'Password not updated' })
      }

      return res.status(200).json({ message: 'Password updated' })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
}
