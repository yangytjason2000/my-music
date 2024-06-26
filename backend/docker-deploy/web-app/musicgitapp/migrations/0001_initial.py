# Generated by Django 4.2.1 on 2023-10-14 01:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.CharField(max_length=1000)),
                ('isPublic', models.BooleanField(default=True)),
                ('collaborator', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owns', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.CharField(max_length=1000)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicgitapp.album')),
                ('artist', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('artist', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicgitapp.song')),
            ],
        ),
    ]
