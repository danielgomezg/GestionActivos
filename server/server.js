import fetch from "node-fetch";
// import { createServer, resolveConfig } from "vite";
import { resolve } from "path";
// import fs from "fs"

const serveStaticFiles = async (app) => {
  app.use(async (req, res, next) => {
    if (req.path.match(/\.\w+$/)) {
      console.log('enter if')
      const viteHost = "http://localhost:5173"
      console.log({ viteHost });
      fetch(`${viteHost}${req.path}`).then((response) => {
        if (!response.ok) return next();
        res.redirect(response.url);
      });
    } else {
      console.log('enter else')

      next();
    }
  });
};

/** Muestra el layout del build o el de desarrollo */
const handleRedirect = async (req, res, next) => {
  res.sendHTML = (path) => {
    console.log('send html > ', path)
    let filePath = path.replace(viteConfig.distPath, viteConfig.rootPath)

    // const html = setInstanceVariables(req.session, filePath)

    res.setHeader("Content-Type", "text/html")
    res.send(html);
  };

  next();
};


const listen = (app, port, callback) => {
  console.log('listen')
  return app.listen(port, async () => {
    // if (environment === "development") {
      await serveStaticFiles(app);
      await startDevServer();
    // }
    callback === null || callback === void 0 ? void 0 : callback();
  });
};


export default { listen, handleRedirect };