from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from users.views import AdultoMayorViewSet, AdultoMayorProfile, VoluntarioProfile, VoluntarioViewSet

router = routers.DefaultRouter()
router.register('adultomayor', AdultoMayorViewSet)
router.register('voluntario', VoluntarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('adultomayor/create/<int:user_id>/', AdultoMayorProfile.as_view()),
    path('voluntario/create/<int:user_id>/', VoluntarioProfile.as_view()),
]