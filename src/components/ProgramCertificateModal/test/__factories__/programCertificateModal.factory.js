import { Factory } from 'rosie'; // eslint-disable-line import/no-extraneous-dependencies

export default Factory.define('program_credentials_modal')
  .attr(
    'program_credentials_modal',
    {
      deeplink: 'https://example1.com',
      qrcode: 'data:image/png;base64,...',
      app_link_android: 'https://example2.com',
      app_link_ios: 'https://example3.com',
    },
  );
