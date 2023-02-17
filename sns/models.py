from django.db import models
from django.contrib.auth.models import User

#post랑 comment에 로그인 한 사용자 정보가 들어가야 함
#post에 위치정보도 있어야 될 것 같은데? (위치 마다 동네 게시글이 다르니까)
class Post(models.Model):
  subject=models.CharField(max_length=200)
  content=models.TextField()
  user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
  create_date=models.DateTimeField()

  def __str__(self):
    return self.subject

class Comment(models.Model):
  post=models.ForeignKey(Post,on_delete=models.CASCADE)
  content=models.TextField()
  user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
  create_date=models.DateTimeField()

  def __str__(self):
    return self.content