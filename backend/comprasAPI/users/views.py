from django import views
from django.shortcuts import render
from rest_framework import viewsets, views, status 
from users.models import User, AdultoMayor, Voluntario
from users.serializers import AdultoMayorSerializer, AdultoMayorProfileSerializer, VoluntarioSerializer, VoluntarioProfileSerializer
from rest_framework.response import Response


class AdultoMayorViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_adulto_mayor=True)
    serializer_class = AdultoMayorSerializer

class VoluntarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_voluntario=True)
    serializer_class = VoluntarioSerializer

class VoluntarioProfileViewSet(viewsets.ModelViewSet):
    queryset = Voluntario.objects.all()
    serializer_class = VoluntarioProfileSerializer

class AdultoMayorProfileViewSet(viewsets.ModelViewSet):
    queryset = AdultoMayor.objects.all()
    serializer_class = AdultoMayorProfileSerializer

class AdultoMayorProfile(views.APIView):

    serializer_class = AdultoMayorProfileSerializer

    def post(self, request, user_id):
        data = request.data.copy()
        data['user'] = user_id
        serializer = AdultoMayorProfileSerializer(data = data, context={'request': request})
        if serializer.is_valid(): 
            serializer.save()
        return Response(serializer.errors, status = status.HTTP_201_CREATED)

class VoluntarioProfile(views.APIView):

    serializer_class = VoluntarioProfileSerializer

    def post(self, request, user_id):
        data = request.data.copy()
        data['user'] = user_id
        serializer = VoluntarioProfileSerializer(data = data, context={'request': request})
        if serializer.is_valid(): 
            serializer.save()
        return Response(serializer.errors, status = status.HTTP_201_CREATED)
