import axios from 'axios';
const apiEndpoint = 'https://fmflb-224718001.us-east-1.elb.amazonaws.com:444';

export const getProperties = () => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/getallproperties`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});
export const editProperty = (id, newProp) => new Promise((resolve, reject) => {
    axios.put(`${apiEndpoint}/property/${id}`, newProp)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});
export const addProperty = (property) => new Promise ((resolve, reject) => { //FIXME not working
    console.log(property)

    axios.post(`${apiEndpoint}/property`, property)
    .then(x => resolve(x.data))
    .catch(x => {
        console.log('Caught x');
        alert(x);
        reject(x);
    });
});

export const getPropertyById = (id) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/property/${id}`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const deleteProperty = (id) => new Promise ((resolve, reject) => {
    console.log(id)
    axios.delete(`${apiEndpoint}/property/${id}`, id)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});
