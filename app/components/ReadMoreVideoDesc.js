import React, { useState } from 'react';

const ReadMoreVideoDesc = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleReadMoreVideoDesc = () => {
    setIsTruncated(!isTruncated);
  };

  const displayText = isTruncated ? text.slice(0, maxLength) : text;

  return (
    <div>
      <div>
            {displayText}
            {text.length > maxLength && (
            <strong onClick={toggleReadMoreVideoDesc}>
            {isTruncated ? '...Read More' : ' Read Less'}
            </strong>
        )}
        </div>
    
    </div>
  );
};

export default ReadMoreVideoDesc;
