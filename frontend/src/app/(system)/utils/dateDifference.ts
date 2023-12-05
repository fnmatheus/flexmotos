function dateDifference(date1: string, date2: string) {
  const date1Parts = date1.split("/");
  const newDate1 = new Date(`${date1Parts[1]}/${date1Parts[0]}/${date1Parts[2]}`);
  const date2Parts = date2.split("/");
  const newDate2 = new Date(`${date2Parts[1]}/${date2Parts[0]}/${date2Parts[2]}`);
  const differenceInTime = newDate2.getTime() - newDate1.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}

export default dateDifference;
