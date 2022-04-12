import imp
from tkinter.messagebox import RETRY
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .models import Project
from .serializers import ProjectSerializers
from .corelogic import ProVision
from django.http import JsonResponse
data = []


@api_view(['POST'])
def insert(request):
    if request.method == 'POST':
        userstory = request.data['body']
        a = ProVision(userstory)
        if a.errormsg == True:
            screendetails, controldetails = a.main()
            data.append(screendetails)
        else:
            print("prompt")
        return Response(userstory)


def get(request):
    print(data)
    return JsonResponse(json.dumps(data), safe=False)
