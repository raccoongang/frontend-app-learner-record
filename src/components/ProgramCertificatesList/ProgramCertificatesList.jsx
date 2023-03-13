import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { ChevronLeft, Info } from '@edx/paragon/icons';
import {
  Alert, Hyperlink, Row, useToggle,
} from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform/config';
import { logError } from '@edx/frontend-platform/logging';

import ProgramCertificate from '../ProgramCertificate';
import NavigationBar from '../NavigationBar';
import { getProgramCertificates, getAvailableStorages, initVerifiableCredentialIssuance } from './data/service';
import messages from './messages';
import ProgramCertificateModal from '../ProgramCertificateModal';

function ProgramCertificatesList({ intl }) {
  const [certificatesIsLoaded, setCertificatesIsLoaded] = useState(false);
  const [certificatesHasNoData, setCertificatesHasNoData] = useState(false);
  const [certificates, setCertificates] = useState([]);

  const [storagesIsLoaded, setStoragesIsLoaded] = useState(false);
  const [storages, setStorages] = useState([]);

  const [modalIsOpen, openModal, closeModal] = useToggle(false);

  const [verfifiableCredentialIssuanceData, setVerifiableCredentialIssuanceData] = useState({});

  useEffect(() => {
    getProgramCertificates().then((data) => {
      if (_.isEmpty(data)) {
        setCertificatesHasNoData(true);
      } else {
        setCertificates(data.program_credentials);
      }
      setCertificatesIsLoaded(true);
    }).catch((error) => {
      const errorMessage = (`Error: Could not fetch program certificates for user: ${error.message}`);
      logError(errorMessage);
    });

    getAvailableStorages().then((data) => {
      setStorages(data);
      setStoragesIsLoaded(true);
    }).catch((error) => {
      const errorMessage = (`Error: Could not fetch available storages: ${error.message}`);
      logError(errorMessage);
    });
  }, []);

  const handleCreate = (uuid, storageId) => {
    initVerifiableCredentialIssuance({ uuid, storageId }).then((data) => {
      setVerifiableCredentialIssuanceData(data);
      if (data.redirect) {
        window.location = data.deeplink;
      } else {
        openModal();
      }
    }).catch((error) => {
      const errorMessage = (`Error: Could not fetch learner record data for user: ${error.message}`);
      logError(errorMessage);
    });
  };

  const renderProfile = () => {
    const { username } = getAuthenticatedUser();
    return (
      <Hyperlink
        destination={`${getConfig().LMS_BASE_URL}/u/${username}`}
        className="mb-4 d-inline-block muted-link pl-3 pr-3"
      >
        <ChevronLeft className="mb-1" />
        {intl.formatMessage(messages.credentialsProfileLink)}
      </Hyperlink>
    );
  };

  const renderCredentialsServiceIssueAlert = () => (
    <div tabIndex="-1">
      <Alert variant="danger">
        <Info className="text-danger-500 mr-2 mb-1" />
        {intl.formatMessage(messages.credentialsListError)}
      </Alert>
    </div>
  );

  const renderEmpty = () => (
    <p className="pl-3 pr-3 text-gray-500">
      {intl.formatMessage(messages.credentialsListEmpty)}
    </p>
  );

  const renderProgramCertificates = () => (
    <section id="program-certificates-list" className="pl-3 pr-3 pb-3">
      <p>
        {intl.formatMessage(messages.credentialsDescription)}
      </p>
      <Row className="mt-4">
        {(certificates.map((certificate) => (
          <ProgramCertificate
            key={certificate.uuid}
            storages={storages}
            handleCreate={handleCreate}
            {...certificate}
          />
        )))}
      </Row>
    </section>
  );

  const renderData = () => {
    if (certificatesIsLoaded || storagesIsLoaded) {
      if (certificatesHasNoData) {
        return renderCredentialsServiceIssueAlert();
      }
      if (!certificates.length) {
        return renderEmpty();
      }
      return renderProgramCertificates();
    }
    return null;
  };

  const renderHelp = () => (
    <div className="pl-3 pr-3 pt-4 pb-1">
      <h3 className="h5">
        {intl.formatMessage(messages.credentialsHelpHeader)}
      </h3>
      {intl.formatMessage(messages.credentialsHelpDescription)}
      <Hyperlink
        destination={`${getConfig().SUPPORT_URL_VERIFIABLE_CREDENTIALS}`}
        target="_blank"
        showLaunchIcon={false}
      >
        {intl.formatMessage(messages.credentialsHelpLink)}
      </Hyperlink>
    </div>
  );

  return (
    <main id="main-content" className="pt-5 pb-5 pl-4 pr-4" tabIndex="-1">
      {renderProfile()}
      <NavigationBar />
      <h1 className="h3 pl-3 pr-3 mb-4">
        {intl.formatMessage(messages.credentialsHeader)}
      </h1>
      {renderData()}
      {renderHelp()}
      <ProgramCertificateModal isOpen={modalIsOpen} close={closeModal} data={verfifiableCredentialIssuanceData} />
    </main>
  );
}

ProgramCertificatesList.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ProgramCertificatesList);
