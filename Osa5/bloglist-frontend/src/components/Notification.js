import PropTypes from 'prop-types';

const Notification = ({ className, message }) => {
  return <div className={className}>{message}</div>;
};

Notification.propTypes = {
  className: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default Notification;
