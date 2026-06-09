import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { FORBIDDEN_WORDS_PATTERNS } from '../constants/forbidden-words.constant';

@ValidatorConstraint({ name: 'isElegantText', async: false })
export class IsElegantTextConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (typeof text !== 'string') return false;

    const lowerText = text.toLowerCase();
    const cleanText = text.replace(/[^a-zA-Zа-яА-Я0-9]/g, '');

    const hasForbiddenWord = FORBIDDEN_WORDS_PATTERNS.some(
      (pattern) =>
        pattern.test(cleanText) ||
        pattern.test(lowerText) ||
        pattern.test(text),
    );

    if (hasForbiddenWord) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Field ${args.property} contains forbidden words.`;
  }
}

export function IsElegantText(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsElegantTextConstraint,
    });
  };
}
