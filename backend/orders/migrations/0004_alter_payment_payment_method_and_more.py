# Generated by Django 5.0.6 on 2024-06-06 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_alter_cartitem_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='payment_method',
            field=models.CharField(choices=[('DEBIT_CARD', 'Debit Card'), ('CREDIT_CARD', 'Credit Card'), ('UPI', 'UPI')], default='DEBIT_CARD', max_length=16),
        ),
        migrations.AlterField(
            model_name='payment',
            name='payment_status',
            field=models.CharField(choices=[('PENDING', 'Pending'), ('IN PROGRESS', 'In Progress'), ('DONE', 'Done')], default='PENDING', max_length=16),
        ),
    ]
