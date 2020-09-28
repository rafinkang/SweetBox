"# projectJCK2" 

장씨, 조씨, 강씨, 김씨 해서 JCK2입니다.
R 프로젝트 진행시 사용 합니다.

git reset --hard id : 완전히 과거 시점상태로 이동
> reset 하기 전에 했던 작업 모두 취소
git reset --mixed id (default) : index 영역은 초기화, 작업 디렉토리는 변경되지 않는다.
> reset 하기 전까지 했던 작업 디렉토리 작업은 남겨둠
git reset -- id : 모두 변경되지 않는다. commit 취소
> reset 하기 전까지 했던 index, 작업 디렉토리는 남겨둠