import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FormattedDate, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Hyperlink, useToggle, Alert } from '@edx/paragon';
import { Info } from '@edx/paragon/icons';
import { logError } from '@edx/frontend-platform/logging';
import ProgramCertificateModal from '../ProgramCertificateModal';
import getProgramCertificateDeeplink from './data/service';
import messages from './messages';

function ProgramCertificate(
  {
    intl,
    program_title: programTitle,
    program_org: programOrg,
    modified_date: modifiedDate,
    uuid,
    storages,
  },
) {
  const [isOpen, open, close] = useToggle(false);
  const [deeplinkData, setDeeplinkData] = useState(null);

  const [deeplinkHasNoData, setDeeplinkHasNoData] = useState(false);
  const [deeplinkIsLoaded, setDeeplinkIsLoaded] = useState(false);

  const onModalClose = () => {
    setDeeplinkData(null);
    setDeeplinkIsLoaded(false);
    close();
  };

  const handleOpenModal = (storageId) => {
    getProgramCertificateDeeplink({ uuid, storageId }).then((data) => {
      if (_.isEmpty(data)) {
        setDeeplinkHasNoData(true);
      } else {
        setDeeplinkData(data);
      }
      setDeeplinkIsLoaded(true);
    }).catch((error) => {
      const errorMessage = (`Error: Could not fetch learner record data for user: ${error.message}`);
      logError(errorMessage);
    });
    open();
  };

  // FIXME: remove hardcode when dropdown will be implemented
  const renderCreationButtons = () => (
    <div>
      <Hyperlink className="btn btn-outline-primary" onClick={() => handleOpenModal(storages[0].id)}>
        {intl.formatMessage(messages.certificateCardDeeplinkLabel)}
      </Hyperlink>
      {/* {storages.length === 1 ? (
        <Hyperlink className="btn btn-outline-primary" onClick={() => handleOpenModal(storages[0].id)}>
          {intl.formatMessage(messages.certificateCardDeeplinkLabel)}
        </Hyperlink>
      ) : storages.map((storage) => (
        <Hyperlink className="btn btn-outline-primary" onClick={() => handleOpenModal(storage.id)}>
          {intl.formatMessage(messages.certificateCardDeeplinkManyStoragesLabel, { storageName: storage.name })}
        </Hyperlink>
      ))} */}
    </div>
  );

  if (deeplinkHasNoData) {
    return (
      <div tabIndex="-1">
        <Alert variant="danger">
          <Info className="text-danger-500 mr-2 mb-1" />
          {intl.formatMessage(messages.credentialsModalError)}
        </Alert>
      </div>
    );
  }

  return (
    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
      <div className="card mb-4 certificate flex-grow-1">
        <div className="card-body d-flex flex-column">
          <div className="card-title">
            <p className="small mb-0">
              {intl.formatMessage(messages.certificateCardName)}
            </p>
            <h4 className="certificate-title">{programTitle}</h4>
          </div>
          <p className="small mb-0">
            {intl.formatMessage(messages.certificateCardOrgLabel)}
          </p>
          <p className="h6 mb-4">
            {programOrg || intl.formatMessage(messages.certificateCardNoOrgText)}
          </p>
          <p className="small mb-2">
            {intl.formatMessage(messages.certificateCardDateLabel, {
              date: <FormattedDate value={new Date(modifiedDate)} />,
            })}
          </p>
          {renderCreationButtons()}
          {deeplinkIsLoaded && (
            <ProgramCertificateModal isOpen={isOpen} close={onModalClose} modalData={deeplinkData} />
          )}
        </div>
      </div>
    </div>
  );
}

ProgramCertificate.propTypes = {
  intl: intlShape.isRequired,
  program_title: PropTypes.string.isRequired,
  program_org: PropTypes.string.isRequired,
  modified_date: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  storages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default injectIntl(ProgramCertificate);
