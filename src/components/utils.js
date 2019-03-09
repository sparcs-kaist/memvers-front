export function propertyName(name) {
  switch(name) {
    case 'id':
      return '닉네임'
    case 'name':
      return '이름'
    case 'ent_year':
      return '학번'
    case 'org':
      return '소속'
    case 'email':
      return '이메일'
    case 'phone':
      return '전화번호'
    case 'birth':
      return '생일'
    case 'dorm':
      return '기숙사'
    case 'lab':
      return '연구실'
    case 'home_add':
      return '집주소'
    case 'facebook_id':
      return '페이스북'
    case 'twitter_id':
      return '트위터'
    case 'github_id':
      return 'Github'
    case 'battlenet_id':
      return 'Battlenet'
    case 'website':
      return '홈페이지'
    case 'blog':
      return '블로그'
    case 'created_on':
      return '생성일'
    case 'updated_on':
      return '최근 수정일'
    case 'is_developer':
      return '개발자 여부'
    case 'is_designer':
      return '디자이너 여부'
    case 'linkedin_url':
      return 'LinkedIn'
    case 'behance_url':
      return 'Behance'
    case 'is_undergraduate':
      return '학부생 여부'
    case 'is_private':
      return '비공개 여부'
  }
}