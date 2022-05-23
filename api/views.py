
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .models import Project
from .serializers import ProjectSerializers
from .corelogic import ProVision, VisionStatement
from django.http import JsonResponse
data = []


@api_view(['POST', 'GET'])
def insert(request):
    if request.method == 'POST':
        print("heloo")
        userstory = request.data['userstory']
        method = request.data['method']
        print(method)
        print(userstory)
        if(method == 'userstory'):
            a = ProVision(userstory)
        else:
            a = VisionStatement(userstory)
            
      
            
        
        if a.errormsg == True:
            
            screendetails, controldetails = a.main()
            print(type(screendetails))
            data.append(screendetails)
            data.append(controldetails)

            print(json.dumps(controldetails))
        else:
            print("prompt")
        return HttpResponse(userstory)


def get_screens(request):
    jsondata = json.dumps(data[0])
    print(jsondata)
    return JsonResponse(jsondata, safe=False)
def get_controls(request):
    jsondata = json.dumps(data[1])
    print(jsondata)
    return JsonResponse(jsondata, safe=False)
