# create-groupidd-frontend


## 그룹 아이디디 프론트엔드 개발환경


### package.json

#### scripts 수정

- server, watch, dev, prod로 이루어져 있다  
- 추가는 기본 스크립트를 활용하며 --outputType 사용

```json
{
    "scripts": {
        "server": "webpack-dev-server",
        "watch": "webpack --watch --progress --hide-modules",
        "dev": "webpack --progress --hide-modules",
        "prod": "webpack --mode=production --progress --hide-modules",
        
        // 추가
        "server_m": "npm run server -- --outputType=mobile"
    }
}
```



### webpack.config.js

1. webpack.config.js 파일 생성
1. webpack.config.sample.js 안의 내용 복사하여
1. webpack.config.js 안에 내용 붙여넣기
1. webpack.config.js 안의 변수 typeOptions 내용만 수정 및 추가

#### 추가 객체 키

package.json의 scripts에서 --outputType에서 선언한 값을 사용


#### entry
생성할 파일의 이름과 값들

#### output
생성되는 경로와 이름

#### plugins
추가할 플러그인들

#### handlebarsPluginOptions
페이지 생성에 쓰이는 소스 경로와 출력 경로


```javascript
const typeOptions = {
    // ...
    
    mobile: {
        entry: {
            app: [
                './js/mobile/app.js',
                './scss/mobile/app.scss'
            ]
        },
        output: {
            filename: 'm/assets/js/[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'm/assets/css/[name].css'
            })
        ],
        handlebarsPluginOptions: {
            entryOutput: [
                {entry: 'mobile/*.hbs', output: 'm/[name].html'},
                {entry: 'mobile/sample/*.hbs', output: 'm/sample/[name].html'}
            ]
        }
    }
}
```




