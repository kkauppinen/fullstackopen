import { useState } from 'react';

const Togglable = ({ buttonLabel, children }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

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
};

export default Togglable;
