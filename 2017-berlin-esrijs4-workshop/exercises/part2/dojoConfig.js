window.dojoConfig = {
  deps: ['app/main'] ,
  packages: [
    {
      name: "app",
      // https://dojotoolkit.org/documentation/tutorials/1.10/cdn/
      location: location.pathname.replace(/\/[^/]+$/, "") + "app"
    }
  ]
};