import React from 'react';

import { ChevronLeft } from '@edx/paragon/icons';
import { Hyperlink } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform/config';

import NavigationBar from '../NavigationBar';

function ProgramCertificatesList() {
  const renderProfile = () => {
    const { username } = getAuthenticatedUser();
    return (
      <Hyperlink
        destination={`${getConfig().LMS_BASE_URL}/u/${username}`}
        className="mb-4 d-inline-block muted-link pl-3 pr-3"
      >
        <ChevronLeft className="mb-1" />
        <FormattedMessage
          id="records.profile.link"
          defaultMessage="Back to My Profile"
          description="Link text that redirects logged-in user to their profile page"
        />
      </Hyperlink>
    );
  };

  const renderEmpty = () => (
    <p className="pl-3 pr-3 text-gray-500">
      <FormattedMessage
        id="credentials.list.empty"
        defaultMessage="No certificate available. Finish you first program to get a certificate."
        description="A message indicating the user has no program records to display on the Verifiable Credentials page"
      />
    </p>
  );

  const renderHelp = () => (
    <div className="pl-3 pr-3 pt-4 pb-1">
      <h3 className="h5">
        <FormattedMessage
          id="credentials.help.header"
          defaultMessage="Questions about Verifiable Credentials?"
          description="Header for the help section of Verifiable Credentials page"
        />
      </h3>
      <FormattedMessage
        id="credentials.help.description"
        defaultMessage="To learn more about Verifiable Credentials you can "
        description="Text description for the help section of Verifiable Credentials page"
      />
      <Hyperlink
        destination={`${getConfig().SUPPORT_URL_VERIFIABLE_CREDENTIALS}`}
        target="_blank"
        showLaunchIcon={false}
      >
        <FormattedMessage
          id="credentials.help.link"
          defaultMessage="read in our verifiable credentials help area."
          description="Text containing link that redirects user to support page"
        />
      </Hyperlink>
    </div>
  );

  return (
    <main id="main-content" className="pt-5 pb-5 pl-4 pr-4 " tabIndex="-1">
      {renderProfile()}
      <NavigationBar />
      <h1 className="h3 pl-3 pr-3 mb-4">
        <FormattedMessage
          id="credentials.header"
          defaultMessage="Verifiable Credentials"
          description="Header for the Verifiable Credentials page"
        />
      </h1>
      {renderEmpty()}
      {renderHelp()}
    </main>
  );
}

export default ProgramCertificatesList;
