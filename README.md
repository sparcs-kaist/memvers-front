# memvers-front
Frontend server for Memvers service

## 작업 방법
API 서버는 memvers.sparcs.org origin 만 허용합니다. 따라서 프론트엔드를 로컬에서 작업할 때 설정해 두어야 할 것이 있습니다.

1. /etc/hosts 에 127.0.0.1 memvers.sparcs.org 추가
2. 작업은 항상 시크릿 탭 등, 캐시가 없는 브라우저로 진행

dev 서버를 실행 후 브라우저에서 memvers.sparcs.org 로 접속하면, dev 서버로 연결됩니다.

## 배포 방법
Ssal 컨테이너에 memvers 프론트 서버가 forever 프로세스로 떠있습니다.

1. memvers-front 컨테이너 접속
2. /memvers-front dir 로 이동
3. git pull
4. npm run build
5. forever restart server/main.js

배포 방법은 추후 자동화 예정에 있습니다.
