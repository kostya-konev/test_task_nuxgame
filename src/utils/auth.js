import Cookies from 'js-cookie';

export function checkAuthorizationToken() {
  const authToken = Cookies.get('authorizationToken');

  return !!authToken;
}
