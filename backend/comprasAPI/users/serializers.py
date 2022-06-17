from rest_framework.authtoken.models import Token
from rest_framework import serializers
from users.models import User, AdultoMayor, Voluntario
# from django.contrib.auth.models import User

class AdultoMayorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_adultomayor(**validated_data)
        Token.objects.create(user=user)
        return user

class VoluntarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_voluntario(**validated_data)
        Token.objects.create(user=user)
        return user

class AdultoMayorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdultoMayor
        fields = '__all__'

class VoluntarioProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voluntario
        fields = '__all__'

# class AdultoMayorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AdultoMayor
#         fields = ['user', 'first_name', 'last_name', 'location']

#     user = serializers.PrimaryKeyRelatedField(read_only=True)
#     first_name = serializers.CharField(required=True)
#     last_name = serializers.CharField(required=True)
#     location = serializers.CharField(required=True)

#     def get_cleaned_data(self):
#         data = self.get_cleaned_data()
#         extra_data = {
#             'phone_number': self.validated_data.get('phone_number', ''),
#             'password': self.validated_data.get('password', ''),
#             'first_name': self.validated_data.get('first_name', ''),
#             'last_name': self.validated_data.get('last_name', ''),
#             'location': self.validated_data.get('location', ''),
#         }
#         data.update(extra_data)
#         return data

#     def save(self):
#         data = self.get_cleaned_data()
#         user = User.objects.create_user(phone_number=self.data.get('phone_number'), is_adulto_mayor=True, is_voluntario=False, password=self.data.get('password'))
#         adultomayor = AdultoMayor(user=user, 
#             first_name=self.data.get('first_name'),
#             last_name=self.data.get('last_name'),
#             location=self.data.get('location')
#         )
#         adultomayor.save()
#         return user
        