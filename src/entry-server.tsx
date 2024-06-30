// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang='en'>
        <head>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
          <link href='/apple-touch-icon.png' rel='apple-touch-icon' sizes='180x180' />
          <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
          <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
          <link rel='manifest' href='/site.webmanifest' />
          {assets}
        </head>
        <body>
          <div id='app'>{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
