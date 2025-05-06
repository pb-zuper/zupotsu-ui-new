import mixpanel from 'mixpanel-browser';

mixpanel.init('9511b04c53b0658b1a50a2ef34658ec8', {
  debug: true,
  ignore_dnt: true,
  //   debug: process.env.NODE_ENV !== 'production',
  api_host: 'https://api.mixpanel.com',
});

export const setUserSuperProperties = () => {
  if (process.env.NODE_ENV == 'production') {
    mixpanel.register({
      PageSource: 'Website',
      LastVisited: new Date().toISOString(),
      UserSignedIn: localStorage.getItem("role") ? true : false,
      UserName: localStorage.getItem("name") || '',
      UserType: localStorage.getItem("role") || '',
      UserEmail: localStorage.getItem("email") || '',
      UserOrg: localStorage.getItem("org") || '',
      // UserSessionCount: localStorage.getItem("sessionCount") || 0,
    });
  }
};

export default mixpanel;


