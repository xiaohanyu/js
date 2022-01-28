import { conditional, isNode } from '@silverhand/essentials';

import { fetchTokenByRefreshToken, RefreshTokenTokenResponse } from './fetch-token';

describe('fetch access token by providing valid refresh token', () => {
  test('get token response', async () => {
    const mockedOidcResponse = {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      id_token: 'id_token',
      scope: 'read register manage',
      expires_in: 3600,
    };

    const expectedTokenResponse: RefreshTokenTokenResponse = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      idToken: 'id_token',
      scope: ['read', 'register', 'manage'],
      expiresIn: 3600,
    };

    const fetchFunction = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockedOidcResponse,
    });

    const tokenResponse = await fetchTokenByRefreshToken(
      {
        clientId: 'client_id',
        tokenEndPoint: 'https://logto.dev/oidc/token',
        refreshToken: 'refresh_token',
        scope: ['read', 'register', 'manage'],
      },
      conditional(isNode() && fetchFunction)
    );

    expect(tokenResponse).toMatchObject(expectedTokenResponse);
  });
});