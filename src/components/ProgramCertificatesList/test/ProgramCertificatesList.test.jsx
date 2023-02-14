/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Factory } from 'rosie';
import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform/config';
import {
  render, screen, cleanup, initializeMockApp,
} from '../../../setupTest';
import ProgramCertificatesList from '..';
import programListCertificatesFactory from './__factories__/programCertificatesList.factory';

describe('program-certificates-list', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });
  beforeEach(() => jest.resetModules);
  afterEach(cleanup);

  it('renders the component', () => {
    render(<ProgramCertificatesList />);
    expect(screen.getByText('Verifiable Credentials')).toBeTruthy();
  });

  it('it should display a link to the user\'s Profile', () => {
    render(<ProgramCertificatesList />);
    expect(screen.getByText('Back to My Profile')).toBeTruthy();
  });

  it('it should have a help section', () => {
    render(<ProgramCertificatesList />);
    expect(screen.getByText('Questions about Verifiable Credentials?')).toBeTruthy();
  });
});

describe('program-certificates-data', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });
  afterEach(() => {
    cleanup();
    Factory.resetAll();
  });

  it('should display certificates when data is present', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().CREDENTIALS_BASE_URL}/verifiable_credentials/api/v1/program_credentials/`)
      .reply(200, programListCertificatesFactory.build());
    render(<ProgramCertificatesList />);
    expect(await screen.findByText('Verifiable Credentials')).toBeTruthy();
    expect(await screen.findByText('A certificate for a program will appear in the list once you '
      + 'have earned all course certificates in a program.')).toBeTruthy();
    expect(await screen.findByText('Programm title 1')).toBeTruthy();
    expect(await screen.findByText('Programm org 1')).toBeTruthy();
  });

  it('should display no certificates when no enrolled_programs are present', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().CREDENTIALS_BASE_URL}/verifiable_credentials/api/v1/program_credentials/`)
      .reply(200, { program_credentials: [] });
    render(<ProgramCertificatesList />);
    expect(await screen.findByText('No certificate available. Finish you first program to get a certificate.')).toBeTruthy();
  });

  it('should throw an error if there is no data', async () => {
    const axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    axiosMock
      .onGet(`${getConfig().CREDENTIALS_BASE_URL}/verifiable_credentials/api/v1/program_credentials/`)
      .reply(200, {});
    render(<ProgramCertificatesList />);
    expect(await screen.findByText('An error occurred attempting to retrieve your program certificates. Please try again later.')).toBeTruthy();
  });
});
