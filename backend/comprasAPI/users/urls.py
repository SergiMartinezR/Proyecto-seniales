from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from users.views import AdultoMayorViewSet, AdultoMayorProfile, VoluntarioProfile, VoluntarioViewSet, AdultoMayorProfileViewSet, VoluntarioProfileViewSet

router = routers.DefaultRouter()
router.register('adultomayor', AdultoMayorViewSet)
router.register('voluntario', VoluntarioViewSet)
router.register('view/adultomayor', AdultoMayorProfileViewSet)
router.register('view/voluntario', VoluntarioProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('adultomayor/create/<int:user_id>/', AdultoMayorProfile.as_view()),
    path('voluntario/create/<int:user_id>/', VoluntarioProfile.as_view()),
]