import { TLoginData, TRegisterData } from '../../../utils/burger-api';
import { RequestStatus, TUser } from '../../../utils/types';
import {
  checkUserAuth,
  initialState,
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
  updateUser,
  userActions,
  userReducer
} from '../user';

describe('Тесты слайса user', () => {
  const testUser = {
    user: { email: 'string@a.ru', name: 'Alex' },
    success: true
  };

  const testRegisterData: TRegisterData = {
    email: 'string@a.ru',
    name: 'Alex',
    password: 'asdasd'
  };
  const testLoginData: TLoginData = {
    email: 'string@a.ru',
    password: 'asdasd'
  };

  test('Тест смены статуса isAuthChecked на true', () => {
    const newState = userReducer(initialState, userActions.authCheck());
    expect(newState).toEqual({
      isAuthChecked: true,
      data: null,
      requestStatus: RequestStatus.Idle
    });
  });
  describe('Тесты события checkUserAuth', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = userReducer(initialState, checkUserAuth.pending(''));
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = userReducer(
        initialState,
        checkUserAuth.rejected(new Error('ERROR'), '')
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = userReducer(
        initialState,
        checkUserAuth.fulfilled(testUser, '')
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: testUser.user,
        requestStatus: RequestStatus.Success
      });
    });
  });
  describe('Тесты события loginUser', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = userReducer(
        initialState,
        loginUser.pending('', testLoginData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = userReducer(
        initialState,
        loginUser.rejected(new Error('ERROR'), '', testLoginData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = userReducer(
        initialState,
        loginUser.fulfilled(testUser.user, '', testLoginData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: testUser.user,
        requestStatus: RequestStatus.Success
      });
    });
  });
  describe('Тесты события registerUser', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = userReducer(
        initialState,
        registerUser.pending('', testRegisterData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = userReducer(
        initialState,
        registerUser.rejected(new Error('ERROR'), '', testRegisterData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = userReducer(
        initialState,
        registerUser.fulfilled(testUser.user, '', testRegisterData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: testUser.user,
        requestStatus: RequestStatus.Success
      });
    });
  });
  describe('Тесты события updateUser', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = userReducer(
        initialState,
        updateUser.pending('', testRegisterData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = userReducer(
        initialState,
        updateUser.rejected(new Error('ERROR'), '', testRegisterData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = userReducer(
        initialState,
        updateUser.fulfilled(testUser.user, '', testRegisterData)
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: testUser.user,
        requestStatus: RequestStatus.Success
      });
    });
  });
  describe('Тесты события logoutUser', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = userReducer(
        { ...initialState, data: testUser.user },
        logoutUser.pending('')
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: testUser.user,
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = userReducer(
        { ...initialState, data: testUser.user },
        logoutUser.rejected(new Error('ERROR'), '')
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: testUser.user,
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success и запись в стор при успешном диспатче', () => {
      const newState = userReducer(
        initialState,
        logoutUser.fulfilled({ success: true }, '')
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Success
      });
    });
  });
  describe('Тесты события refreshUserToken', () => {
    test('Тест смены статуса на Loading при ожидании диспатча', () => {
      const newState = userReducer(initialState, refreshUserToken.pending(''));
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Loading
      });
    });
    test('Тест смены статуса на Failed при ошибке диспатча', () => {
      const newState = userReducer(
        initialState,
        refreshUserToken.rejected(new Error('ERROR'), '')
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Failed
      });
    });
    test('Тест смены статуса на Success при успешном диспатче', () => {
      const newState = userReducer(
        initialState,
        refreshUserToken.fulfilled(
          { refreshToken: 'string', accessToken: 'string', success: true },
          ''
        )
      );
      expect(newState).toEqual({
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Success
      });
    });
  });
});
