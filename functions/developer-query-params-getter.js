// *
// * TRANFORMS: "technologies=1,2,3;developer_type=2;experience_level=1"
// *
// *      INTO: {
// *              technologies: [1, 2, 3],
// *              developer_type: [2],
// *              experience_level: [1],
// *            }
// *

module.exports = (queriesString) => {
  const queriesObject = {};

  const queriesArray = queriesString.split(';').map((queryString) => queryString.split('='));

  queriesArray.forEach((query) => {
    const key = query[0];
    const params = query[1].split(',').map((id) => parseInt(id));
    queriesObject[key] = params;
  });

  return queriesObject;
}
