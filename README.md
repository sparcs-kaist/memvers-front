# memvers-front
Memvers-front 는 SPARCS 회원들의 개인정보 수정을 위한 웹 페이지입니다. React 로 작성되었으며, UI 라이브러리로 Material-UI 를 사용했습니다.

## 작업 방법
API 서버는 memvers.sparcs.org origin 만 허용합니다. 따라서 프론트엔드를 로컬에서 작업할 때 설정해 두어야 할 것이 있습니다.

1. /etc/hosts 에 127.0.0.1 memvers.sparcs.org 추가
2. 작업은 항상 시크릿 탭 등, 캐시가 없는 브라우저로 진행

dev 서버를 실행 후 브라우저에서 memvers.sparcs.org 로 접속하면, dev 서버로 연결됩니다. 단, dev 서버에서는 ssl 을 사용하지 않으므로 https 가 아닌 http 로 접속해야 합니다. 그렇지 않을 경우 '보안 연결을 사용할 수 없음' 이라는 오류메세지를 보게 됩니다.

## 배포 방법
Ssal 컨테이너에 memvers 프론트 서버가 forever 프로세스로 떠있습니다. 해당 컨테이너는 Whale 에서도 확인 가능합니다.

1. memvers-front 컨테이너 접속
2. /memvers-front dir 로 이동
3. git pull
4. npm run build
5. forever restart server/main.js

배포 방법은 추후 Jenkins 를 사용하여 자동화할 예정입니다.
