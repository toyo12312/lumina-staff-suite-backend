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

    const isAllCaps = text.length > 3 && text === text.toUpperCase();
    if (isAllCaps) return false;

    const lowerText = text.toLowerCase();
    const cleanText = lowerText.replace(/[^а-яa-zёієї]/g, '');

    const forbiddenPatterns = [
      /мать/,
      /ебал/,
      /уеб/,
      /залуп/,
      /ху[йіеё]/,
      /пизд/,
      /бля/,
      /сук[ау]/,
      /пид[ао]р/,
      /pid[ao]r/,
      /шлюх/,
      /даун/,
      /говно/,
      /гандон/,
      /хуесос/,
      /dоlboеb/,
      /порно/,
      /govnoed/,
      /shithead/,
    ];

    const hasForbiddenWord = forbiddenPatterns.some(
      (pattern) => pattern.test(cleanText) || pattern.test(lowerText),
    );
    if (hasForbiddenWord) return false;

    const adminSpam = /admin|test|qwerty|asdasd|123123/.test(lowerText);
    if (adminSpam) return false;

    const tooManyConsonants = /[бвгджзйклмнпрстфхцчшщ]{6,}/i.test(text);
    if (tooManyConsonants) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Ми високо оцінили вашу експресію, але поле "${args.property}" має містити коректні дані без нецензурної лексики.`;
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
