from django.db import models

# 질문과 답변 게시판? 같은걸 만들때 필요한 데이터 모델을 정의

# 모델 만들기
class Question(models.Model):  #이름 = 모델.속성
    subject = models.CharField(max_length=200)  # 제목 -> 제한된 내용
    content = models.TextField()  # 내용 -> 글자수 제한x 텍스트
    create_date = models.DateTimeField()  # 작성 일시 -> 시간과 날짜에 관련된 속성

    def __str__(self):
        return self.subject

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)  # 기존 모델의 속성 연결을 위해 fore를 쓰고 delete을 통해 연결된 질문이 삭제시 자동삭제
    content = models.TextField()
    create_date = models.DateTimeField()

