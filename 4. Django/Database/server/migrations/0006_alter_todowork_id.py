# Generated by Django 4.1.7 on 2023-04-19 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_todowork_alter_trashcan_position_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todowork',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
