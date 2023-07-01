# Generated by Django 4.1.7 on 2023-04-18 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_rename_garbage_capacity_trashcan_cap_recy_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trashcan',
            name='can_id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False, unique=True),
        ),
    ]
