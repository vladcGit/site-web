from django.contrib.auth.models import AbstractUser

# Create your models here.

# modelul e exact ca user-ul basic din django
# probabil va trebui sa schimb daca am nevoie de alte campuri

class CustomUser(AbstractUser):
    def __str__(self):
        return self.email
