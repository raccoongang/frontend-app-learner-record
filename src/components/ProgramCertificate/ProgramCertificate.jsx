import React from 'react';
import PropTypes from 'prop-types';

import { FormattedDate, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@edx/paragon';
import messages from './messages';

function ProgramCertificate(
  {
    intl,
    program_title: programTitle,
    program_org: programOrg,
    modified_date: modifiedDate,
    uuid,
    handleCreate,
    storages,
  },
) {
  // FIXME: remove hardcode when dropdown will be implemented
  const renderCreationButtons = () => (
    <div>
      <Hyperlink className="btn btn-outline-primary" onClick={() => handleCreate(uuid, storages[0].id)}>
        {intl.formatMessage(messages.certificateCardDeeplinkLabel)}
      </Hyperlink>
      {/* {storages.length === 1 ? (
        <Hyperlink className="btn btn-outline-primary" onClick={() => handleCreate(uuid, storages[0].id)}>
          {intl.formatMessage(messages.certificateCardDeeplinkLabel)}
        </Hyperlink>
      ) : storages.map((storage) => (
        <Hyperlink className="btn btn-outline-primary" onClick={() => handleCreate(uuid, storage.id)}>
          {intl.formatMessage(messages.certificateCardDeeplinkManyStoragesLabel, { storageName: storage.name })}
        </Hyperlink>
      ))} */}
    </div>
  );

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
  handleCreate: PropTypes.func.isRequired,
  storages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default injectIntl(ProgramCertificate);