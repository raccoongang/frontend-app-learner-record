import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  credentialsProfileLink: {
    id: 'credentials.profile.link',
    defaultMessage: 'Back to My Profile',
    description: 'Link text that redirects logged-in user to their profile page',
  },
  credentialsListEmpty: {
    id: 'credentials.list.empty',
    defaultMessage: 'No certificate available. Finish you first program to get a certificate.',
    description: 'A message indicating the user has no program certificates to display on the Verifiable Credentials page',
  },
  credentialsListError: {
    id: 'credentials.list.error',
    defaultMessage: 'An error occurred attempting to retrieve your program certificates. Please try again later.',
    description: 'An error message indicating there is a problem retrieving the user\'s program certificates',
  },
  credentialsHeader: {
    id: 'credentials.header',
    defaultMessage: 'Verifiable Credentials',
    description: 'Header for the Verifiable Credentials page',
  },
  credentialsDescription: {
    id: 'credentials.description',
    defaultMessage: 'A certificate for a program will appear in the list once you have earned all course certificates in a program.',
    description: 'Description of program credentials for the Verifiable Credentials page',
  },
  credentialsHelpHeader: {
    id: 'credentials.help.header',
    defaultMessage: 'Questions about Verifiable Credentials?',
    description: 'Header for the help section of Verifiable Credentials page',
  },
  credentialsHelpDescription: {
    id: 'credentials.help.description',
    defaultMessage: 'To learn more about Verifiable Credentials you can ',
    description: 'Text description for the help section of Verifiable Credentials page',
  },
  credentialsHelpLink: {
    id: 'credentials.help.link',
    defaultMessage: 'read in our verifiable credentials help area.',
    description: 'Text containing link that redirects user to support page',
  },
});

export default messages;
