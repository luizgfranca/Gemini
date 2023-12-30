import ax from './axios-user-session-instance';

function getReauthorizationPath(callbackLocation, shouldRedirect = true) {
  const redirectUri = window.location.protocol + '//' + window.location.host + callbackLocation;
  return `${process.env.BASE_URL_PORTAL}/auth/oauth2/authorization?location=${redirectUri}&prompt=${shouldRedirect}`;
}

const Auth = {
  authenticates: (user, password) =>
    ax.post('auth/login', { user, password }).then(res => {
      window.localStorage.setItem('token-user-session', `Bearer ${res.data.access_token}`);

      return Promise.resolve();
    }),
  getOutagesToken: () => ax.get('auth/check-outages'),
  authenticateWithOauth2: async (code, state, redirectUri) => {
    const res = await ax.post('auth/oauth2', { code, state, redirectUri });
    window.localStorage.setItem('token-user-session', `Bearer ${res.data.access_token}`);
    window.localStorage.setItem('refresh-token-user-session', res.data.refresh_token);
    return res;
  },
  redirectToAuthorization: callbackLocation => {
    if(typeof window !== 'undefined') {
      window.location.href = getReauthorizationPath(callbackLocation, true);
    }
  },
  trySilentReauthorization: () => {
    return new Promise((resolve, reject) => {
      var reauthorizationIframe = document.createElement('iframe');
      reauthorizationIframe.id = 'reauthorization-iframe';
      reauthorizationIframe.style.visibility = 'hidden';
      reauthorizationIframe.onload = () => {
        try {
          const location = reauthorizationIframe.contentWindow.location;
          const params = new URLSearchParams(location.search);
          const code = params.get('code');
          const error = params.get('error');

          if (error) {
            document.body.removeChild(reauthorizationIframe);
            reject(error);
          }

          if (code) {
            document.body.removeChild(reauthorizationIframe);
            resolve(code);
          }
        } catch (e) {
          //pass
        }
      };
      reauthorizationIframe.src = getReauthorizationPath(
        '/callback' /*window.location.pathname*/,
        false
      );

      document.body.appendChild(reauthorizationIframe);
    });
  },
  doIdentityServerLogout: () => {
    var logoutFrame = document.createElement('iframe');
    logoutFrame.id = 'logout-iframe';
    logoutFrame.style.visibility = 'hidden';
    logoutFrame.onload = () => {
      logoutFrame.parentNode.removeChild(logoutFrame);
    };
    logoutFrame.src = `${process.env.BASE_URL_PORTAL}/auth/oauth2/logout`;
    document.body.appendChild(logoutFrame);

    setTimeout(() => {
      try {
        document.body.removeChild(logoutFrame);
      } catch (e) {
        //pass
      }
    }, 3000);
  },
};

export default Auth;
