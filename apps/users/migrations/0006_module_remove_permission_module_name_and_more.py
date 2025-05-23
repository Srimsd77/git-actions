# Generated by Django 5.2 on 2025-05-03 13:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_role_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('code', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'verbose_name': 'Module',
                'verbose_name_plural': 'Modules',
            },
        ),
        migrations.RemoveField(
            model_name='permission',
            name='module_name',
        ),
        migrations.RemoveField(
            model_name='permission',
            name='name',
        ),
        migrations.AddField(
            model_name='permission',
            name='module',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='module', to='users.module'),
            preserve_default=False,
        ),
    ]
