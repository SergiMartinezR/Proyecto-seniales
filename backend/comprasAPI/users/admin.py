from django.contrib import admin
from users.models import User, AdultoMayor, Voluntario

admin.site.register(User)
admin.site.register(AdultoMayor)
admin.site.register(Voluntario)