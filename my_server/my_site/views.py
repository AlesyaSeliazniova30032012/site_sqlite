from django.shortcuts import render, redirect
#from.forms import MySiteForms


def index(request):
    return render(request, 'my_site/index.html')

def courses(request):
    return render(request, 'my_site/courses.html')

def trains(request):
    return render(request, 'my_site/trains.html')

def feedback(request):
    return render(request, 'my_site/feedback.html')

def validation(request):
    #if request.method == 'POST':
        #form_reg = MySiteForms(request.POST)
        #if form_reg.is_valid():
            #form_reg.save()
            #return redirect('/')
    #form_reg = MySiteForms()

    return render(request, 'my_site/validation.html')
    #return render(request, 'my_site/validation.html', {'form_reg': form_reg})