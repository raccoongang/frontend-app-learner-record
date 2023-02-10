/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  render, screen, cleanup, initializeMockApp,
} from '../../../setupTest';
import ProgramCertificatesList from '..';

describe('program-records-list', () => {
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
