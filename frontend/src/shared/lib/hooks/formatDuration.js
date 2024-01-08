
export const formatDuration = (duration) => {
  const matches = duration.match(/P(?:([0-9]+)W)?(?:([0-9]+)D)?T?(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?/);

  if (!matches) {
    throw new Error('Invalid ISO 8601 duration format');
  }

  const [_, weeks, days, hours, minutes, seconds] = matches.map(match => parseInt(match) || 0);

  const totalHours = (weeks * 5 + days) * 8 + hours + minutes / 60 + seconds / 3600;

  return Number(totalHours);
};





