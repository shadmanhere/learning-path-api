import axios from 'axios';

export const fetchData = async () =>
  await axios
    .get('https://raw.githubusercontent.com/shadmanhere/learning-path-data/main/programming-data/api/v2/tutorialsList.json')
    .then((response) => {
      console.log(response);
    });

fetchData();
