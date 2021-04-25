from django import forms

class PassengerInfo(forms.Form):
    name = forms.CharField(label='name', max_length=30)
    last_name = forms.CharField(label='last_name', max_length=30)
    otch = forms.CharField(label='otch', max_length=30)
    #def __str__(self):
     #   return str(self.last_name + " " + self.name + " " + self.otch)

# Create your models here.
