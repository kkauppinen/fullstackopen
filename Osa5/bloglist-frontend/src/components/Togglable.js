import { forwardRef, useImperativeHandle, useState } from 'react';

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

export default Togglable;
