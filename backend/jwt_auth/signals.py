from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Users


@receiver(post_save, dispatch_uid="adhisAY^&*D(h", sender=Users)
def send_email(sender, instance, created, **kwargs):
    pass
