# Generated by Django 4.1.7 on 2023-04-18 02:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0004_alter_trashcan_can_id_alter_user_user_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='TodoWork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=20)),
                ('can_id', models.CharField(max_length=20)),
                ('position', models.CharField(max_length=20)),
                ('go', models.BooleanField()),
            ],
        ),
        migrations.AlterField(
            model_name='trashcan',
            name='position',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='trashcan',
            name='state',
            field=models.CharField(max_length=20),
        ),
    ]
