from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class HashTrustUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class Users(AbstractUser):
    """
    Custom user model representing a user of the application.

    Fields:
        first_name: The first name of the user. Must contain alphabets only.
        last_name: The last name of the user. Must contain alphabets only.
        email: The email address of the user. Unique and serves as the username.
        date_of_birth: The date of birth of the user.
    """

    username = None

    #  Regular Expresson for "Only Alphabets" validation
    ALPHABET_REGEX = r"^[a-zA-Z]+$"

    first_name = models.CharField(
        max_length=30,
        validators=[
            RegexValidator(
                regex=ALPHABET_REGEX,
                message="First name must contain alphabets only.",
            )
        ],
    )

    last_name = models.CharField(
        max_length=30,
        validators=[
            RegexValidator(
                regex=ALPHABET_REGEX,
                message="Last name must contain alphabets only.",
            )
        ],
        null=True,
        blank=True,
    )

    email = models.EmailField(
        unique=True,
        db_index=True,
        error_messages={"unique": "A user with this email address already exists."},
    )
    date_of_birth = models.DateField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = HashTrustUserManager()

    def __str__(self):
        return self.email
