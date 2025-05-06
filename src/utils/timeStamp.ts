export function formatTimestamp(timestampInSeconds: any) {
  const date = new Date(timestampInSeconds * 1000); // Convert seconds to milliseconds

  // Format the date
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedDate = `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  // Calculate the time difference in minutes
  const now = new Date().getTime();
  const timeDifference = Math.floor((now - date.getTime()) / (1000 * 60));

  // Format the time difference
  const formattedTimeDifference = `${timeDifference} Min`;

  // Combine date and time difference
  //   return `${formattedDate} | ${formattedTimeDifference}`;

  // return only date
  return `${formattedDate} | 5 min Read`;
}

// Example usage
const timestampInSeconds = 1665685800; // Replace with your timestamp
const formattedTimestamp = formatTimestamp(timestampInSeconds);

