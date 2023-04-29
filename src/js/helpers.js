//import from config.js
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    //Race between fetch and timeout
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();
    //create a new error
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    //Throw the error so we can handle it in model.js
    throw err;
  }
};
/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    //Race between fetch and timeout
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();
    //create a new error
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    //Throw the error so we can handle it in model.js
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    //Race between fetch and timeout
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();
    //create a new error
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    //Throw the error so we can handle it in model.js
    throw err;
  }
};
*/
