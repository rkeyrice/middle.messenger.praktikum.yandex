import { CardBlock } from '../../components/Card';
import { FormBlock } from '../../components/Form';
import { formSubmitValues } from '../../utils/helpers';
import { validate } from '../../utils/validators';
import Block from '../../utils/Block';
import router from '../../utils/router';
import { Routes } from '../../utils/types';
import AuthController from '../../controllers/AuthController';
import { IUser } from '../../api/AuthAPI';

const inputs = [
  {
    label: 'Почта',
    type: 'email',
    name: 'email',
    error: false,
    errorMessage: 'Неверный формат почты',
    events: {
      blur: validate,
    },
  },
  {
    label: 'Логин',
    type: 'input',
    name: 'login',
    error: false,
    errorMessage: 'Неверный формат логина',
    events: {
      blur: validate,
    },
  },
  {
    label: 'Имя',
    type: 'input',
    name: 'first_name',
    error: false,
    errorMessage: 'Неверный формат имени',
    events: {
      blur: validate,
    },
  },
  {
    label: 'Фамилия',
    type: 'input',
    name: 'second_name',
    error: false,
    errorMessage: 'Неверный формат фамилии',
    events: {
      blur: validate,
    },
  },
  {
    label: 'Телефон',
    type: 'tel',
    name: 'phone',
    error: false,
    errorMessage: 'Неверный формат телефона',
    events: {
      blur: validate,
    },
  },
  {
    label: 'Пароль',
    type: 'password',
    name: 'password',
    error: false,
    errorMessage: 'Неверный формат пароля',
    events: {
      blur: validate,
    },
  },
  {
    label: 'Пароль (еще раз)',
    type: 'password',
    name: 'password',
    errorMessage: 'Пароли не совпадают',
    error: false,
  },
];

const buttons = [
  {
    text: 'Зарегистрироваться',
    type: 'submit',
  },
  {
    text: 'Войти',
    type: 'button',
    likeLink: true,
    events: {
      click: (): void => router.go(Routes.Index),
    },
  },
];
const content: Block = new FormBlock(
  {
    inputs,
    buttons,
    events: {
      submit: (e: Event): void => {
        const data = formSubmitValues(e, content.children.inputs);
        if (data) {
          AuthController.signup(data as IUser);
        }
      },
    },
  },
);

export class Registration extends Block {
  init(): void {
    this.children.content = new CardBlock({ title: 'Регистрация', content, center: true });
  }

  render(): DocumentFragment {
    return this.compile(`
      {{{content}}}
    `, {});
  }
}
