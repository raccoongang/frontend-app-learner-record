/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  render, screen, cleanup, initializeMockApp, fireEvent,
} from '../../../setupTest';
import ProgramCertificate from '..';

describe('program-certificate', () => {
  beforeAll(async () => {
    await initializeMockApp();
  });
  beforeEach(() => jest.resetModules);
  afterEach(cleanup);

  const props = {
    program_title: 'Program name',
    program_org: 'Test org',
    modified_date: '2023-02-02',
  };

  it('renders the component', () => {
    render(<ProgramCertificate {...props} />);
    expect(screen.getByText('Program Certificate')).toBeTruthy();
  });

  it('it should display a program name', () => {
    render(<ProgramCertificate {...props} />);
    expect(screen.getByText(props.program_title)).toBeTruthy();
  });

  it('it should display a program organization', () => {
    render(<ProgramCertificate {...props} />);
    expect(screen.getByText(props.program_org)).toBeTruthy();
  });

  it('it should display a program organization', () => {
    render(<ProgramCertificate {...props} />);
    expect(screen.getByText('Completed on 2/2/2023')).toBeTruthy();
  });

  it('it should display a default org name if it wasn\'t set', () => {
    render(<ProgramCertificate {...props} program_org="" />);
    expect(screen.getByText('No organization')).toBeTruthy();
  });

  it('renders modal by clicking on a create button', () => {
    render(<ProgramCertificate {...props} />);
    fireEvent.click(screen.getByText('Create'));
    expect(screen.findByTitle('Verifiable credential')).toBeTruthy();
    expect(screen.findByLabelText('Close')).toBeTruthy();
    expect(screen.getByText('Close modal window')).toBeTruthy();
  });
});
