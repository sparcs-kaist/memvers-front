# memvers-front
Memvers-front 는 SPARCS 회원들의 개인정보 수정을 위한 웹 페이지입니다. React 로 작성되었으며, UI 라이브러리로 Material-UI 를 사용했습니다.

## 작업 방법
API 서버는 memvers.sparcs.org origin 만 허용합니다. 따라서 프론트엔드를 로컬에서 작업할 때 설정해 두어야 할 것이 있습니다.

1. /etc/hosts 에 127.0.0.1 memvers.sparcs.org 추가
2. 작업은 항상 시크릿 탭 등, 캐시가 없는 브라우저로 진행

dev 서버를 실행 후 브라우저에서 memvers.sparcs.org 로 접속하면, dev 서버로 연결됩니다. 단, dev 서버에서는 ssl 을 사용하지 않으므로 https 가 아닌 http 로 접속해야 합니다. 그렇지 않을 경우 '보안 연결을 사용할 수 없음' 이라는 오류메세지를 보게 됩니다.

## 배포 방법
Memvers 는 AWS S3 를 이용해 호스팅 됩니다. SSL을 위해 AWS Cloudfront 를 사용하고 있습니다. 배포 작업은 3단계로 이루어집니다.
1. npm run build : 해당 커맨드는 dist 폴더에 번들링 된 파일을 생성해 줍니다.
2. npm deploy : 해당 커맨드는 AWS S3 스토리지에 dist 폴더의 파일을 전송해 줍니다.
3. Cloudfront Purge : 이는 직접 AWS console 에 접근하여, CDN 서버의 캐시를 비워야 합니다.

배포 과정은 단축시킬 예정입니다.
