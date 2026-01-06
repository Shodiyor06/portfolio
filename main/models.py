from django.db import models

class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    about = models.TextField()
    experience_years = models.PositiveIntegerField()
    skills = models.CharField(max_length=255)
    telegram = models.URLField()
    email = models.EmailField()

    def __str__(self):
        return self.full_name

