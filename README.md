# Runable (React Native)

> **달리자, 나답게.**
> 러너를 위한 올인원 플랫폼 — [Runable 웹](https://runable.me/) 프로젝트의 React Native(Expo) 포팅.

웹(Next.js) 버전을 Expo 기반 네이티브 앱으로 옮기는 프로젝트입니다. 아키텍처는 웹과 동일하게
**Feature-Sliced Design (FSD)** 을 따르며, 메인 화면은 모바일 앱에 맞춰 Nike Run Club 톤
(다크 + 러닝 오렌지 + 글래스모피즘)으로 리뉴얼했습니다.

---

## 기술 스택

- **Expo SDK 56** / React Native 0.85 / React 19
- **expo-router** — 파일 기반 라우팅 + typed routes
- **expo-image / expo-linear-gradient / expo-blur** — 이미지·그라데이션·글래스
- **react-native-maps** — 대회 지도 (네이티브)
- **@kingstinct/react-native-healthkit** — Apple 건강 연동 (iOS)
- **@expo/vector-icons** (Ionicons)
- TypeScript (strict)

> **Apple HealthKit / 네이티브 지도는 개발 빌드 필요**: HealthKit·지도는 네이티브 모듈이라
> Expo Go·웹에서는 동작하지 않습니다. `eas build --profile development` 또는 Xcode 개발 빌드에서
> 실제 데이터/지도가 표시되고, 그 외 환경에서는 데모 데이터 및 안내 화면으로 폴백합니다.

## 아키텍처 (FSD)

Feature-Sliced Design 6 레이어. 의존성은 단방향이며, 슬라이스 외부는 항상 `index.ts` public API로 진입합니다.

```
shared ← entities ← features ← widgets ← views ← app
```

| 레이어 | 위치 | 역할 |
|---|---|---|
| `app` (expo-router) | `src/app/` | 라우트/네비게이션만. `(tabs)` 그룹에 하단 탭 |
| `views` | `src/views/` | 화면(=FSD pages, expo-router 충돌 회피로 rename) |
| `widgets` | `src/widgets/` | 큰 조합 블록 |
| `features` | `src/features/` | 사용자 행위 단위 |
| `entities` | `src/entities/` | 도메인 모델 (`race` — model·api·ui) |
| `shared` | `src/shared/` | 도메인 무관 (`theme/`, `ui/`, `lib/`, `config/`) |

### 디자인 시스템

`src/shared/theme/tokens.ts` 가 단일 진실(SSOT). 웹의 CSS 커스텀 프로퍼티를 TS 토큰으로 포팅:
다크 서피스, 러닝 오렌지 액센트(`#ff5a1f`), 글래스 표면, radius/spacing/typography 스케일.

UI 프리미티브: `AppText`, `Button`, `GlassCard`, `Pill`, `SectionHeader`, `ScreenBackground`.

### 메인 화면

`src/views/home/` — 헤더(인사 + 아바타) · 히어로 카드 · 퀵툴 그리드(페이스/런트립/매거진/검색) ·
다가오는 대회 가로 캐러셀(`entities/race` 의 `RaceCard`) · 페이스 계산기 프로모 배너.
대회 데이터는 runable.me 공개 API에서 가져오며, 실패 시 mock 데이터로 폴백합니다.

## 시작하기

```bash
nvm use            # .nvmrc → Node 22
npm install
npm run ios        # iOS 시뮬레이터
npm run android    # Android 에뮬레이터
npm run web        # 웹
npm start          # Expo 개발 서버 (QR)
```

## 스크립트

| 명령 | 설명 |
|---|---|
| `npm start` | Expo 개발 서버 |
| `npm run ios` / `android` / `web` | 플랫폼별 실행 |
| `npm run lint` | ESLint (eslint-config-expo) |
| `npx tsc --noEmit` | 타입 체크 |

## EAS 빌드 (개발 빌드)

HealthKit·지도 같은 **네이티브 모듈은 Expo Go에서 동작하지 않습니다.** 실제 데이터/지도를 보려면
[EAS Build](https://docs.expo.dev/build/introduction/)로 **개발 빌드**(dev client 포함)를 만들어야 합니다.
빌드 프로파일은 [`eas.json`](./eas.json)에 정의돼 있습니다.

| 프로파일 | 용도 |
|---|---|
| `development` | 개발 빌드 — dev client + 내부 배포 (실기기, HealthKit 실데이터 ✅) |
| `development-simulator` | iOS 시뮬레이터용 개발 빌드 (지도 ✅, Health는 제한적) |
| `preview` | 내부 테스트용 릴리스 빌드 (APK / ad-hoc) |
| `production` | 스토어 제출용 빌드 (`version` 자동 증가) |

### 사전 준비

```bash
npm i -g eas-cli      # EAS CLI 설치
eas login             # Expo 계정 로그인 (없으면 expo.dev에서 가입)
eas init              # 프로젝트 연결 → app.json의 extra.eas.projectId 자동 생성
```

> iOS 빌드에는 **Apple Developer 계정**이 필요합니다. 무료 계정으로도 `development` 빌드는 가능하나
> 7일 후 만료됩니다(유료 계정은 1년). 자격 증명은 `eas build` 실행 시 대화형으로 설정됩니다.

### 빌드 & 실행

```bash
# 실기기 개발 빌드 (HealthKit 실데이터까지 확인)
eas build --profile development --platform ios

# iOS 시뮬레이터 개발 빌드
eas build --profile development-simulator --platform ios

# Android 개발 빌드 (APK)
eas build --profile development --platform android

# 빌드 완료 후 앱 설치 → 개발 서버에 연결
npx expo start --dev-client
```

빌드가 끝나면 EAS가 설치 링크(QR)를 주고, 기기에 설치한 dev client 앱을 위 개발 서버에 연결하면
JS 번들이 실시간으로 로드됩니다. 코드만 바뀌는 경우 매번 재빌드 없이 `--dev-client`로 반복 개발할 수 있고,
네이티브 의존성(`app.json` 플러그인·신규 네이티브 패키지)이 바뀔 때만 다시 빌드하면 됩니다.

### 로컬 빌드 (선택)

클라우드 대신 로컬에서 빌드하려면 (macOS + Xcode 전체 설치 필요):

```bash
eas build --profile development --platform ios --local
```

## 마이그레이션 현황

- [x] FSD 폴더 구조 + 디자인 토큰 포팅
- [x] 글래스모피즘 플로팅 하단 네비 (홈·기록·대회·매거진·런트립·페이스)
- [x] **메인 화면** (Nike Run 스타일 리뉴얼)
- [x] 대회 일정 — 검색 + 지역/종목 필터 + **목록/지도 토글 (네이티브 지도)**
- [x] 매거진 — 카테고리 필터 + 아티클 목록
- [x] 런트립 — 해외 마라톤 패키지 목록
- [x] 페이스 계산기 — 거리·페이스 → 완주 시간, 트레드밀 변환
- [x] **내 기록 — Apple HealthKit 연동 (실데이터 + 데모 폴백)**
- [ ] 대회 달력 그리드 뷰
- [ ] 예약 플로우 · 대기실 게이트
- [ ] 상세 화면 (대회·아티클·런트립 detail)
