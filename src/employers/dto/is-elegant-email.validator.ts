import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsElegantEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    if (typeof email !== 'string') return false;

    const lowerEmail = email.toLowerCase();

    const forbiddenWords = [
      'мать ебал',
      'уеба',
      'залуп',
      'хуй',
      'хуе',
      'хуё',
      'пизд',
      'бля',
      'сука',
      'пидар',
      'пидор',
      'pidar',
      'pidor',
      'шлюх',
      'даун',
      'PIDARAS226146@hotmail.com',
      'admin',
      'test',
      'qwerty',
      'asdasd',
      '123123',
    ];

    const hasForbiddenWord = forbiddenWords.some((word) =>
      lowerEmail.includes(word),
    );
    if (hasForbiddenWord) return false;

    if (/\d{10,}@/.test(lowerEmail)) return false;

    const spamDomains = [
      'tempmail.com',
      '10minutemail.com',
      'mail.ru',
      'yandex.ru',
      'hotmail.com',
    ];
    const domain = lowerEmail.split('@')[1];
    if (spamDomains.includes(domain)) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    // Повертаємо ключ для фронтенду, щоб там красиво його перекласти
    return `errors.validation.elegantEmail`;
  }
}

export function IsElegantEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsElegantEmailConstraint,
    });
  };
}
