import React from 'react';
import PropTypes from 'prop-types';

import { FormattedDate, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Hyperlink, useToggle } from '@edx/paragon';
import ProgramCertificateModal from '../ProgramCertificateModal';

import messages from './messages';

function ProgramCertificate(
  {
    intl,
    program_title: programTitle,
    program_org: programOrg,
    modified_date: modifiedDate,
  },
) {
  const [isOpen, open, close] = useToggle(false);

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
          <div>
            <Hyperlink className="btn btn-outline-primary" onClick={open}>
              {intl.formatMessage(messages.certificateCardDeeplinkLabel)}
            </Hyperlink>
            <ProgramCertificateModal isOpen={isOpen} close={close} />
          </div>
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
};

export default injectIntl(ProgramCertificate);
