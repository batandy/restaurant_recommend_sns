from django.db import models

class Post(models.Model):
  subject=models.CharField(max_length=200)
  content=models.TextField()
  create_date=models.DateTimeField()

  def __str__(self):
    return self.subject

class Comment(models.Model):
  post=models.ForeignKey(Post,on_delete=models.CASCADE)
  name=models.CharField(null=True,max_length=20)
  content=models.TextField()
  create_date=models.DateTimeField()

  def __str__(self):
    return self.content