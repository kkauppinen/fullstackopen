import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleShow,
    };
  });

  if (!show) {
    return (
      <div>
        <button onClick={toggleShow}>{buttonLabel}</button>
      </div>
    );
  }

  return (
    <div>
      {children}
      <button onClick={toggleShow}>Cancel</button>
    </div>
  );
});

Togglable.displayName = Togglable;

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
