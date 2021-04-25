from django.db import models

class AquariumInfo(models.Model):
    fam_name = models.CharField(max_length=40, default="hello")
    fir_name = models.CharField(max_length=40, default="pls")
    fat_name = models.CharField(max_length=40, default="do")
    city = models.CharField(max_length=40, default="migrations")
    tank_amount = models.IntegerField(default=0)
    email = models.CharField(max_length=40, default="aaa")
    sign = models.TextField(default="signing")
    def __str__(self):
        return str(self.fam_name + " " + self.fir_name + " " + self.fat_name)

# Create your models here.
