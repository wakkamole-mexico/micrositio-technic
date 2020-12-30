export default {
  install(Vue, options) {
    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
      console.log("setting fb sdk");
    })(document, "script", "facebook-jssdk");

    window.fbAsyncInit = function onSDKInit() {
      window.FB.init(options);
      window.FB.AppEvents.logPageView();
      Vue.FB = window.FB;
      window.dispatchEvent(new Event("fb-sdk-ready"));
    };
    Vue.FB = undefined;
  }
}


