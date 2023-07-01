from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.CharField(max_length=50, primary_key=True, unique=True)
    weight_trash = models.FloatField()
    weight_recy = models.FloatField()
    coin = models.FloatField()

class TrashCan(models.Model):
    can_id = models.CharField(max_length=20, primary_key=True, unique=True)
    recycle_type = models.CharField(max_length=20)
    cap_trash = models.FloatField()
    cap_recy = models.FloatField()
    state = models.CharField(max_length=20)
    position = models.CharField(max_length=20)

class TodoWork(models.Model):
    id = models.IntegerField(primary_key=True)
    user_id = models.CharField(max_length=50)
    can_id = models.CharField(max_length=20)
    position = models.CharField(max_length=20)
    go = models.BooleanField()