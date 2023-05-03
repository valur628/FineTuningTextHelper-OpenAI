# FineTuningTextHelper-openAI
### _글도우미 파인튜닝 실행 웹페이지 - openAI GPT-3 기반_

# 개요
>글도우미 작업용 openAI GPT-3 fine-tune를 실행하는 웹페이지.

글도우미 작업을 위해 제작했다. GPT-3 기반의 fine-tune가 가능한 모델을 [TextKeywordExtractor-konlpy]에서 얻어낸 데이터로 훈련 및 설정하는 웹페이지이다. 훈련된 모델의 실 사용은 openAI Playground에서 훈련 이후 사용가능하다.
***

# 상세
### 개발 인원
 - 박주철
   - 개발 환경 구축
   - 웹페이지 구상
   - 웹페이지 개발

### 개발 기술
본 프로젝트 개발에 사용된 라이브러리 및 파이프라인입니다.
- [Python 3.10] - 동적 타이핑 범용 프로그래밍 언어
- [openai] - OpenAI 인공지능 기술을 이용하여 자연어 처리, 이미지 생성 등의 작업을 수행하는 클라우드 기반 서비스 라이브러리

### 개발 환경
| 종류 | 목록 |
| ------ | ------ |
| 사용 언어 | JavaScript |
| 개발 도구 | Visual Studio Code |
| 데이터베이스 | JavaScript Object Notation (JSON) |
| OS 환경 | Windows 10 |

### 사용 방법
본 프로젝트의 결과물을 시연하는 방법입니다.
- openAI 홈페이지에서 API 키를 받아온다.
- 해당 API 키를 웹페이지의 API 키 설정에 넣는다. 그리고 API 키 설정 버튼을 누른다.
- [Text Keyword Extractor]로 만들어진 jsonl 데이터를 훈련 데이터에 넣고, jsonl 훈련 데이터 파일을 업로드한다.
- 그러면 나오는 file Response("object": "file"로 시작)에서 id를 따로 기록하거나 전체 데이터 정보를 다운로드 받아둔다.
- 그리고 해당 내용에 있는 id를 아래의 모델 훈련에 집어 넣는다.
- 가격에 주의하며 모델을 선택 후 파인 튜닝을 시작한다.
- 시작을 누르고 모델 정보 다운로드를 눌러 json 형태로 다운로드 받는다.
- 현재 정보의 파인튜닝 정보에서 파일을 선택해 json 모델 정보 파일을 집어넣는다.
- 현재 진행 중인 모델 관련 정보가 뜬다.
- 최하단의 status가 pending이면 아직 진행중, succeeded면 훈련 완료라는 것을 뜻한다.
- succeeded가 되면 openAI Playground에서 확인 후 사용한다.

### 주의사항
- **각 id 및 정보는 한 번만 보여주고 다시는 안 알려주니 꼭 기록해둬야 한다.**

### 문제점
- 훈련한 데이터가 적으면 성능이 너무 떨어진다. 그렇다고 1만개 이상의 데이터를 훈련시키자니 비용이 상상 이상으로 들어간다. (1만개가 30만 원 이상.)
- 사실상 개인으로서는 openAI가 이런 것을 만들어뒀다는 것에 의의를 두어야 하는 수준이다.

### 기타
- 해당 문제점의 이유로 koGPT등의 다른 훈련 방식 및 모델을 찾아볼 필요가 있음.

### 관련 리포지토리
- [TextSummaryExtractor-openAI] - txt 파일에서 요약문을 추출해서 openAI fine-tune 훈련 데이터를 만드는 프로그램. openAI GPT 기반.
- [TextKeywordExtractor-konlpy] - txt 파일에서 키워드를 추출해서 openAI fine-tune 훈련 데이터를 만드는 프로그램. konlpy 기반.
- [FineTuningTextHelper-openAI] - 글도우미 작업을 위한 openAI fine-tune 훈련 작업을 진행하는 웹사이트. openAI 기반.

   [TextSummaryExtractor-openAI]: <https://github.com/valur628/TextSummaryExtractor-openAI>
   [TextKeywordExtractor-konlpy]: <https://github.com/valur628/TextKeywordExtractor-konlpy>
   [FineTuningTextHelper-openAI]: <https://github.com/valur628/FineTuningTextHelper-openAI>
   [openai]: <https://platform.openai.com/>
