import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { getRepository } from 'typeorm'
import User from '../entities/User'

@ValidatorConstraint({ async: true })
export class IsUserEmailUsedConstraint implements ValidatorConstraintInterface {
  public async validate(email: string): Promise<boolean> {
    const UserRepository = getRepository(User)
    const user = await UserRepository.findOne({ email })
    return !user
  }
}

export const IsUserEmailUsed = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      constraints: [],
      options: validationOptions,
      propertyName,
      target: object.constructor,
      validator: IsUserEmailUsedConstraint,
    })
  }
}
