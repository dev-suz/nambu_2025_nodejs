# 체크리스트 시스템 백엔드 만들기

## 첫번째 요구사항

여행을 갈 경우

- 2025년 여름 휴가 준비물 : 여권, 충전기, 세면도구 , ... 옷류 ,(점퍼 코트, 반팔티, 반바지 )

캠핑 준비물 :

- 텐트, 의자 렌턴 , 침낭 ..

-> 백엔드를 만들어보자!
-> 테이블 설계도
아이디 PK ---> id integer primary key autoincrement
캠핑 준비물, 여름 휴가 준비물을 담을 수 있는 그룹핑 항목 : 카테고리 --> category text NOT NULL
실제 준비해야할 물건 --> item text NOT NULL
수량 --> amount integer default 1
체크 여부 --> chenckyn boolean default false

--> RESTFUL API
POST /checklist --> 체크리스트 입력
GET /checklist?category=여름휴가준비물 --> query
PUT /checklist/:id -> 체크 여부를 toggle ( 0-> 1 , 1-> 0 )
DELETE /checklist/:id
