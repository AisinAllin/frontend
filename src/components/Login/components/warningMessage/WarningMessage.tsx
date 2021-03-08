import React from 'react';
import './WarningMessage.scss';

type WarningMessageProps = {
  content: string
};

const WarningMessage: React.FC<WarningMessageProps> = ({ content }) => (
  <div className="warning">
    {content}
  </div>
);

export default WarningMessage;
