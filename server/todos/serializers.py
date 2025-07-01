from rest_framework import serializers
from .models import Category, Todo

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'user']

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'priority', 'due_date', 'category', 'user', 'created_at'] 