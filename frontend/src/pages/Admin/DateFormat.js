
export const DateFormat = ({ createdAt }) => {
  const createdAtDate = new Date(createdAt);
  const currentTime = new Date();

  let formattedTime;

  if (currentTime - createdAtDate < 12 * 60 * 60 * 1000) {
    // Less than 12 hours, display time
    formattedTime = createdAtDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  } else if (currentTime - createdAtDate < 6 * 30 * 24 * 60 * 60 * 1000) {
    // Less than 6 months, display date
    formattedTime = createdAtDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    // More than 6 months, display full date
    formattedTime = createdAtDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return formattedTime;
};

export default DateFormat