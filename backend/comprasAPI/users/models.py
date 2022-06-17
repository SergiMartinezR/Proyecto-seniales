from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator

class UserManager(BaseUserManager):
    def create_user(self, phone_number, password=None):

        if not phone_number:
            raise ValueError('El usuario debe tener un número de teléfono')

        if not password:
            raise ValueError('El usuario debe tener una contraseña')

        user = self.model(
            phone_number = phone_number,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_adultomayor(self, phone_number, password):
        user = self.create_user(
            phone_number,
            password=password,
        )

        user.is_adulto_mayor = True
        user.save(using=self._db)
        return user

    def create_voluntario(self, phone_number, password):
        user = self.create_user(
            phone_number,
            password=password,
        )

        user.is_voluntario = True
        user.save(using=self._db)
        return user

    def create_staffuser(self, phone_number, password):
        user = self.create_user(
            phone_number,
            password=password,
        )
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password):
        user = self.create_user(
            phone_number,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.is_active = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    is_voluntario = models.BooleanField('Voluntario', default=False)
    is_adulto_mayor = models.BooleanField('Adulto Mayor', default=False)
    phone_number = models.CharField(
        'Número de teléfono',
        max_length=10,
        blank=True,
        unique = True,
        validators=[RegexValidator(
            regex='^[0-9]{10}$',
            message='Ingrese un número de teléfono válido'
            )
        ]
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.phone_number

class AdultoMayor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField('Nombre(s)', max_length=255)
    last_name = models.CharField('Apellidos', max_length=255)
    location = models.CharField('Ubicación', max_length=255)

    def __str__(self):
        fullname = self.first_name + ' ' + self.last_name
        return fullname

class Voluntario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField('Nombre(s)', max_length=255)
    last_name = models.CharField('Apellidos', max_length=255)
    location = models.CharField('Ubicación', max_length=255)
    image = models.ImageField('Foto de perfil', upload_to='media/voluntario/pfp/',)
    id_card = models.FileField('Identificación', upload_to='media/voluntario/id/',)

    def __str__(self):
        fullname = self.first_name + ' ' + self.last_name
        return fullname