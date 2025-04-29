# Library Graffiti

React와 TypeScript를 기반으로 다양한 라이브러리의 사용법을 실습하고 문서화하는 레포지토리이다.

## 📚 포함된 라이브러리

### 애니메이션 & 인터랙션

- [GSAP](https://greensock.com/gsap/) - 고성능 애니메이션 라이브러리
  - 스크롤 기반 애니메이션
  - 수평 스크롤
  - 스케일 애니메이션
- [Framer Motion](https://www.framer.com/motion/) - React용 애니메이션 라이브러리
  - 페이지 전환 효과

### 스크롤 & 페이지 관련

- [Lenis](https://lenis.studiofreight.com/) - 부드러운 스크롤 라이브러리
  - 기본 구현
  - 특정 위치로 스크롤
- [Fullpage.js](https://alvarotrigo.com/fullPage/) - 풀페이지 스크롤 구현
  - 기본 설정
  - 커스텀 래퍼 구현

### 데이터 시각화

- [Chart.js](https://www.chartjs.org/) - 반응형 차트 라이브러리
  - 바 차트
  - 레이더 차트

### 캐러셀 & 이미지 관련

- [Embla Carousel](https://www.embla-carousel.com/) - 터치 친화적 캐러셀
  - 패럴렉스 효과
- [React Quick Pinch Zoom](https://github.com/retyui/react-quick-pinch-zoom) - 이미지 확대/축소

### 주소 & 데이터 관련

- [React Daum Postcode](https://github.com/hwasurr/react-daum-postcode) - 다음 주소 검색 컴포넌트
  - 임베드 방식
  - 팝업 방식
- [SheetJS](https://sheetjs.com/) & [FileSaver.js](https://github.com/eligrey/FileSaver.js) - 엑셀 파일 내보내기

### 기타

- [React Query](https://tanstack.com/query/latest) - 데이터 관리 라이브러리

## 🚀 시작하기

```bash
# 패키지 설치
yarn

# 개발 서버 실행
yarn dev
```

## 🧰 기술 스택

- React 18
- TypeScript
- Vite
- Styled Components
- React Router DOM

## 📂 프로젝트 구조

- `/src/components` - 라이브러리별 예제 컴포넌트
- `/src/libs` - 유틸리티 및 훅
- `/src/styles` - 전역 스타일

## 🔗 주요 예제 경로

- `/gsap/*` - GSAP 애니메이션 예제
- `/framer/*` - Framer Motion 예제
- `/chartjs/*` - Chart.js 시각화 예제
- `/fullpage/*` - Fullpage.js 예제
- `/lenis/*` - Lenis 스크롤 예제
- `/address/*` - 주소 검색 예제
- `/embla-carousel/*` - Embla Carousel 예제
- `/img/*` - 이미지 관련 예제
- `/export-excel/*` - 엑셀 내보내기 예제
