from django.db import models

class PassengerInfo(models.Model):
    name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    otch = models.CharField(max_length=30)
    def __str__(self):
        return str(self.last_name + " " + self.name + " " + self.otch)

# Create your models here.
