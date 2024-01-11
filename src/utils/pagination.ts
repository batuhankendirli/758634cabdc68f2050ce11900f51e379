const paginateArray = <T>(arr: T[], resultsPerPage: number): T[][] => {
  const paginatedArr: T[][] = [];
  for (let i = 0; i < Math.ceil(arr.length / resultsPerPage); i++) {
    const downLimit = i * resultsPerPage;
    const upLimit = downLimit + resultsPerPage;
    const subArr = arr.slice(downLimit, upLimit);
    paginatedArr.push(subArr);
  }
  return paginatedArr;
};

export default paginateArray;
