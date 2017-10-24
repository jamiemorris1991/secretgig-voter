import axios from 'axios';

const data = (
  axios.get(`/votes`)
  .then(res => {
    console.log(res.data);
    return res.data;
  })
);

export default data;