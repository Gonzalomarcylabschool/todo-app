from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')

    def __str__(self):
        return self.name

class Todo(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    due_date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='todos')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
