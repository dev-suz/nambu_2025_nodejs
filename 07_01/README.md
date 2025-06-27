## Sequelize Ex

### Install

```bash
npm init -y
npm i express nodemon sequelize sequelize-cli sqlite3
npx sequelize-cli init
npm i multer
npm i bcryptjs
npm i jsonwebtoken
npm i joi
```

## Directory Structure

- config : 데이터베이스 연결 설정 정보
- migrations: sequelize-cli 로 마이그레이션 할때 생성되는 파일
- models : sequelize.define 모델 파일들만 보관 디렉토리
- seeders : 초기 데이터 생성 파일들이 있는 디렉토리 sequelize-cli

## config 수정

```json
{
  "development": {
    "dialect": "sqlite", // sqlite3 용
    "storage": "sample.db"
  }
}
```

## todos.js

```
POST : todo 목록 입력  /todos
GET : todo 목록 조회 /todos
GET : todo 1건 조회 /todos/:id
PUT : todo 업데이트(id) /todos/:id
DEELETE : todo 삭제(id) /todos/:id

```

## run server

```bash
npx nodemon todos.js

```

# 메모 앱 RESTful API END Point 만들기

> 노트 앱을 만든다고 가정하고 RESTful API 포인트를 만들어뵉
> 화면 UI의 기본 기능은 노트를 작성할 수 있고
> 노트 목록을 조회할 수 있으며 - /notes
> 노트를 수정할 수 있고, - /notes/:id
> 노트를 태그(공부, 일기, 강의 , 백엔드 ..) 를 이용하여 조회할 수 있어야 한다.
> 또한 노트를 삭제할 수 있어야 한다.

## 기본 모델 속성

| 필드          | 타입                                  | 설명 |
| ------------- | ------------------------------------- | ---- |
| 아이디(id)    | 노트 아이디                           |
| 제목(title)   | 노트 제목(간단한)                     |
| 내용(content) | 노트 본문(자세한)                     |
| 태그(tag)     | 태그 (예 - 공부, 읽, 강의 백엔드 등 ) |
| 생성 시각     | 노트 생성 시각                        |
| 수정 시각     | 노트 수정 시각                        |
| ---           | ---                                   |

## 엔드포인트

```bash
POST  /notes : 노트 입력
GET   /notes : 노트 목록 조회
GET   /notes/:tag : 태그로 노트 조회
PUT   /notes/:id : id로 노트 수정
DELETE /notes/:id : id로 노트 삭제
```
