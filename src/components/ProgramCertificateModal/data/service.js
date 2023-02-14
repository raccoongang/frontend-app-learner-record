import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform/config';

async function getProgramCertificateDeeplink() {
  const url = `${getConfig().CREDENTIALS_BASE_URL}/verifiable_credentials/api/v1/credentials/init/`;
  let data = {};
  try {
    ({ data } = await getAuthenticatedHttpClient().get(url, { withCredentials: true }));
  } catch (error) {
    // We are catching and suppressing errors here on purpose. If an error occurs during the
    // getProgramCertificateDeeplink call we will pass back an empty `data` object. Downstream we make
    // the assumption that if the ProgramCertificateDeeplink object is empty that there was an issue or
    // error communicating with the service/API.
  }
  return data;
}

export default getProgramCertificateDeeplink;
