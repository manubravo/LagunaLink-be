import { WordMother } from '../../../Shared/domain/WordMother';
import { UserPassword } from '../../../../../src/Contexts/LLBE/Users/domain/UserPassword';

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return new UserPassword(value);
  }

  static random(): UserPassword {
    return this.create(WordMother.random());
  }
}
