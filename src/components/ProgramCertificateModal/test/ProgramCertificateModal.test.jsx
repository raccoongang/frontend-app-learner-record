/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Factory } from 'rosie';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform/config';
import ProgramCertificateModal from '..';
import {
  render, screen, cleanup, initializeMockApp,
} from '../../../setupTest';
import programCertificateModalFactory from './__factories__/programCertificateModal.factory';

const props = {
  isOpen: true,
  close: jest.fn(),
  data: {
    uuid: '0123456789abcdef0123456789abcdef',
  },
};

describe('program-certificate-modal', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });
  beforeEach(() => jest.resetModules);
  afterEach(cleanup);

  it('renders the component', () => {
    render(<ProgramCertificateModal {...props} />);
    expect(screen.getByText('Verifiable credential')).toBeTruthy();
    expect(screen.getByText('Loading...')).toBeTruthy();
  });
});

describe('program-certificate-modal-data', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });
  afterEach(() => {
    cleanup();
    Factory.resetAll();
  });

  it('should display certificate modal when data is present', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onPost(`${getConfig().CREDENTIALS_BASE_URL}/verifiable_credentials/api/v1/credentials/init/`)
      .reply(200, programCertificateModalFactory.build().program_credentials_modal);
    const { findByText, getByTestId } = render(<ProgramCertificateModal {...props} />);
    expect(await findByText('Download and install the app on your smartphone.')).toBeTruthy();
    expect(await findByText('Once you have successfully done - close modal.')).toBeTruthy();
    expect(await findByText('Close modal window')).toBeTruthy();
    expect(await getByTestId('qr-code-img').getAttribute('src')).not.toEqual(null);
  });

  it('should throw an error if there is no data', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onPost(`${getConfig().CREDENTIALS_BASE_URL}/verifiable_credentials/api/v1/credentials/init/`)
      .reply(200, {});
    render(<ProgramCertificateModal {...props} />);
    expect(await screen.findByText('An error occurred attempting to retrieve your program certificate. Please try again later.')).toBeTruthy();
  });
});
