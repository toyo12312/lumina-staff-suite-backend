import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsElegantTextConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (typeof text !== 'string') return false;

    // 1. Відбиваємо КАПСЛОК (якщо слово довше 3 символів і повністю великими літерами)
    // Дозволяємо імена типу "ДІЯ", але блокуємо "ІВАНОВ" чи "УЕБАК"
    const isAllCaps = text.length > 3 && text === text.toUpperCase();
    if (isAllCaps) return false;

    // 2. Словник "креативу" (матюки, спам, меми)
    const lowerText = text.toLowerCase();
    const forbiddenWords = [
      'мать ебал',
      'уебак',
      'залуп',
      'хуй',
      'пизд',
      'бля',
      'admin',
      'test',
      'qwerty',
      'asdasd',
      '123123',
      'сука',
    ];

    // Шукаємо, чи є хоча б одне заборонене слово в тексті
    const hasForbiddenWord = forbiddenWords.some((word) =>
      lowerText.includes(word),
    );
    if (hasForbiddenWord) return false;

    // 3. Відбиваємо "набір букв" (якщо забагато приголосних підряд - необов'язково, але корисно)
    const tooManyConsonants = /[бвгджзйклмнпрстфхцчшщ]{5,}/i.test(lowerText);
    if (tooManyConsonants) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    // Елегантно хвалимо, але жорстко відбиваємо 🎩
    return `Ми високо оцінили вашу експресію та креативність, але поле "${args.property}" має містити реальні дані у коректному регістрі та без нецензурної лексики.`;
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
