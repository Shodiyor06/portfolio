from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Profile

def home_view(request):
    profile = Profile.objects.first()
    return render(request, 'index.html', {'profile': profile})
