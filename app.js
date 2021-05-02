const div = document.querySelector('.insertResult');

const fakeApiCall = (url, cb) => {
  const fake_response = {
    file1: 'First Response (1)',
    file2: 'Second Response (2)',
    file3: 'Third Response (3)'
  };

  const randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 100;

  setTimeout(() => {
    cb(fake_response[url]);
  }, randomDelay);
};

const output = text => {
  console.log(text);
  div.textContent = text;
};

const getFile = file => {
  let text, fn;

  fakeApiCall(file, response => {
    if (fn) fn(response);
    text = response;
  });

  return cb => {
    if (text) cb(text);
    else fn = cb;
  };
};

const res1 = getFile('file1');
const res2 = getFile('file2');
const res3 = getFile('file3');

res1(text1 => {
  output(text1);
  res2(text2 => {
    output(text2);
    res3(text3 => {
      output(text3);
    });
  });
});
