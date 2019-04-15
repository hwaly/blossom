const fs = require('fs-extra');
const path = require('path');

const src = path.join(__dirname, '__resource');
const dest = path.join(__dirname, '../../__resource');

fs.copy(src, dest, err => {
    if (err) return console.error(err);

    console.log('GroupIDD 프론트엔드 개발환경');
    console.log('추가 완료!!');
});